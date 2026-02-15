'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';
import Toast from '@/components/ui/Toast';
import ConfirmationModal from '@/components/ConfirmationModal';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import { usePlan } from '@/lib/plan-context';
import { generateItinerary } from '@/lib/mock/recommend';
import type { Category, TimeOfDay, PriceTier, Pace } from '@/lib/types';

const stepLabels = ['Fecha y horario', 'Personas e intereses', 'Presupuesto y ritmo'];

const timeChips: { value: TimeOfDay; label: string; subLabel: string; icon: string }[] = [
    { value: 'mañana', label: '08:00 AM', subLabel: 'Mañana', icon: '🌅' },
    { value: 'mediodía', label: '11:00 AM', subLabel: 'Mediodía', icon: '☀️' },
    { value: 'tarde', label: '02:00 PM', subLabel: 'Tarde', icon: '🌇' },
];

const interestOptions: { value: Category; label: string; icon: string }[] = [
    { value: 'café y postres', label: 'Café y postres', icon: '☕' },
    { value: 'comida típica', label: 'Comida típica', icon: '🍽️' },
    { value: 'cerveza artesanal', label: 'Cerveza artesanal', icon: '🍺' },
    { value: 'paseos cortos', label: 'Paseos cortos', icon: '🚶' },
    { value: 'familiar', label: 'Familiar', icon: '👨‍👩‍👧' },
    { value: 'alemana', label: 'Comida alemana', icon: '🥨' },
];

const budgetOptions: { value: PriceTier; label: string; icon: string }[] = [
    { value: 'económico', label: 'Económico', icon: '$' },
    { value: 'medio', label: 'Medio', icon: '$$' },
    { value: 'premium', label: 'Premium', icon: '$$$' },
];

const paceOptions: { value: Pace; label: string; description: string; icon: string }[] = [
    { value: 'relajado', label: 'Relajado', description: 'Sin apuros. Disfrutar con calma.', icon: '🐌' },
    { value: 'balanceado', label: 'Balanceado', description: 'Un buen mix de actividad y descanso.', icon: '⚖️' },
    { value: 'intenso', label: 'Intenso', description: 'Aprovecha cada momento del día.', icon: '⚡' },
];

const CONFETTI_COLORS = ['#FF3366', '#D63B63', '#F9A8B8', '#FFD700', '#8B5CF6', '#10B981'];

