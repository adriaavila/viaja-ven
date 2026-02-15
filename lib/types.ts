/* ── Domain Types ── */

export type PriceTier = 'económico' | 'medio' | 'premium';
export type TimeOfDay = 'mañana' | 'mediodía' | 'tarde';
export type Pace = 'relajado' | 'balanceado' | 'intenso';
export type GroupType = 'pareja' | 'familia' | 'amigos' | 'solo';
export type Category =
    | 'comida típica'
    | 'café y postres'
    | 'cerveza artesanal'
    | 'paseos cortos'
    | 'familiar'
    | 'alemana';

export interface Experience {
    id: string;
    slug: string;
    title: string;
    category: Category;
    tags: string[];
    durationMinutes: number;
    locationName: string;
    priceTier: PriceTier;
    imageUrl: string;
    description: string;
    shortDescription: string;
    includes: string[];
    idealFor: string[];
    rating: number;
    reviewCount: number;
    pricePerPerson?: number;
}

export interface RoutePreset {
    id: string;
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    experienceSlugs: string[];
}

export interface ItineraryItem {
    id: string;
    time: string;
    experience: Experience;
    notes?: string;
}

export interface Itinerary {
    id: string;
    date: string;
    groupSize: number;
    pace: Pace;
    budget: PriceTier;
    items: ItineraryItem[];
    totalDuration: number;
}

/* ── Plan State ── */

export interface PlanSelections {
    date: string | null;
    timeOfDay: TimeOfDay | null;
    groupSize: number;
    interests: Category[];
    budget: PriceTier | null;
    pace: Pace | null;
}

export type PlanAction =
    | { type: 'SET_DATE'; payload: string }
    | { type: 'SET_TIME_OF_DAY'; payload: TimeOfDay }
    | { type: 'SET_GROUP_SIZE'; payload: number }
    | { type: 'TOGGLE_INTEREST'; payload: Category }
    | { type: 'SET_BUDGET'; payload: PriceTier }
    | { type: 'SET_PACE'; payload: Pace }
    | { type: 'ADD_EXPERIENCE'; payload: Experience }
    | { type: 'REMOVE_EXPERIENCE'; payload: string }
    | { type: 'SET_ITINERARY'; payload: Itinerary }
    | { type: 'CLEAR_PLAN' };

export interface PlanState {
    selections: PlanSelections;
    selectedExperiences: Experience[];
    itinerary: Itinerary | null;
    savedAt: string | null;
}
