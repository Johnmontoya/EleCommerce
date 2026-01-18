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
    handleDeleteEvent: (id: any) => void;
}
const ShowHistory = ({ showHistory, trackingId, handleDeleteEvent }: ShowHistoryProps) => {
    const { mutate: updateTrackingEvent } = useUpdateTrackingEventMutation(trackingId);
    const { data: trackingEvents } = useTrackingEvents(trackingId);

    const handleCompleteEvent = (id: any) => {
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
                <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="block text-slate-300 font-semibold">Historial de seguimiento</h2>
                        <span className="text-sm text-gray-400">{trackingEvents?.data?.length} eventos</span>
                    </div>

                    <div className="space-y-4">
                        {trackingEvents?.data?.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <BiPackage className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No hay eventos</p>
                            </div>
                        ) : (
                            orderedEvents.map((event: any) => (
                                <div
                                    key={event.id}
                                    className="relative pl-8 pb-6 border-l-2 border-gray-700 last:border-l-0 last:pb-0"
                                >
                                    {/* Timeline dot */}
                                    <div className={`absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full border-2 ${event.completed
                                        ? 'bg-emerald-600 border-emerald-600'
                                        : 'bg-blue-600 border-blue-600'
                                        }`}></div>

                                    <div className="bg-slate-700 rounded-lg p-4 hover:bg-[#1e2839] transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">{event.status}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <BiMapPin className="w-3.5 h-3.5" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <ButtonAction
                                                    onClick={() => handleCompleteEvent(event.id)}
                                                    variant="primary"
                                                    text=""
                                                    className="text-gray-500 group-hover:text-green-500"
                                                >
                                                    <FaCheckCircle className="w-4 h-4" />
                                                </ButtonAction>
                                                <ButtonAction
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                    variant="danger"
                                                    text=""
                                                    className="text-gray-500 group-hover:text-red-500"
                                                >
                                                    <BsTrash2 className="w-4 h-4" />
                                                </ButtonAction>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-300 mb-3">{event.description}</p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <BiCalendar className="w-3 h-3" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <CiLock className="w-3 h-3" />
                                                <span>{event.time}</span>
                                            </div>
                                            {event.completed && (
                                                <span className="flex items-center gap-1 text-green-500">
                                                    <BiCheckCircle className="w-3 h-3" />
                                                    Completed
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