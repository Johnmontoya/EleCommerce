import { BiLoader, BiPlus } from "react-icons/bi";

interface TrackingEventFormProps {
    currentEvent: {
        status: string;
        description: string;
        location: string;
        date: string;
        time: string;
        completed: boolean;
        order: number;
    };
    setCurrentEvent: (event: any) => void;
    handleSaveEvent: () => void;
    setShowHistory: (value: boolean) => void;
    showHistory: boolean;
    trackingHistory: any;
    //isLoading?: boolean;
}

const TrackingEventForm: React.FC<TrackingEventFormProps> = ({
    currentEvent,
    setCurrentEvent,
    handleSaveEvent,
    setShowHistory,
    showHistory,
    trackingHistory,
    //isLoading = false
}) => {

    const handleChange = (field: string, value: any) => {
        setCurrentEvent({
            ...currentEvent,
            [field]: value
        });
    };

    const isFormValid = currentEvent.location && currentEvent.description;

    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-50"></div>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 border border-[#00f0ff] flex items-center justify-center bg-[#00f0ff]/10`}>
                        <BiLoader className="w-3.5 h-3.5 animate-spin text-[#00f0ff]" />
                    </div>
                    <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100">[NEW_TELEMETRY_EVENT]</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [CURRENT_LOGISTIC_STATUS] *
                    </label>
                    <select
                        value={currentEvent.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all appearance-none cursor-pointer"
                    >
                        <option value="CONFIRMED" className="bg-black">[CONFIRMED]</option>
                        <option value="PROCESSING" className="bg-black">[PROCESSING]</option>
                        <option value="SHIPPED" className="bg-black">[SHIPPED]</option>
                        <option value="DELIVERED" className="bg-black">[DELIVERED]</option>
                        <option value="CANCELLED" className="bg-black">[CANCELLED]</option>
                        <option value="REFUNDED" className="bg-black">[REFUNDED]</option>
                    </select>
                </div>
                <div>
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [CURRENT_NODE_LOCATION] *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={currentEvent.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all shadow-inner"
                            placeholder="[INPUT_LOCATION]"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [EVENT_DATE]
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={currentEvent.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            className="w-full bg-[#050505] border border-zinc-800 text-[#00f0ff] font-mono tracking-wider px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all cursor-pointer"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [EVENT_TIMESTAMP]
                    </label>
                    <div className="relative">
                        <input
                            type="time"
                            value={currentEvent.time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            className="w-full bg-[#050505] border border-zinc-800 text-[#00f0ff] font-mono tracking-wider px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                    [STATUS_DESCRIPTION_LOG] *
                </label>
                <textarea
                    value={currentEvent.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-4 focus:outline-none focus:border-[#00f0ff] focus:bg-black transition-all min-h-[100px] resize-none disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                    placeholder="[ENTER_LOG_DATA...]"
                />
            </div>

            <div className="flex items-center gap-3 mb-8 bg-[#050505] border border-zinc-800 p-3 w-fit">
                <input
                    type="checkbox"
                    id="completed"
                    checked={currentEvent.completed}
                    onChange={(e) => handleChange('completed', e.target.checked)}
                    className="w-4 h-4 text-[#e4ff00] bg-black border-zinc-600 rounded-none focus:ring-[#e4ff00] focus:ring-1 appearance-none checked:bg-[#e4ff00] checked:border-[#e4ff00] transition-colors cursor-pointer"
                />
                <label htmlFor="completed" className="text-zinc-400 font-mono text-xs uppercase tracking-widest cursor-pointer">
                    [MARK_NODE_COMPLETED]
                </label>
            </div>

            <div className="w-full flex justify-end gap-3 border-t border-zinc-800 pt-6">
                <button
                    onClick={handleSaveEvent}
                    disabled={!isFormValid}
                    className="flex items-center justify-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] font-mono hover:bg-[#00f0ff] hover:text-black transition-colors px-6 py-2 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <BiPlus className="w-4 h-4" />
                    [LOG_EVENT]
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); setShowHistory(!showHistory); }}
                    className="flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-zinc-400 font-mono hover:border-zinc-500 hover:text-zinc-200 transition-colors px-6 py-2 uppercase tracking-widest text-xs"
                >
                    {showHistory ? '[HIDE_LOGS]' : '[VIEW_LOGS]'} ({trackingHistory?.data?.events?.length || 0})
                </button>
            </div>
        </div>
    );
};

export default TrackingEventForm;