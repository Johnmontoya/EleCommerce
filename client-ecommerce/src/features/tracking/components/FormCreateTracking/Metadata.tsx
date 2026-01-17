import moment from "moment";

interface MetadataProps {
    metadata: any;
}

const Metadata: React.FC<MetadataProps> = ({ metadata }) => {
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">METADATA</h3>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">Creado el</span>
                    <span className="text-white">{moment(metadata?.data?.createdAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Ultima modificacion</span>
                    <span className="text-white">{moment(metadata?.data?.updatedAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Enlace del sistema</span>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        Ver logs de la API
                        <span className="text-xs">↗</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Metadata;