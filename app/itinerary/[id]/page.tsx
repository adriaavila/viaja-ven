'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ConfirmationModal from '@/components/ConfirmationModal';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import { usePlan } from '@/lib/plan-context';

interface ItineraryPageProps {
    params: Promise<{ id: string }>;
}

export default function ItineraryPage({ params }: ItineraryPageProps) {
    const { id } = use(params);
    const { state } = usePlan();
    const [showModal, setShowModal] = useState(false);

    const itinerary = state.itinerary;

    // If no itinerary or wrong ID, show empty state
    if (!itinerary) {
        return (
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center page-enter">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14 7v7l4.667 2.333" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="14" cy="14" r="10.5" stroke="#98A2B3" strokeWidth="1.5" />
                    </svg>
                </div>
                <h1 className="font-heading font-bold text-2xl text-[#1D2939] mb-3">
                    No tienes un itinerario aún
                </h1>
                <p className="text-text-muted mb-8 max-w-sm mx-auto">
                    Crea tu plan personalizado con nuestro planificador para ver tu itinerario aquí.
                </p>
                <Button href="/plan">Crear mi plan</Button>
            </div>
        );
    }

    const paceLabel: Record<string, string> = {
        relajado: 'Relajado',
        balanceado: 'Balanceado',
        intenso: 'Intenso',
    };

    return (
        <div className="page-enter">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-32">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link
                        href="/plan"
                        className="p-2 rounded-lg text-text-main hover:bg-surface transition"
                        aria-label="Volver al planificador"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="font-heading font-semibold text-lg text-[#1D2939] flex-1">
                        Tu itinerario
                    </h1>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-line text-text-main hover:bg-surface transition cursor-pointer"
                            onClick={() => {
                                // Mock: share
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'Mi itinerario en Viaja',
                                        text: 'Mira mi plan gastronómico en Viaja',
                                        url: window.location.href,
                                    }).catch(() => { });
                                }
                            }}
                        >
                            Compartir
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-surface rounded-2xl p-5 mb-8">
                    <h2 className="font-heading font-bold text-xl text-[#1D2939] mb-3">
                        Tu itinerario
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-line text-text-main">
                            📅 {itinerary.date}
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-line text-text-main">
                            👥 {itinerary.groupSize} personas
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-line text-text-main">
                            🎯 {paceLabel[itinerary.pace]}
                        </span>
                        <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-line text-text-main">
                            ⏱️ {Math.round(itinerary.totalDuration / 60)} horas
                        </span>
                    </div>
                </div>

                {/* Timeline */}
                <ItineraryTimeline
                    items={itinerary.items}
                    onViewLocation={(itemId) => {
                        // Mock: open map
                        const item = itinerary.items.find((i) => i.id === itemId);
                        if (item) {
                            window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.experience.locationName)}`,
                                '_blank'
                            );
                        }
                    }}
                    onSwap={() => {
                        // Mock: would open a swap modal
                    }}
                />

                {/* Notes */}
                <p className="text-xs text-text-muted mt-8 text-center">
                    Puedes modificar tu plan en cualquier momento.
                </p>
            </div>

            {/* Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-line p-4 z-30 sticky-cta">
                <div className="max-w-2xl mx-auto">
                    <Button onClick={() => setShowModal(true)} fullWidth size="lg">
                        Confirmar este plan
                    </Button>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                itinerary={itinerary}
            />
        </div>
    );
}
