// src/features/checkout/components/CheckoutStepper.tsx
import type { CheckoutStep } from "../../types/checkout.types";

const STEPS: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    {
        key: "summary",
        label: "Resumen",
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
    },
    {
        key: "address",
        label: "Envío",
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        key: "payment",
        label: "Pago",
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
    },
];

const STEP_ORDER: CheckoutStep[] = ["summary", "address", "payment"];

interface CheckoutStepperProps {
    currentStep: CheckoutStep;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
    const currentIdx = STEP_ORDER.indexOf(currentStep);

    return (
        <div className="flex items-center justify-center mb-4">
            {STEPS.map((step, idx) => {
                const isCompleted = idx < currentIdx;
                const isActive = idx === currentIdx;

                return (
                    <div key={step.key} className="flex items-center">
                        {/* Círculo del paso */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                                ? "bg-sky-500 border-sky-500 text-white"
                                : isActive
                                    ? "border-sky-500 text-sky-400 bg-sky-500/10"
                                    : "border-slate-700 text-slate-600"
                                }`}>
                                {isCompleted ? (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.icon
                                )}
                            </div>
                            <span className={`text-xs font-medium transition-colors ${isActive
                                ? "text-sky-400"
                                : isCompleted
                                    ? "text-slate-400"
                                    : "text-slate-600"
                                }`}>
                                {step.label}
                            </span>
                        </div>

                        {/* Línea conectora */}
                        {idx < STEPS.length - 1 && (
                            <div className={`w-16 h-0.5 mx-2 mb-5 rounded transition-colors duration-300 ${idx < currentIdx ? "bg-sky-500" : "bg-slate-700"
                                }`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}