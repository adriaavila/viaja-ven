interface StepperProps {
    currentStep: number;
    totalSteps: number;
    labels: string[];
}

export default function Stepper({ currentStep, totalSteps, labels }: StepperProps) {
    return (
        <div className="w-full" role="navigation" aria-label="Progreso del planificador">
            {/* Step indicator text */}
            <p className="text-xs text-text-muted mb-3 uppercase tracking-wide font-medium">
                Paso {currentStep} de {totalSteps}
            </p>

            {/* Progress bar */}
            <div className="flex gap-2 mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor:
                                i < currentStep ? '#8e22bb' : '#EAECF0',
                        }}
                        role="progressbar"
                        aria-valuenow={i < currentStep ? 100 : 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={labels[i] || `Paso ${i + 1}`}
                    />
                ))}
            </div>

            {/* Step labels (desktop) */}
            <div className="hidden sm:flex gap-2">
                {labels.map((label, i) => (
                    <span
                        key={label}
                        className={`flex-1 text-xs transition-colors ${i < currentStep
                                ? 'text-primary font-medium'
                                : i === currentStep
                                    ? 'text-text-main font-medium'
                                    : 'text-text-muted'
                            }`}
                    >
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
}
