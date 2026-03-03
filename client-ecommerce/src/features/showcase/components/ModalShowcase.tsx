import { AiFillStar } from "react-icons/ai";
import { BiSave, BiTag, BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import type { Banner } from "../types/banner.types";
import { useProducts } from "../../products/hook/queries/useProduct";
import { useAddBannerMutation } from "../hook/mutation/useBannerMutation";
import useInputs from "../../../shared/hooks/useInputs";
import moment from "moment";

interface ModalShowcaseProps {
    sectionOptions: {
        value: DisplaySection;
        label: string;
        icon: React.ReactNode;
        borderCode?: string;
    }[];
    onClose: () => void;
    editingBanner?: Banner | null;
}

type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

const ModalShowcase: React.FC<ModalShowcaseProps> = ({
    sectionOptions,
    onClose,
    editingBanner
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: products } = useProducts();
    const addBannerMutation = useAddBannerMutation();
    const updateBannerMutation = useAddBannerMutation();

    const [formData, onChangeFormData, setFormData] = useInputs({
        id: '',
        productId: '',
        productName: '',
        productImage: '',
        displaySections: [] as DisplaySection[],
        displayPriority: 1,
        isFeatured: false,
        featuredUntil: '',
        startDate: '',
        endDate: '',
        discount: 0,
        badgeText: '',
        bannerImageUrl: '',
    });

    // Cargar datos al editar
    useEffect(() => {
        if (editingBanner) {
            setFormData({
                id: editingBanner.id || '',
                productId: editingBanner.productId || '',
                productName: editingBanner.productName || '',
                productImage: editingBanner.productImage || '',
                displaySections: editingBanner.displaySections || [],
                displayPriority: editingBanner.displayPriority || 1,
                isFeatured: editingBanner.isFeatured || false,
                featuredUntil: moment(editingBanner.featuredUntil || '').format('YYYY-MM-DD') || '',
                startDate: moment(editingBanner.promotionalData?.startDate || '').format('YYYY-MM-DD') || '',
                endDate: moment(editingBanner.promotionalData?.endDate || '').format('YYYY-MM-DD') || '',
                discount: editingBanner.promotionalData?.discount || 0,
                badgeText: editingBanner.promotionalData?.badgeText || '',
                bannerImageUrl: editingBanner.promotionalData?.bannerImageUrl || '',
            });
        }
    }, [editingBanner]);

    const handleSubmit = async () => {

        if (formData.displaySections.length === 0) {
            alert('Por favor selecciona al menos una sección');
            return;
        }

        setIsSubmitting(true);

        try {
            const selectedProduct = products?.find((product) => product.id === formData.productId);

            const promotionalData = (formData.startDate || formData.endDate || formData.discount || formData.badgeText || formData.bannerImageUrl)
                ? {
                    startDate: formData.startDate || undefined,
                    endDate: formData.endDate || undefined,
                    discount: formData.discount || undefined,
                    badgeText: formData.badgeText || undefined,
                    bannerImageUrl: formData.bannerImageUrl || undefined,
                }
                : undefined;

            const bannerData: Banner = {
                id: selectedProduct?.id || undefined,
                productId: selectedProduct?.id || '',
                productName: selectedProduct?.name || '',
                productImage: selectedProduct?.images?.[0].url || '',
                displaySections: formData.displaySections,
                displayPriority: Number(formData.displayPriority) || 1,
                isFeatured: formData.isFeatured,
                featuredUntil: formData.featuredUntil || undefined,
                promotionalData,
            };

            if (editingBanner?.id) {
                // Actualizar
                await updateBannerMutation.mutateAsync({
                    id: editingBanner.id,
                    banner: bannerData
                });
            } else {
                // Crear nuevo
                await addBannerMutation.mutateAsync({
                    id: selectedProduct?.id!,
                    banner: bannerData
                });
            }

            onClose();
        } catch (error) {
            console.error('Error al guardar el banner:', error);
            alert('Error al guardar. Por favor intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleSection = (section: DisplaySection) => {
        const current = formData.displaySections as DisplaySection[];
        if (current.includes(section)) {
            setFormData({
                ...formData,
                displaySections: current.filter(s => s !== section),
            });
        } else {
            setFormData({
                ...formData,
                displaySections: [...current, section],
            });
        }
    };

    return (
        <div className="w-[520px] fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono">
            <div className="bg-[#050505] border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* Decorative border corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00f0ff]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00f0ff]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#e4ff00]" />

                {/* Modal Header */}
                <div className="sticky top-0 bg-[#050505] border-b border-zinc-800 p-6 flex items-center justify-between z-10">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <span className="text-[#00f0ff]">{'>'}</span> {editingBanner ? "[EDIT_CONFIG]" : "[NEW_CONFIG]"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="p-2 text-zinc-500 hover:text-[#ff0055] transition-colors disabled:opacity-50"
                    >
                        <BiX size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-8">
                    {/* Selección de Producto */}
                    <div>
                        <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2 mt-4">
                            [PRODUCT_ID] <span className="text-[#ff0055]">*</span>
                        </label>
                        <select
                            name="productId"
                            value={formData.productId}
                            onChange={onChangeFormData}
                            disabled={!!editingBanner || isSubmitting}
                            className="w-full bg-black border border-zinc-800 text-white uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors disabled:opacity-50 appearance-none"
                        >
                            <option value="">[AWAITING_SELECTION]</option>
                            {products?.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Secciones */}
                    <div>
                        <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-4 mt-6">
                            [DISPLAY_ZONES] <span className="text-[#ff0055]">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sectionOptions.map((section) => (
                                <button
                                    key={section.value}
                                    type="button"
                                    onClick={() => handleToggleSection(section.value)}
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-4 p-4 border transition-all disabled:opacity-50 relative group ${(formData.displaySections as DisplaySection[]).includes(section.value)
                                        ? `${section.borderCode?.split(' ')[0] || 'border-[#00f0ff]'} bg-[#050505]`
                                        : "bg-black border-zinc-800 text-zinc-500 hover:border-zinc-500"
                                        }`}
                                >
                                    <div className={`w-10 h-10 flex items-center justify-center border ${(formData.displaySections as DisplaySection[]).includes(section.value)
                                        ? `${section.borderCode?.split(' ')[0] || 'border-[#00f0ff]'} text-[#00f0ff]`
                                        : "border-zinc-800 text-zinc-500 group-hover:text-zinc-400"
                                        }`}>
                                        {section.icon}
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${(formData.displaySections as DisplaySection[]).includes(section.value) ? "text-[#00f0ff]" : "text-zinc-500"
                                            }`}>{section.label}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                                            {section.value === "banner" && "MAIN_SITE_BANNER"}
                                            {section.value === "featured" && "FEATURED_HIGHLIGHTS"}
                                            {section.value === "trending" && "CURRENT_TRENDS"}
                                            {section.value === "promotional" && "PROMO_CAMPAIGN"}
                                            {section.value === "new-arrival" && "LATEST_INVENTORY"}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Configuración General */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6 border-t border-zinc-800 pt-6 border-dashed">
                        <div>
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                [DISPLAY_PRIORITY]
                            </label>
                            <input
                                type="number"
                                name="displayPriority"
                                value={formData.displayPriority}
                                onChange={onChangeFormData}
                                disabled={isSubmitting}
                                min="1"
                                className="w-full bg-black border border-zinc-800 text-white uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors disabled:opacity-50"
                                placeholder="1"
                            />
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">1 = PRIME_POSITION</p>
                        </div>

                        <div>
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                [FEAT_DURATION]
                            </label>
                            <input
                                type="date"
                                name="featuredUntil"
                                value={formData.featuredUntil}
                                onChange={onChangeFormData}
                                disabled={isSubmitting}
                                className="w-full bg-black border border-zinc-800 text-zinc-500 uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:text-[#00f0ff] transition-colors disabled:opacity-50 custom-date-input"
                            />
                        </div>
                    </div>

                    {/* Destacado Toggle */}
                    <div className="flex items-center gap-4 p-4 bg-[#e4ff00]/5 border border-[#e4ff00]/30 mt-6 relative group cursor-pointer" onClick={() => !isSubmitting && setFormData({ ...formData, isFeatured: !formData.isFeatured })}>
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e4ff00] opacity-50 shadow-[0_0_10px_#e4ff00]" />
                        <div className={`w-5 h-5 flex items-center justify-center border ${formData.isFeatured ? 'bg-[#e4ff00] border-[#e4ff00]' : 'border-zinc-500'} transition-colors`}>
                            {formData.isFeatured && <AiFillStar size={14} className="text-black" />}
                        </div>
                        <div>
                            <p className="font-bold text-[#e4ff00] flex items-center gap-2 text-xs uppercase tracking-widest mb-1">
                                [MARK_AS_FEATURED]
                            </p>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                                DISPLAYS_SPECIAL_BADGE_GLOBALLY
                            </p>
                        </div>
                    </div>

                    {/* Datos Promocionales */}
                    <div className="border border-zinc-800 bg-[#020202] p-6 relative mt-8">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <BiTag size={16} className="text-[#00f0ff]" />
                            [PROMOTIONAL_DATA] // OPTIONAL
                        </h3>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                        [T-START_CAMPAIGN]
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        className="w-full bg-black border border-zinc-800 text-zinc-500 uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:text-[#00f0ff] transition-colors disabled:opacity-50 custom-date-input"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                        [T-END_CAMPAIGN]
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        className="w-full bg-black border border-zinc-800 text-zinc-500 uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:text-[#00f0ff] transition-colors disabled:opacity-50 custom-date-input"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                        [DISCOUNT_RATE_PCT]
                                    </label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        min="0"
                                        max="100"
                                        className="w-full bg-black border border-zinc-800 text-white uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#e4ff00] transition-colors disabled:opacity-50"
                                        placeholder="20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                        [BADGE_STRING]
                                    </label>
                                    <input
                                        type="text"
                                        name="badgeText"
                                        value={formData.badgeText}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        className="w-full bg-black border border-zinc-800 text-white uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors disabled:opacity-50"
                                        placeholder="[50%_OFF]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                                    [BANNER_IMG_URL]
                                </label>
                                <input
                                    type="url"
                                    name="bannerImageUrl"
                                    value={formData.bannerImageUrl}
                                    onChange={onChangeFormData}
                                    disabled={isSubmitting}
                                    className="w-full bg-black border border-zinc-800 text-white tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors disabled:opacity-50"
                                    placeholder="https://..."
                                />
                                <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">
                                    OPTIMAL_RES: 1200x400PX
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-[#050505] border-t border-zinc-800 p-6 flex gap-4 z-10">
                    <button
                        onClick={onClose}
                        type="button"
                        disabled={isSubmitting}
                        className="flex-1 bg-black border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white h-12 font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                    >
                        <BiX size={18} />
                        [CANCEL]
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#050505] border border-[#00f0ff] hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black h-12 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                            <>
                                <BiSave size={16} />
                                {editingBanner ? "[UPDATE_DATA]" : "[SAVE_CONFIG]"}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalShowcase;