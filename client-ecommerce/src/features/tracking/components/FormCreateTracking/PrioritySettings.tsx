interface PrioritySettingsProps {
    priority: string;
    setPriority: (priority: string) => void;
    priorityOptions: { value: string; label: string; color: string }[];
}
const PrioritySettings = ({ priority, setPriority, priorityOptions }: PrioritySettingsProps) => {
    return (
        <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                <h2 className="block text-slate-300 font-semibold">Prioridad de configuracion</h2>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-3">Prioridad de envio</label>
                <div className="space-y-3">
                    {priorityOptions.map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${priority === option.value
                                ? 'border-blue-600 bg-blue-600/10'
                                : 'border-slate-600 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${priority === option.value ? 'border-blue-600' : 'border-gray-600'
                                    }`}>
                                    {priority === option.value && (
                                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                                    )}
                                </div>
                                <span className="text-slate-300">{option.value}</span>
                            </div>
                            <span className={`${option.color} text-white text-xs px-2.5 py-0.5 rounded-full font-medium`}>
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