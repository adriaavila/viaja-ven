import { experiences } from './experiences';
import type { PlanSelections, Itinerary, ItineraryItem, Experience, Category } from '@/lib/types';

/**
 * Deterministic recommendation engine.
 * Composes an itinerary based on planner selections.
 */
export function generateItinerary(selections: PlanSelections): Itinerary {
    const {
        date,
        timeOfDay,
        groupSize,
        interests,
        budget,
        pace,
    } = selections;

    // 1. Filter experiences by budget
    let pool = experiences.filter((e) => {
        if (!budget) return true;
        if (budget === 'económico') return e.priceTier === 'económico';
        if (budget === 'medio') return e.priceTier !== 'premium';
        return true; // premium includes all
    });

    // 2. Score by interest match
    const interestSet = new Set<string>(interests as string[]);
    const scored = pool.map((e) => {
        let score = 0;
        if (interestSet.has(e.category)) score += 3;
        // Broader match: tag-based
        e.tags.forEach((tag) => {
            const lower = tag.toLowerCase();
            interests.forEach((interest) => {
                if (lower.includes(interest.toLowerCase())) score += 1;
            });
        });
        // Family bonus
        if (interestSet.has('familiar' as Category) && e.idealFor.some((i) => i.toLowerCase().includes('familia'))) {
            score += 2;
        }
        return { experience: e, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // 3. Determine how many items based on pace
    let maxItems = 4;
    if (pace === 'relajado') maxItems = 3;
    if (pace === 'intenso') maxItems = 6;

    // 4. Select top experiences, avoiding duplicates in category
    const selected: Experience[] = [];
    const usedCategories = new Set<string>();

    for (const { experience } of scored) {
        if (selected.length >= maxItems) break;
        // Allow max 2 per category for variety
        const catCount = selected.filter((s) => s.category === experience.category).length;
        if (catCount < 2) {
            selected.push(experience);
        }
    }

    // Fallback: if not enough, add remaining
    if (selected.length < 3) {
        for (const exp of experiences) {
            if (selected.length >= maxItems) break;
            if (!selected.find((s) => s.id === exp.id)) {
                selected.push(exp);
            }
        }
    }

    // 5. Assign time slots
    const startHours: Record<string, number> = {
        mañana: 8,
        mediodía: 11,
        tarde: 14,
    };
    let currentHour = startHours[timeOfDay || 'mañana'] || 9;

    const items: ItineraryItem[] = selected.map((experience, i) => {
        const hour = Math.floor(currentHour);
        const minutes = Math.round((currentHour - hour) * 60);
        const timeStr = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        // Add duration + 30 min travel buffer
        currentHour += experience.durationMinutes / 60 + 0.5;

        return {
            id: `item-${i + 1}`,
            time: timeStr,
            experience,
        };
    });

    const totalDuration = selected.reduce((sum, e) => sum + e.durationMinutes, 0);

    return {
        id: `itin-${Date.now()}`,
        date: date || new Date().toISOString().split('T')[0],
        groupSize,
        pace: pace || 'balanceado',
        budget: budget || 'medio',
        items,
        totalDuration,
    };
}
