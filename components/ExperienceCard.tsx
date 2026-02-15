'use client';

import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import type { Experience } from '@/lib/types';
import { usePlan } from '@/lib/plan-context';

interface ExperienceCardProps {
    experience: Experience;
    showAddToPlan?: boolean;
}

const priceTierLabel: Record<string, string> = {
    económico: '$',
    medio: '$$',
    premium: '$$$',
};

export default function ExperienceCard({
    experience,
    showAddToPlan = true,
}: ExperienceCardProps) {
    const { addExperience, removeExperience, isInPlan } = usePlan();
    const inPlan = isInPlan(experience.id);

    return (
        <div className="group rounded-2xl border border-line bg-white overflow-hidden card-hover">
            {/* Image container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={experience.imageUrl}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glassmorphic rating badge */}
                <div className="absolute top-3 left-3 glass-card px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
                            fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-900">{experience.rating}</span>
                    <span className="text-[10px] text-text-muted">({experience.reviewCount})</span>
                </div>

                {/* Category chip */}
                <div className="absolute bottom-3 left-3">
                    <Badge variant="default" className="!bg-white/90 !backdrop-blur-sm !text-gray-800 text-[11px]">
                        {experience.category}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-heading font-semibold text-base text-gray-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                    {experience.title}
                </h3>
                <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {experience.shortDescription}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-line/50">
                    <span className="text-sm font-semibold text-gray-900">
                        {priceTierLabel[experience.priceTier]}
                    </span>
                    {showAddToPlan && (
                        <button
                            onClick={() =>
                                inPlan
                                    ? removeExperience(experience.id)
                                    : addExperience(experience)
                            }
                            className={`cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${inPlan
                                ? 'bg-primary text-white scale-100 hover:bg-primary-dark'
                                : 'bg-surface text-text-muted hover:bg-primary/10 hover:text-primary hover:scale-105'
                                }`}
                            aria-label={inPlan ? 'Quitar del plan' : 'Agregar al plan'}
                        >
                            {inPlan ? (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
