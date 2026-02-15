'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { experiences } from '@/lib/mock/experiences';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = 'all' | 'experiencias' | 'restaurantes';

const CATEGORY_TO_TAB: Record<string, Tab> = {
    'comida típica': 'restaurantes',
    'alemana': 'restaurantes',
    'cerveza artesanal': 'restaurantes',
    'café y postres': 'experiencias',
    'paseos cortos': 'experiencias',
    'familiar': 'experiencias',
};

const CATEGORY_ICONS: Record<string, string> = {
    'comida típica': '🍽️',
    'café y postres': '☕',
    'cerveza artesanal': '🍺',
    'paseos cortos': '🚶',
    'familiar': '👨‍👩‍👧',
    'alemana': '🥨',
};

const POPULAR_SEARCHES = [
    'Fondue',
    'Cerveza',
    'Strudel',
    'Chocolate',
    'Fresas',
    'Pan alemán',
    'Mermelada',
    'Bratwurst',
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('all');
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when overlay opens
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setActiveTab('all');
            // Small delay so the overlay animation finishes before focus
            const timer = setTimeout(() => inputRef.current?.focus(), 150);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const filteredExperiences = useMemo(() => {
        let results = experiences;

        // Filter by tab
        if (activeTab === 'experiencias') {
            results = results.filter(
                (e) => CATEGORY_TO_TAB[e.category] === 'experiencias'
            );
        } else if (activeTab === 'restaurantes') {
            results = results.filter(
                (e) => CATEGORY_TO_TAB[e.category] === 'restaurantes'
            );
        }

        // Filter by query
        if (query.trim()) {
            const q = query.toLowerCase().trim();
            results = results.filter(
                (e) =>
                    e.title.toLowerCase().includes(q) ||
                    e.category.toLowerCase().includes(q) ||
                    e.tags.some((t) => t.toLowerCase().includes(q)) ||
                    e.shortDescription.toLowerCase().includes(q)
            );
        }

        return results.slice(0, 6);
    }, [query, activeTab]);

    const handlePopularClick = useCallback((term: string) => {
        setQuery(term);
    }, []);

    if (!isOpen) return null;

    const tabs: { value: Tab; label: string; icon?: string }[] = [
        { value: 'all', label: 'Buscar todo' },
        { value: 'experiencias', label: 'Experiencias', icon: '☕' },
        { value: 'restaurantes', label: 'Restaurantes', icon: '🍽️' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex flex-col">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className="relative z-10 w-full max-w-2xl mx-auto mt-4 sm:mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                style={{ animation: 'searchSlideIn 250ms ease-out' }}
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-text-muted shrink-0"
                    >
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Experiencias, restaurantes, destinos"
                        className="flex-1 text-base sm:text-lg font-medium text-gray-900 placeholder:text-text-muted outline-none focus-visible:outline-none bg-transparent"
                    />
                    {query ? (
                        <button
                            onClick={() => setQuery('')}
                            className="p-1.5 rounded-full hover:bg-surface text-text-muted hover:text-text-main transition cursor-pointer"
                            aria-label="Limpiar búsqueda"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    ) : (
                        <div className="w-[18px]" /> /* Spacer to keep alignment if needed, or just remove */
                    )}
                    <button
                        onClick={onClose}
                        className="ml-2 text-sm font-medium text-text-muted hover:text-primary transition cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>

                {/* Content area (scrollable) */}
                <div className="flex-1 overflow-y-auto">
                    {/* Category Tabs */}
                    <div className="flex gap-2 px-5 py-3 border-b border-line">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === tab.value
                                    ? 'bg-primary text-white'
                                    : 'bg-surface text-text-main hover:bg-line'
                                    }`}
                            >
                                {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Results */}
                    <div className="px-5 py-4">
                        {filteredExperiences.length > 0 ? (
                            <>
                                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                                    {query ? 'Resultados' : 'Actividades populares'}
                                </p>
                                <div className="divide-y divide-line">
                                    {filteredExperiences.map((exp) => (
                                        <Link
                                            key={exp.id}
                                            href={`/x/${exp.slug}`}
                                            onClick={onClose}
                                            className="flex items-center gap-4 py-3 group hover:bg-surface -mx-2 px-2 rounded-xl transition"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0">
                                                <Image
                                                    src={exp.imageUrl}
                                                    alt={exp.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-gray-900 group-hover:text-primary transition line-clamp-1">
                                                    {exp.title}
                                                </p>
                                                <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
                                                    <span>{CATEGORY_ICONS[exp.category] || '📍'}</span>
                                                    <span className="capitalize">{exp.category}</span>
                                                    <span className="text-line">·</span>
                                                    <span>Colonia Tovar</span>
                                                </p>
                                            </div>

                                            {/* Chevron */}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                className="text-text-muted/50 shrink-0"
                                            >
                                                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-sm text-text-muted">
                                    No encontramos resultados para &ldquo;{query}&rdquo;
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Popular Searches */}
                    {!query && (
                        <div className="px-5 pb-6">
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                                Búsquedas populares
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {POPULAR_SEARCHES.map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => handlePopularClick(term)}
                                        className="px-3.5 py-1.5 rounded-full border border-line text-sm text-text-main hover:border-primary hover:text-primary transition cursor-pointer"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes searchSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-12px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
