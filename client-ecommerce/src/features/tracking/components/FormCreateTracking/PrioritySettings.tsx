interface PrioritySettingsProps {
    priority: string;
    setPriority: (priority: string) => void;
    priorityOptions: { value: string; label: string; color: string }[];
}
const PrioritySettings = ({ priority, setPriority, priorityOptions }: PrioritySettingsProps) => {
    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#ff0055] opacity-50"></div>

            <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
                <div className="w-2 h-5 bg-[#ff0055]"></div>
                <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100">[CONFIG_PRIORIDAD]</h2>
            </div>

            <div>
                <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-4">[NIVEL_DE_DESPACHO]</label>
                <div className="space-y-3">
                    {priorityOptions.map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${priority === option.value
                                ? 'border-[#00f0ff] bg-[#00f0ff]/5'
                                : 'border-zinc-800 bg-[#050505] hover:border-zinc-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 border flex items-center justify-center ${priority === option.value ? 'border-[#00f0ff]' : 'border-zinc-600'
                                    }`}>
                                    {priority === option.value && (
                                        <div className="w-2 h-2 bg-[#00f0ff]"></div>
                                    )}
                                </div>
                                <span className="text-zinc-300 font-mono tracking-wider uppercase text-xs">[{option.value}]</span>
                            </div>
                            <span className={`${option.color} text-black font-mono tracking-widest uppercase text-[10px] px-2 py-1`}>
                                {option.label}
                            </span>
                            <input
                                type="radio"
                                name="priority"
                                value={option.value}
                                checked={priority === option.value}
                                onChange={(e) => setPriority(e.target.value)}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PrioritySettings