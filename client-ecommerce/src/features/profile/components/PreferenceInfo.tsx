
interface PreferenceInfoProps {
    activeTab: "overview" | "orders" | "security" | "preferences";
}

const PreferenceInfo = ({ activeTab }: PreferenceInfoProps) => {
    return (
        <>
            {activeTab === "preferences" && (
                <div className="bg-[#050505] border border-zinc-800 p-6 md:p-8 font-mono relative group">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-600 group-hover:border-[#e4ff00] transition-colors" />

                    <h2 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="text-[#e4ff00]">{'>'}</span> [NOTIFICATION_PREFS]
                    </h2>

                    <div className="space-y-4">
                        <label className="flex items-start sm:items-center justify-between p-4 bg-black border border-zinc-900 cursor-pointer hover:border-[#e4ff00] transition-all group flex-col sm:flex-row gap-4">
                            <div className="border-l-2 border-zinc-800 pl-4">
                                <p className="text-white text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-[#e4ff00] transition-colors">
                                    [EMAIL_NOTIFICATIONS]
                                </p>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                                    RECEIVE ORDER UPDATES VIA EMAIL ALERTS
                                </p>
                            </div>
                            <div className="relative flex items-center shrink-0 sm:ml-4">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="peer appearance-none w-10 h-5 bg-zinc-900 border border-zinc-700 checked:bg-[#e4ff00]/20 checked:border-[#e4ff00] transition-colors cursor-pointer"
                                />
                                <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 peer-checked:bg-[#e4ff00] peer-checked:translate-x-5 transition-all pointer-events-none"></div>
                            </div>
                        </label>

                        <label className="flex items-start sm:items-center justify-between p-4 bg-black border border-zinc-900 cursor-pointer hover:border-[#e4ff00] transition-all group flex-col sm:flex-row gap-4">
                            <div className="border-l-2 border-zinc-800 pl-4">
                                <p className="text-white text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-[#e4ff00] transition-colors">
                                    [SYSTEM_PROMOTIONS]
                                </p>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                                    RECEIVE DATA ON SPECIAL OFFERS
                                </p>
                            </div>
                            <div className="relative flex items-center shrink-0 sm:ml-4">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="peer appearance-none w-10 h-5 bg-zinc-900 border border-zinc-700 checked:bg-[#e4ff00]/20 checked:border-[#e4ff00] transition-colors cursor-pointer"
                                />
                                <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 peer-checked:bg-[#e4ff00] peer-checked:translate-x-5 transition-all pointer-events-none"></div>
                            </div>
                        </label>

                        <label className="flex items-start sm:items-center justify-between p-4 bg-black border border-zinc-900 cursor-pointer hover:border-[#e4ff00] transition-all group flex-col sm:flex-row gap-4">
                            <div className="border-l-2 border-zinc-800 pl-4">
                                <p className="text-white text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-[#e4ff00] transition-colors">
                                    [WEEKLY_NEWSLETTER]
                                </p>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                                    RECEIVE WEEKLY SUMMARY OF SYSTEM LOGS
                                </p>
                            </div>
                            <div className="relative flex items-center shrink-0 sm:ml-4">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-10 h-5 bg-zinc-900 border border-zinc-700 checked:bg-[#e4ff00]/20 checked:border-[#e4ff00] transition-colors cursor-pointer"
                                />
                                <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 peer-checked:bg-[#e4ff00] peer-checked:translate-x-5 transition-all pointer-events-none"></div>
                            </div>
                        </label>
                    </div>
                </div>
            )}
        </>
    );
};

export default PreferenceInfo;