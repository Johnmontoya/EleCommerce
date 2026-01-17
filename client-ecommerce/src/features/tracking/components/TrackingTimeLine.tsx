import { BiCheckCircle, BiMapPin, BiPackage, BiTime } from "react-icons/bi";
import { FaBoxOpen, FaShippingFast } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalShipping, MdOutlineWarehouse } from "react-icons/md";

interface TrackingTimeLineProps {
    trackingHistory: any;
}

const TrackingTimeLine: React.FC<TrackingTimeLineProps> = ({ trackingHistory }) => {

    const getStatusIcon = (index: number) => {
        const icons = [
            <BiCheckCircle size={24} />,
            <FaBoxOpen size={24} />,
            <MdOutlineWarehouse size={24} />,
            <MdLocalShipping size={24} />,
            <FaShippingFast size={24} />,
            <IoLocationSharp size={24} />,
        ];
        return icons[index] || <BiPackage size={24} />;
    };

    const events = trackingHistory?.data?.events ?? [];

    const orderedEvents = [...events].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );

    return (
        <div className="lg:col-span-2">
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-6">
                    Historial de Seguimiento
                </h2>

                <div className="space-y-4">
                    {orderedEvents.map((event: any, index: number) => (
                        <div key={event.id} className="flex gap-4">
                            {/* Timeline Icon */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${event.completed
                                        ? "bg-cyan-500/20 text-cyan-400"
                                        : "bg-slate-700/50 text-slate-500"
                                        }`}
                                >
                                    {getStatusIcon(index)}
                                </div>
                                {index < trackingHistory.data.events.length - 1 && (
                                    <div
                                        className={`w-0.5 h-16 ${event.completed ? "bg-cyan-500/50" : "bg-slate-700"
                                            }`}
                                    ></div>
                                )}
                            </div>
                            {/* Event Details */}
                            <div className="flex-1 pb-8">
                                <div className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3
                                            className={`font-bold ${event.completed ? "text-slate-100" : "text-slate-500"
                                                }`}
                                        >
                                            {event.status}
                                        </h3>
                                        {event.completed && (
                                            <BiCheckCircle size={20} className="text-green-400" />
                                        )}
                                    </div>
                                    <p
                                        className={`text-sm mb-2 ${event.completed ? "text-slate-300" : "text-slate-500"
                                            }`}
                                    >
                                        {event.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span
                                            className={`flex items-center gap-1 ${event.completed ? "text-slate-400" : "text-slate-600"
                                                }`}
                                        >
                                            <BiMapPin size={14} />
                                            {event.location}
                                        </span>
                                        <span
                                            className={`flex items-center gap-1 ${event.completed ? "text-slate-400" : "text-slate-600"
                                                }`}
                                        >
                                            <BiTime size={14} />
                                            {event.date} - {event.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrackingTimeLine;