import { BiLoader, BiPlus } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";

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
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-blue-600`}>
                        <BiLoader className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <h2 className="block text-slate-300 font-semibold">Nuevo Evento de Seguimiento</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Estado actual del paquete *</label>
                    <select
                        value={currentEvent.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    >
                        <option value="CONFIRMED">CONFIRMADO</option>
                        <option value="PROCESSING">EN PROCESO</option>
                        <option value="SHIPPED">ENVIADO</option>
                        <option value="DELIVERED">ENTREGADO</option>
                        <option value="CANCELLED">CANCELADO</option>
                        <option value="REFUNDED">DEVUELTO</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Ubicación actual del paquete *</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={currentEvent.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="Ej: Bogotá, Colombia"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Fecha del Evento</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={currentEvent.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Hora del Evento</label>
                    <div className="relative">
                        <input
                            type="time"
                            value={currentEvent.time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Descripción del Estado / Notas *</label>
                <textarea
                    value={currentEvent.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-3 py-4 rounded-lg focus:outline-none focus:border-blue-500 min-h-[100px] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Describe el estado actual del envío..."
                />
            </div>

            <div className="flex items-center gap-2 mb-4">
                <input
                    type="checkbox"
                    id="completed"
                    checked={currentEvent.completed}
                    onChange={(e) => handleChange('completed', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="completed" className="text-sm text-gray-400">
                    Marcar como completado
                </label>
            </div>

            <div className="w-full flex justify-end gap-3">
                <ButtonAction
                    onClick={handleSaveEvent}
                    disabled={!isFormValid}
                    variant="primary"
                    text="Guardar Evento"
                >
                    <BiPlus className="w-4 h-4" />
                </ButtonAction>
                <ButtonAction
                    onClick={() => setShowHistory(!showHistory)}
                    variant="secondary"
                    text={showHistory ? 'Ocultar' : 'Ver'}
                >
                    {showHistory ? 'Ocultar' : 'Ver'} Historial ({trackingHistory?.data?.events?.length || 0})
                </ButtonAction>
            </div>
        </div>
    );
};

export default TrackingEventForm;