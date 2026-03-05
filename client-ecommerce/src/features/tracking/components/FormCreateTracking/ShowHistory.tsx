import { BiCalendar, BiCheckCircle, BiMapPin, BiPackage } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useTrackingEvents } from "../../hook/queries/useTracking";
import { FaCheckCircle } from "react-icons/fa";
import { useUpdateTrackingEventMutation } from "../../hook/mutation/useTrackingMutation";

interface ShowHistoryProps {
    showHistory: boolean;
    trackingId: string;
    setShowHistory: (showHistory: boolean) => void;
    handleDeleteEvent: (id: string) => void;
}
const ShowHistory = ({ showHistory, trackingId, handleDeleteEvent }: ShowHistoryProps) => {
    const { mutate: updateTrackingEvent } = useUpdateTrackingEventMutation(trackingId);
    const { data: trackingEvents } = useTrackingEvents(trackingId);

    const handleCompleteEvent = (id: string) => {
        const eventData = {
            id: id,
            completed: true
        }
        updateTrackingEvent(eventData);
    }

    const events = trackingEvents?.data ?? [];

    const orderedEvents = [...events].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );
    return (
        <div>
            {/* Tracking History */}
            {showHistory && (
                <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative mt-6">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-50"></div>
                    <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                        <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100">[TELEMETRÍA_DE_SEGUIMIENTO]</h2>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 border border-[#00f0ff]/30">{trackingEvents?.data?.length} EVENTOS_REGISTRADOS</span>
                    </div>

                    <div className="space-y-0">
                        {trackingEvents?.data?.length === 0 ? (
                            <div className="text-center py-8 text-zinc-600 bg-[#050505] border border-zinc-800 border-dashed">
                                <BiPackage className="w-8 h-8 mx-auto mb-3 opacity-50" />
                                <p className="font-mono text-xs tracking-widest uppercase">[NO_HAY_EVENTOS_REGISTRADOS]</p>
                            </div>
                        ) : (
                            orderedEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="relative pl-8 pb-8 border-l border-zinc-700 last:border-l-0 last:pb-0"
                                >
                                    {/* Timeline square node */}
                                    <div className={`absolute left-0 top-0 -translate-x-[5px] w-2.5 h-2.5 border flex items-center justify-center ${event.completed
                                        ? 'bg-[#e4ff00] border-[#e4ff00]'
                                        : 'bg-[#00f0ff]/20 border-[#00f0ff]'
                                        }`}></div>

                                    <div className="bg-[#050505] border border-zinc-800 p-4 hover:border-zinc-600 transition-colors group relative">
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 opacity-50"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 opacity-50"></div>

                                        <div className="flex items-start justify-between mb-3 border-b border-zinc-900 pb-3">
                                            <div>
                                                <h3 className="font-mono text-sm font-bold text-zinc-100 tracking-wider uppercase flex items-center gap-2">
                                                    <span className={`${event.completed ? 'text-[#e4ff00]' : 'text-[#00f0ff]'}`}>&gt;</span>
                                                    [{event.status}]
                                                </h3>
                                                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                                                    <BiMapPin className="w-3 h-3 text-zinc-400" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <ButtonAction
                                                    onClick={() => handleCompleteEvent(event.id)}
                                                    variant="secondary"
                                                    text=""
                                                    className="p-1 border border-zinc-800 bg-transparent text-zinc-500 hover:text-[#e4ff00] hover:border-[#e4ff00] transition-colors rounded-none"
                                                >
                                                    <FaCheckCircle className="w-4 h-4" />
                                                </ButtonAction>
                                                <ButtonAction
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                    variant="danger"
                                                    text=""
                                                    className="p-1 border border-zinc-800 bg-transparent text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] transition-colors rounded-none"
                                                >
                                                    <BsTrash2 className="w-4 h-4" />
                                                </ButtonAction>
                                            </div>
                                        </div>

                                        <p className="font-mono text-[11px] text-zinc-400 mb-4 leading-relaxed uppercase tracking-wider pl-4 border-l border-zinc-800">
                                            {event.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                                            <div className="flex items-center gap-1 bg-black px-2 py-1 border border-zinc-900">
                                                <BiCalendar className="w-3 h-3 text-zinc-500" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-black px-2 py-1 border border-zinc-900">
                                                <CiLock className="w-3 h-3 text-zinc-500" />
                                                <span>{event.time}</span>
                                            </div>
                                            {event.completed && (
                                                <span className="flex items-center gap-1 text-[#e4ff00] ml-auto">
                                                    <BiCheckCircle className="w-3 h-3" />
                                                    [EJECUTADO]
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowHistory;