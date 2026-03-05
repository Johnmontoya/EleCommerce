import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import type React from "react";
import type { Banner } from "../types/banner.types";
import SweetAlertas from "../../../shared/ui/SweetAlertas";
import { useDeleteBannerMutation } from "../hook/mutation/useBannerMutation";

type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

interface ProductConfigProps {
    configurations: Banner[] | null | undefined;
    sectionOptions: { value: DisplaySection; label: string; icon: React.ReactNode; color: string; borderCode: string }[];
    onEdit: (banner: Banner) => void;
}

const ProductConfig: React.FC<ProductConfigProps> = ({
    configurations,
    sectionOptions,
    onEdit
}) => {
    const deleteBannerMutation = useDeleteBannerMutation();

    const getSectionIcon = (section: DisplaySection) => {
        return sectionOptions.find(opt => opt.value === section)?.icon;
    };


    const Cancel = () => { };

    const ConfirmDeleteBlog = async (id: string) => {
        await deleteBannerMutation.mutateAsync(id);
    };

    const handleDelete = (id: string) => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar esta configuración`,
            onConfirm: () => ConfirmDeleteBlog(id),
            onCancel: Cancel,
        });
    };

    return (
        <div className="w-72 sm:w-full border border-zinc-800 bg-[#050505] font-mono p-6">
            <h2 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="text-[#00f0ff]">{'>'}</span> [CONFIGURACION_DE_PRODUCTOS]
            </h2>

            {!configurations || configurations.length === 0 ? (
                <div className="text-center py-16 border border-zinc-800 bg-black">
                    <MdOutlineFeaturedPlayList size={48} className="text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">NO_CONFIGURADO</p>
                    <button
                        onClick={() => onEdit({} as Banner)}
                        className="border border-[#00f0ff] text-[#00f0ff] px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#00f0ff] hover:text-black transition-colors"
                    >
                        [INICIALIZAR_PRIMER_ITEM]
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {configurations
                        .sort((a, b) => (a.displayPriority || 0) - (b.displayPriority || 0))
                        .map((config) => (
                            <div
                                key={config.id}
                                className="bg-black border border-zinc-800 p-4 hover:border-[#00f0ff] transition-all relative group"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500" />
                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 bg-[#050505] border border-zinc-800 overflow-hidden shrink-0 relative flex items-center justify-center p-2">
                                        <div className="absolute inset-0 bg-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        <img
                                            src={config.promotionalData?.bannerImageUrl || config.productImage}
                                            alt={config.productName}
                                            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100 mix-blend-screen"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4 border-b border-zinc-800 pb-3">
                                            <div>
                                                <h3 className="text-base font-black text-white uppercase tracking-wider mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                                    {config.productName}
                                                </h3>
                                                <div className="flex flex-col md:flex-row items-center gap-4">
                                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                                        <span className="text-zinc-700">|</span> <span className="text-[#00f0ff]">PRIORIDAD:</span> {config.displayPriority}
                                                    </span>
                                                    {config.isFeatured && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#e4ff00] border border-[#e4ff00]/30 px-2 py-0.5 bg-[#e4ff00]/5">
                                                            <AiFillStar size={10} />
                                                            DESTACADO
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onEdit(config)}
                                                    className="p-2 border border-zinc-800 text-zinc-500 hover:text-[#00f0ff] hover:border-[#00f0ff] bg-black transition-all"
                                                >
                                                    <BiEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(config.id!)}
                                                    className="p-2 border border-zinc-800 text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] bg-black transition-all"
                                                >
                                                    <BiTrash size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sections Badges */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {config.displaySections?.map((section) => {
                                                const sectionData = sectionOptions.find(s => s.value === section);
                                                return (
                                                    <span
                                                        key={section}
                                                        className={`flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2 py-1 border bg-black ${sectionData?.borderCode} ${sectionData?.color}`}
                                                    >
                                                        {getSectionIcon(section)}
                                                        {sectionData?.label}
                                                    </span>
                                                );
                                            })}
                                        </div>

                                        {/* Promotional Info */}
                                        {config.promotionalData && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-bold tracking-widest uppercase mt-4 pt-4 border-t border-zinc-800 border-dashed">
                                                {config.promotionalData.discount && (
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-zinc-500">[DESCUENTO]</p>
                                                        <p className="text-[#e4ff00]">
                                                            {config.promotionalData.discount}% OFF
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.badgeText && (
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-zinc-500">[ETIQUETA]</p>
                                                        <p className="text-white">
                                                            {config.promotionalData.badgeText}
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.startDate && (
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-zinc-500">[FECHA_INICIO]</p>
                                                        <p className="text-white">
                                                            {new Date(config.promotionalData.startDate).toISOString().slice(0, 10).replace(/-/g, '.')}
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.endDate && (
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-zinc-500">[FECHA_FIN]</p>
                                                        <p className="text-white">
                                                            {new Date(config.promotionalData.endDate).toISOString().slice(0, 10).replace(/-/g, '.')}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default ProductConfig;