function Confetti() {
    const [pieces, setPieces] = useState<{ id: number; x: number; color: string; delay: number; rotate: number }[]>([]);

    useEffect(() => {
        const newPieces = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            delay: Math.random() * 0.5,
            rotate: Math.random() * 360,
        }));
        setPieces(newPieces);

        const timer = setTimeout(() => setPieces([]), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.x}%`,
                        top: '-10px',
                        backgroundColor: p.color,
                        animationDelay: `${p.delay}s`,
                        transform: `rotate(${p.rotate}deg)`,
                    }}
                />
            ))}
        </>
    );
}

export default function PlanPage() {
    const router = useRouter();
    const { state, dispatch } = usePlan();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const stepContainerRef = useRef<HTMLDivElement>(null);

    const { selections } = state;

    // Date picker
    const [selectedMonth] = useState(() => {
        const d = new Date();
        return { year: d.getFullYear(), month: d.getMonth() };
    });

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(selectedMonth.year, selectedMonth.month);
    const firstDay = getFirstDayOfMonth(selectedMonth.year, selectedMonth.month);
    const monthName = new Date(selectedMonth.year, selectedMonth.month).toLocaleDateString('es', { month: 'long', year: 'numeric' });

    const handleDateSelect = (day: number) => {
        const dateStr = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dispatch({ type: 'SET_DATE', payload: dateStr });
    };

    const goToStep = (newStep: number) => {
        setSlideDirection(newStep > step ? 'right' : 'left');
        setStep(newStep);
    };

    const handleGenerateItinerary = useCallback(() => {
        const itinerary = generateItinerary(selections);
        dispatch({ type: 'SET_ITINERARY', payload: itinerary });
        setShowResult(true);
        setShowConfetti(true);
        setShowToast(true);
        setTimeout(() => setShowConfetti(false), 2500);
    }, [selections, dispatch]);

    const canProceedStep1 = selections.date && selections.timeOfDay;
    const canProceedStep2 = selections.groupSize > 0 && selections.interests.length > 0;
    const canProceedStep3 = selections.budget && selections.pace;

    const today = new Date().getDate();

    const slideClass = slideDirection === 'right'
        ? 'animate-[slideRight_350ms_cubic-bezier(0.22,1,0.36,1)]'
        : 'animate-[slideLeft_350ms_cubic-bezier(0.22,1,0.36,1)]';

    return (
        <div className="page-enter">
            {showConfetti && <Confetti />}

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    {step > 1 && !showResult && (
                        <button
                            onClick={() => goToStep(step - 1)}
                            className="p-2 rounded-lg text-text-main hover:bg-surface transition cursor-pointer"
                            aria-label="Paso anterior"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                    <h1 className="font-heading font-semibold text-lg text-[#1D2939] flex-1 text-center">
                        {showResult ? '🎉 Tu plan sugerido' : 'Planificador'}
                    </h1>
                    <div className="w-10" />
                </div>

                {!showResult && (
                    <Stepper currentStep={step} totalSteps={3} labels={stepLabels} />
                )}

                {/* ── Step 1: Date & Time ── */}
                {step === 1 && !showResult && (
                    <div ref={stepContainerRef} key="step-1" className={`mt-8 ${slideClass}`}>
                        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1D2939] mb-2">
                            ¿Cuándo planeas tu visita?
                        </h2>
                        <p className="text-sm text-text-muted mb-8">
                            Selecciona el día y el momento en el que quieres disfrutar tu visita.
                        </p>

                        {/* Calendar */}
                        <div className="bg-white border border-line rounded-2xl p-5 mb-6">
                            <p className="font-medium text-sm text-[#1D2939] mb-4 capitalize">{monthName}</p>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs text-text-muted mb-2">
                                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map((d) => (
                                    <span key={d} className="py-1 font-medium">{d}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dateStr = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const isSelected = selections.date === dateStr;
                                    const isPast = day < today;
                                    const isToday = day === today;
                                    return (
                                        <button
                                            key={day}
                                            onClick={() => !isPast && handleDateSelect(day)}
                                            disabled={isPast}
                                            className={`aspect-square rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer relative ${isSelected
                                                ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                                                : isPast
                                                    ? 'text-text-muted/40 cursor-not-allowed'
                                                    : isToday
                                                        ? 'text-primary font-bold ring-1 ring-primary/30'
                                                        : 'text-text-main hover:bg-primary-soft/10'
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time of day */}
                        <div>
                            <p className="font-medium text-sm text-[#1D2939] mb-3">Hora de inicio</p>
                            <div className="grid grid-cols-3 gap-3">
                                {timeChips.map((t) => {
                                    const isSelected = selections.timeOfDay === t.value;
                                    return (
                                        <button
                                            key={t.value}
                                            onClick={() => dispatch({ type: 'SET_TIME_OF_DAY', payload: t.value })}
                                            className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'border-primary bg-primary-soft/10 text-primary shadow-sm shadow-primary/10'
                                                : 'border-line text-text-main hover:border-primary-soft'
                                                }`}
                                        >
                                            <p className="text-lg mb-1">{t.icon}</p>
                                            <p className="font-medium text-sm">{t.label}</p>
                                            <p className="text-xs text-text-muted">{t.subLabel}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={() => goToStep(2)}
                                disabled={!canProceedStep1}
                                fullWidth
                                size="lg"
                            >
                                Continuar →
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 2: People & Interests ── */}
                {step === 2 && !showResult && (
                    <div key="step-2" className={`mt-8 ${slideClass}`}>
                        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1D2939] mb-2">
                            Cuéntanos sobre tu grupo
                        </h2>
                        <p className="text-sm text-text-muted mb-8">
                            Personaliza tu experiencia según quiénes la disfrutarán.
                        </p>

                        {/* Group size */}
                        <div className="mb-8">
                            <p className="font-medium text-sm text-[#1D2939] mb-3">¿Cuántas personas?</p>
                            <div className="flex items-center gap-5">
                                <button
                                    onClick={() =>
                                        selections.groupSize > 1 &&
                                        dispatch({ type: 'SET_GROUP_SIZE', payload: selections.groupSize - 1 })
                                    }
                                    className="w-12 h-12 rounded-xl border border-line flex items-center justify-center text-text-main hover:border-primary-soft hover:bg-primary-soft/5 transition cursor-pointer text-lg"
                                    aria-label="Reducir personas"
                                >
                                    −
                                </button>
                                <span className="font-heading font-bold text-3xl text-[#1D2939] w-12 text-center tabular-nums">
                                    {selections.groupSize}
                                </span>
                                <button
                                    onClick={() =>
                                        dispatch({ type: 'SET_GROUP_SIZE', payload: selections.groupSize + 1 })
                                    }
                                    className="w-12 h-12 rounded-xl border border-line flex items-center justify-center text-text-main hover:border-primary-soft hover:bg-primary-soft/5 transition cursor-pointer text-lg"
                                    aria-label="Añadir personas"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Interests */}
                        <div>
                            <p className="font-medium text-sm text-[#1D2939] mb-2">Intereses</p>
                            <p className="text-xs text-text-muted mb-4">Selecciona al menos uno para personalizar tu ruta.</p>
                            <div className="grid grid-cols-2 gap-3">
                                {interestOptions.map((opt) => {
                                    const isSelected = selections.interests.includes(opt.value);
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={() =>
                                                dispatch({ type: 'TOGGLE_INTEREST', payload: opt.value })
                                            }
                                            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'border-primary bg-primary-soft/10 shadow-sm shadow-primary/10'
                                                : 'border-line hover:border-primary-soft'
                                                }`}
                                        >
                                            <span className="text-xl">{opt.icon}</span>
                                            <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-text-main'}`}>
                                                {opt.label}
                                            </span>
                                            {isSelected && (
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto text-primary shrink-0">
                                                    <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <Button onClick={() => goToStep(1)} variant="secondary" className="flex-1">
                                ← Atrás
                            </Button>
                            <Button
                                onClick={() => goToStep(3)}
                                disabled={!canProceedStep2}
                                className="flex-1"
                            >
                                Continuar →
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Budget & Pace ── */}
                {step === 3 && !showResult && (
                    <div key="step-3" className={`mt-8 ${slideClass}`}>
                        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1D2939] mb-2">
                            Define el ritmo de tu día
                        </h2>
                        <p className="text-sm text-text-muted mb-8">
                            Últimos detalles para crear tu plan personalizado.
                        </p>

                        {/* Budget */}
                        <div className="mb-8">
                            <p className="font-medium text-sm text-[#1D2939] mb-3">
                                Presupuesto por persona
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                {budgetOptions.map((opt) => {
                                    const isSelected = selections.budget === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={() =>
                                                dispatch({ type: 'SET_BUDGET', payload: opt.value })
                                            }
                                            className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'border-primary bg-primary-soft/10 shadow-sm shadow-primary/10'
                                                : 'border-line hover:border-primary-soft'
                                                }`}
                                        >
                                            <p className="font-heading font-bold text-lg mb-0.5">{opt.icon}</p>
                                            <p className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-text-muted'}`}>
                                                {opt.label}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-text-muted mt-2">
                                Incluye comidas, entradas y transporte local.
                            </p>
                        </div>

                        {/* Pace */}
                        <div>
                            <p className="font-medium text-sm text-[#1D2939] mb-3">Ritmo</p>
                            <div className="space-y-3">
                                {paceOptions.map((opt) => {
                                    const isSelected = selections.pace === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={() =>
                                                dispatch({ type: 'SET_PACE', payload: opt.value })
                                            }
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'border-primary bg-primary-soft/10 shadow-sm shadow-primary/10'
                                                : 'border-line hover:border-primary-soft'
                                                }`}
                                        >
                                            <span className="text-xl">{opt.icon}</span>
                                            <div className="flex-1">
                                                <p className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-text-main'}`}>
                                                    {opt.label}
                                                </p>
                                                <p className="text-xs text-text-muted">{opt.description}</p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-primary' : 'border-line'
                                                }`}>
                                                {isSelected && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-[countPop_0.3s_ease-out]" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <Button onClick={() => goToStep(2)} variant="secondary" className="flex-1">
                                ← Atrás
                            </Button>
                            <Button
                                onClick={handleGenerateItinerary}
                                disabled={!canProceedStep3}
                                className="flex-1 btn-glow"
                            >
                                Generar itinerario ✨
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Result ── */}
                {showResult && state.itinerary && (
                    <div className="mt-6 animate-[pageIn_500ms_cubic-bezier(0.22,1,0.36,1)]">
                        <p className="text-sm text-text-muted mb-6">
                            Este es un itinerario recomendado según tus preferencias. Puedes ajustarlo libremente.
                        </p>

                        {/* Summary bar */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary-soft/15 text-primary">
                                📅 {state.itinerary.date}
                            </span>
                            <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary-soft/15 text-primary">
                                👥 {state.itinerary.groupSize} personas
                            </span>
                            <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary-soft/15 text-primary">
                                ⏱️ {Math.round(state.itinerary.totalDuration / 60)}h total
                            </span>
                        </div>

                        <ItineraryTimeline items={state.itinerary.items} />

                        <p className="text-xs text-text-muted mt-6 mb-4">
                            Te contactaremos para confirmar disponibilidad y resolver cualquier duda.
                        </p>

                        <div className="space-y-3 pb-24">
                            <Button onClick={() => setShowModal(true)} fullWidth size="lg" className="btn-glow">
                                Solicitar confirmación
                            </Button>
                            <Button
                                onClick={() => {
                                    if (state.itinerary) {
                                        router.push(`/itinerary/${state.itinerary.id}`);
                                    }
                                }}
                                variant="secondary"
                                fullWidth
                            >
                                Ver itinerario completo
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowResult(false);
                                    setStep(1);
                                }}
                                variant="ghost"
                                fullWidth
                            >
                                Modificar preferencias
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                itinerary={state.itinerary}
            />

            <Toast
                message="🎉 Plan guardado correctamente"
                isVisible={showToast}
                onDismiss={() => setShowToast(false)}
            />

            <style jsx>{`
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideLeft {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
