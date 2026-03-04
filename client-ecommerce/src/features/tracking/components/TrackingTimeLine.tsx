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
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-1 bg-[#00f0ff] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#00f0ff] opacity-20"></div>

                <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-8 flex items-center gap-2 border-b border-zinc-800 pb-4">
                    <span className="text-[#00f0ff]">&gt;</span> [HISTORIAL_DE_TRANSITO]
                </h2>

                <div className="space-y-0">
                    {orderedEvents.map((event: any, index: number) => (
                        <div key={event.id} className="flex gap-6 relative group">
                            {/* Timeline Icon */}
                            <div className="flex flex-col items-center relative z-10 w-12 shrink-0">
                                <div
                                    className={`w-10 h-10 border border-zinc-800 flex items-center justify-center transition-all ${event.completed
                                        ? "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]"
                                        : "bg-[#0a0a0a] text-zinc-600"
                                        }`}
                                >
                                    {getStatusIcon(index)}
                                </div>
                                {index < trackingHistory.data.events.length - 1 && (
                                    <div
                                        className={`w-[1px] h-full absolute top-10 ${event.completed ? "bg-[#00f0ff]/50" : "bg-zinc-800 border-dashed border-l border-zinc-700 bg-transparent"
                                            }`}
                                    ></div>
                                )}
                            </div>
                            {/* Event Details */}
                            <div className="flex-1 pb-10">
                                <div className={`border border-zinc-800 bg-[#0a0a0a] p-4 group-hover:bg-[#00f0ff]/5 transition-colors relative ${event.completed ? "border-l-2 border-l-[#00f0ff]" : "border-l-2 border-l-zinc-700"}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3
                                            className={`font-mono text-sm tracking-widest uppercase ${event.completed ? "text-zinc-100" : "text-zinc-500"
                                                }`}
                                        >
                                            [{event.status}]
                                        </h3>
                                        {event.completed && (
                                            <span className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase animate-pulse border border-[#00f0ff]/30 px-2 py-0.5">
                                                [VERIFICADO]
                                            </span>
                                        )}
                                    </div>
                                    <p
                                        className={`text-xs mb-3 font-mono tracking-wide ${event.completed ? "text-zinc-400" : "text-zinc-600"
                                            }`}
                                    >
                                        &gt; {event.description}
                                    </p>
                                    <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest uppercase">
                                        <span
                                            className={`flex items-center gap-2 ${event.completed ? "text-zinc-300" : "text-zinc-600"
                                                }`}
                                        >
                                            <BiMapPin size={12} className={event.completed ? "text-[#e4ff00]" : "text-zinc-600"} />
                                            LOC: {event.location}
                                        </span>
                                        <span
                                            className={`flex items-center gap-2 ${event.completed ? "text-zinc-300" : "text-zinc-600"
                                                }`}
                                        >
                                            <BiTime size={12} className={event.completed ? "text-[#e4ff00]" : "text-zinc-600"} />
                                            T: {event.date} | {event.time}
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