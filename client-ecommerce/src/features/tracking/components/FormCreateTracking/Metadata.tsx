import moment from "moment";

import type { TrackingDataResponse } from "../../types/tracking.types";
import type { ApiResponse } from "../../../products/types/product.types";

interface MetadataProps {
    metadata: ApiResponse<TrackingDataResponse> | undefined;
}

const Metadata: React.FC<MetadataProps> = ({ metadata }) => {
    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative">
            <h3 className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">[METADATOS_DEL_SISTEMA]</h3>

            <div className="space-y-4 text-xs font-mono tracking-wider">
                <div className="flex justify-between items-center bg-[#050505] border border-zinc-800 px-3 py-2">
                    <span className="text-zinc-500 uppercase">[CREADO_EL]</span>
                    <span className="text-zinc-300">{moment(metadata?.data?.createdAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className="flex justify-between items-center bg-[#050505] border border-zinc-800 px-3 py-2">
                    <span className="text-zinc-500 uppercase">[ÚLTIMA_MODIFICACIÓN]</span>
                    <span className="text-[#00f0ff]">{moment(metadata?.data?.updatedAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                    <span className="text-zinc-500 uppercase text-[10px]">[LINK_DEL_SISTEMA]</span>
                    <a href="#" className="text-[#e4ff00] hover:text-white flex items-center gap-1 transition-colors uppercase text-[10px] tracking-widest hover:underline">
                        [VER_REGISTROS_DE_API]
                        <span className="text-[10px]">↗</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Metadata;