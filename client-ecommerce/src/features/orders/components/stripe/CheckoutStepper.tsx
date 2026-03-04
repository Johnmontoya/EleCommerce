// src/features/checkout/components/CheckoutStepper.tsx
import type { CheckoutStep } from "../../types/checkout.types";

const STEPS: { key: CheckoutStep; label: string }[] = [
    { key: "resumen", label: "RESUMEN" },
    { key: "direccion", label: "DIRECCION" },
    { key: "pago", label: "PAGO" },
];

const STEP_ORDER: CheckoutStep[] = ["resumen", "direccion", "pago"];

interface CheckoutStepperProps {
    currentStep: CheckoutStep;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
    const currentIdx = STEP_ORDER.indexOf(currentStep);

    return (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80 mt-6 relative" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <div className="absolute -bottom-[1px] left-0 w-8 h-[2px] bg-[#00f0ff]" />
            <div className="flex items-center gap-1 sm:gap-4 w-full justify-between">
                {STEPS.map((step, idx) => {
                    const isCompleted = idx < currentIdx;
                    const isActive = idx === currentIdx;
                    const stepNum = `0${idx + 1}`;

                    return (
                        <div key={step.key} className="flex items-center flex-1 last:flex-none">
                            <div className={`flex flex-col gap-1 transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs sm:text-sm font-bold tracking-widest ${isActive ? "text-[#00f0ff]" : isCompleted ? "text-zinc-400" : "text-zinc-700"
                                        }`}>
                                        [{stepNum}]
                                    </span>
                                    <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] transform transition-all ${isActive
                                        ? "text-zinc-100"
                                        : isCompleted
                                            ? "text-zinc-500"
                                            : "text-zinc-700"
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                                <div className={`h-1 w-full flex gap-[1px]`}>
                                    {/* Small progression bars below the text */}
                                    <div className={`h-full w-2 ${isActive || isCompleted ? 'bg-[#00f0ff]' : 'bg-zinc-800'}`} />
                                    <div className={`h-full flex-1 ${isActive ? 'bg-[#00f0ff]/40' : isCompleted ? 'bg-[#00f0ff]' : 'bg-zinc-800'}`} />
                                </div>
                            </div>

                            {/* Separator line */}
                            {idx < STEPS.length - 1 && (
                                <div className="flex-1 px-2 sm:px-4 hidden sm:flex items-center">
                                    <div className={`h-[1px] w-full border-t border-dashed ${isCompleted ? 'border-[#00f0ff]/50' : 'border-zinc-800'}`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}