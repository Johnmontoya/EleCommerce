import { MdOutlineFeaturedPlayList } from "react-icons/md";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { AiFillStar } from "react-icons/ai";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import type React from "react";
import type { Banner } from "../types/banner.types";
import SweetAlertas from "../../../shared/ui/SweetAlertas";
import { useDeleteBannerMutation } from "../hook/mutation/useBannerMutation";

type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

interface ProductConfigProps {
    configurations: Banner[] | null | undefined;
    sectionOptions: { value: DisplaySection; label: string; icon: React.ReactNode; color: string }[];
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

    const getSectionColor = (section: DisplaySection) => {
        return sectionOptions.find(opt => opt.value === section)?.color;
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
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6">
                Productos Configurados
            </h2>

            {!configurations || configurations.length === 0 ? (
                <div className="text-center py-12">
                    <MdOutlineFeaturedPlayList size={64} className="text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No hay productos configurados</p>
                    <ButtonAction
                        onClick={() => onEdit({} as Banner)}
                        variant="secondary"
                        className="mt-4"
                        text="Agregar el primero"
                    >
                        <BiPlus size={20} />
                    </ButtonAction>
                </div>
            ) : (
                <div className="space-y-4">
                    {configurations
                        .sort((a, b) => (a.displayPriority || 0) - (b.displayPriority || 0))
                        .map((config) => (
                            <div
                                key={config.id}
                                className="bg-slate-700/30 border-2 border-slate-600 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 bg-slate-600 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={config.promotionalData?.bannerImageUrl || config.productImage}
                                            alt={config.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-100 mb-1">
                                                    {config.productName}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-slate-400">
                                                        Prioridad: {config.displayPriority}
                                                    </span>
                                                    {config.isFeatured && (
                                                        <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                                                            <AiFillStar size={12} />
                                                            Destacado
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onEdit(config)}
                                                    className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all"
                                                >
                                                    <BiEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(config.id!)}
                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                                >
                                                    <BiTrash size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sections Badges */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {config.displaySections?.map((section) => (
                                                <span
                                                    key={section}
                                                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${getSectionColor(section)}`}
                                                >
                                                    {getSectionIcon(section)}
                                                    {sectionOptions.find(s => s.value === section)?.label}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Promotional Info */}
                                        {config.promotionalData && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                                {config.promotionalData.discount && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Descuento</p>
                                                        <p className="text-cyan-400 font-semibold">
                                                            {config.promotionalData.discount}%
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.badgeText && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Badge</p>
                                                        <p className="text-slate-100 font-semibold">
                                                            {config.promotionalData.badgeText}
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.startDate && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Inicio</p>
                                                        <p className="text-slate-100 font-semibold">
                                                            {new Date(config.promotionalData.startDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.endDate && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Fin</p>
                                                        <p className="text-slate-100 font-semibold">
                                                            {new Date(config.promotionalData.endDate).toLocaleDateString()}
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