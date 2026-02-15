'use client';

import { use, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import ExperienceCard from '@/components/ExperienceCard';
import { getExperienceBySlug, experiences } from '@/lib/mock/experiences';
import { usePlan } from '@/lib/plan-context';

interface ExperienceDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
    const { slug } = use(params);
    const experience = getExperienceBySlug(slug);
    const { addExperience, removeExperience, isInPlan } = usePlan();
    const [showToast, setShowToast] = useState(false);

    const handleTogglePlan = useCallback(() => {
        if (!experience) return;
        if (isInPlan(experience.id)) {
            removeExperience(experience.id);
        } else {
            addExperience(experience);
            setShowToast(true);
        }
    }, [experience, isInPlan, addExperience, removeExperience]);

    if (!experience) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center page-enter">
                <h1 className="font-heading font-bold text-2xl text-[#1D2939] mb-4">
                    Experiencia no encontrada
                </h1>
                <p className="text-text-muted mb-8">
                    La experiencia que buscas no está disponible.
                </p>
                <Button href="/explore">Explorar experiencias</Button>
            </div>
        );
    }

    const inPlan = isInPlan(experience.id);
    const similar = experiences
        .filter((e) => e.category === experience.category && e.id !== experience.id)
        .slice(0, 3);

    const priceTierLabel: Record<string, string> = {
        económico: 'Económico',
        medio: 'Medio',
        premium: 'Premium',
    };

    return (
        <div className="page-enter">
            {/* Hero Image */}
            <section className="relative h-[50vh] min-h-[300px] max-h-[480px]">
                <Image
                    src={experience.imageUrl}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 overlay-gradient opacity-60" />

                {/* Back button */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Link
                        href="/explore"
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-text-main hover:bg-white transition"
                        aria-label="Volver"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Featured badge */}
                <div className="absolute bottom-6 left-4 sm:left-6 z-10">
                    <Badge variant="category" className="mb-2">Experiencia destacada</Badge>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                <div className="lg:grid lg:grid-cols-3 lg:gap-10">
                    {/* Main content */}
                    <div className="lg:col-span-2 py-8">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {experience.tags.map((tag) => (
                                <Badge key={tag}>{tag}</Badge>
                            ))}
                        </div>

                        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D2939] mb-2">
                            {experience.title}
                        </h1>
                        <p className="text-text-muted mb-6">{experience.shortDescription}</p>

                        {/* Quick facts */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 bg-surface rounded-2xl">
                            <div>
                                <p className="text-xs text-text-muted mb-1">Duración estimada</p>
                                <p className="text-sm font-medium text-text-main">
                                    {experience.durationMinutes >= 60
                                        ? `${Math.floor(experience.durationMinutes / 60)}–${Math.ceil(experience.durationMinutes / 60) + 1} horas`
                                        : `${experience.durationMinutes} min`}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted mb-1">Ubicación</p>
                                <p className="text-sm font-medium text-text-main">Colonia Tovar</p>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted mb-1">Ideal para</p>
                                <p className="text-sm font-medium text-text-main">
                                    {experience.idealFor.join(' · ')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted mb-1">Presupuesto</p>
                                <p className="text-sm font-medium text-text-main">
                                    {priceTierLabel[experience.priceTier]}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="font-heading font-semibold text-lg text-[#1D2939] mb-3">
                                Sobre la experiencia
                            </h2>
                            <p className="text-text-main leading-relaxed">{experience.description}</p>
                        </div>

                        {/* What's included */}
                        <div className="mb-8">
                            <h2 className="font-heading font-semibold text-lg text-[#1D2939] mb-3">
                                Qué incluye
                            </h2>
                            <ul className="space-y-2">
                                {experience.includes.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-text-main">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0 text-primary">
                                            <path d="M13.5 5.25L7.5 12.75L4.5 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Location */}
                        <div className="mb-8">
                            <h2 className="font-heading font-semibold text-lg text-[#1D2939] mb-3">
                                Ubicación
                            </h2>
                            <div className="rounded-2xl bg-surface border border-line p-5 flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary shrink-0">
                                    <path d="M10 10.833a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M10 17.5s-5.833-4.375-5.833-9.167a5.833 5.833 0 1111.666 0c0 4.792-5.833 9.167-5.833 9.167z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <span className="text-sm text-text-main">{experience.locationName}</span>
                            </div>
                        </div>

                        {/* Similar */}
                        {similar.length > 0 && (
                            <div>
                                <h2 className="font-heading font-semibold text-lg text-[#1D2939] mb-4">
                                    Experiencias similares
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {similar.map((exp) => (
                                        <ExperienceCard key={exp.id} experience={exp} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky side card (desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24 bg-white border border-line rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-text-muted">Precio por persona</p>
                                    <p className="font-heading font-bold text-2xl text-[#1D2939]">
                                        {experience.pricePerPerson
                                            ? `$${experience.pricePerPerson}`
                                            : 'Gratis'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1l1.8 3.65L13 5.24 9.97 8.15l.7 4L7 10.365 3.33 12.15l.7-4L1 5.24l4.2-.59L7 1z" fill="#F59E0B" />
                                    </svg>
                                    <span className="font-medium">{experience.rating}</span>
                                    <span className="text-text-muted">({experience.reviewCount})</span>
                                </div>
                            </div>

                            <Button onClick={handleTogglePlan} fullWidth className="mb-3">
                                {inPlan ? '✓ En tu plan' : 'Agregar al plan'}
                            </Button>
                            <Button variant="secondary" href="/plan" fullWidth>
                                Guardar para después
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky mobile CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line p-3 flex gap-3 z-30 sticky-cta">
                <div className="flex-1">
                    <p className="text-xs text-text-muted">
                        {experience.pricePerPerson
                            ? `$${experience.pricePerPerson} / persona`
                            : 'Gratis'}
                    </p>
                </div>
                <Button onClick={handleTogglePlan} size="md">
                    {inPlan ? '✓ En tu plan' : 'Agregar al plan'}
                </Button>
            </div>

            {/* Toast */}
            <Toast
                message="Agregado al plan"
                isVisible={showToast}
                onDismiss={() => setShowToast(false)}
            />
        </div>
    );
}
