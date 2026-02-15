import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import type { ItineraryItem as ItineraryItemType } from '@/lib/types';

interface ItineraryTimelineProps {
    items: ItineraryItemType[];
    onSwap?: (itemId: string) => void;
    onViewLocation?: (itemId: string) => void;
}

export default function ItineraryTimeline({
    items,
    onSwap,
    onViewLocation,
}: ItineraryTimelineProps) {
    return (
        <div className="relative" role="list" aria-label="Itinerario">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-line" aria-hidden="true" />

            <div className="space-y-1">
                {items.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4" role="listitem">
                        {/* Time marker */}
                        <div className="flex flex-col items-center shrink-0 w-12 pt-1">
                            <div className={`w-3 h-3 rounded-full border-2 z-10 ${index === 0 ? 'bg-primary border-primary' : 'bg-white border-primary-soft'
                                }`} />
                            <span className="text-xs font-medium text-text-muted mt-1">{item.time}</span>
                        </div>

                        {/* Card */}
                        <div className="flex-1 bg-white border border-line rounded-2xl p-3 mb-4 hover:shadow-sm transition-shadow">
                            <div className="flex gap-3">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={item.experience.imageUrl}
                                        alt={item.experience.title}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <Badge variant="category" className="mb-1 text-[10px]">
                                        {item.experience.category}
                                    </Badge>
                                    <h4 className="font-heading font-semibold text-sm text-[#1D2939] leading-tight line-clamp-1">
                                        {item.experience.title}
                                    </h4>
                                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                                        {item.experience.shortDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-3 pt-3 border-t border-line/50">
                                {onViewLocation && (
                                    <button
                                        onClick={() => onViewLocation(item.id)}
                                        className="text-xs text-primary font-medium hover:underline cursor-pointer"
                                    >
                                        Ver ubicación
                                    </button>
                                )}
                                {onSwap && (
                                    <>
                                        <span className="text-line">·</span>
                                        <button
                                            onClick={() => onSwap(item.id)}
                                            className="text-xs text-primary font-medium hover:underline cursor-pointer"
                                        >
                                            Cambiar experiencia
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
