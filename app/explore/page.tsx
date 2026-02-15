'use client';

import { useState } from 'react';
import ExperienceCard from '@/components/ExperienceCard';
import FiltersBar from '@/components/FiltersBar';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { experiences } from '@/lib/mock/experiences';

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const gridRef = useScrollReveal<HTMLDivElement>({ staggerChildren: true, staggerDelay: 60 });

    const filtered =
        activeCategory === 'all'
            ? experiences
            : experiences.filter((e) => e.category === activeCategory);

    return (
        <div className="page-enter">
            {/* Header */}
            <div className="bg-surface border-b border-line">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                        Descubre
                    </p>
                    <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#1D2939] mb-2">
                        Explora experiencias
                    </h1>
                    <p className="text-sm text-text-muted max-w-md">
                        Elige restaurantes, cafés y actividades según tu plan, no al revés.
                    </p>
                </div>

                {/* Filters */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-5">
                    <FiltersBar
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {filtered.length > 0 ? (
                    <div
                        key={activeCategory}
                        ref={gridRef}
                        className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
                    >
                        {filtered.map((exp) => (
                            <div key={exp.id} className="reveal-child">
                                <ExperienceCard experience={exp} />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="text-center py-24">
                        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent-hot/5 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                                <path d="M12 3a9 9 0 110 18 9 9 0 010-18zM22 22l-4-4" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-[#1D2939] mb-2">
                            No encontramos experiencias
                        </h3>
                        <p className="text-sm text-text-muted max-w-sm mx-auto">
                            Intenta con otra categoría para descubrir más opciones.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
