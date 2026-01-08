import { AiFillStar } from "react-icons/ai";
import { BiSave, BiTag, BiX } from "react-icons/bi";
import ButtonAction from "../../../shared/ui/ButtonAction";
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
        color: string;
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
                productImage: selectedProduct?.images?.[0] || '',
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
        <div className="w-[520px] fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-slate-100">
                        {editingBanner ? "Editar Configuración" : "Nueva Configuración"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded-lg transition-all disabled:opacity-50"
                    >
                        <BiX size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    {/* Selección de Producto */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-3">
                            Producto <span className="text-red-400">*</span>
                        </label>
                        <select
                            name="productId"
                            value={formData.productId}
                            onChange={onChangeFormData}
                            disabled={!!editingBanner || isSubmitting}
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                        >
                            <option value="">Seleccionar producto</option>
                            {products?.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Secciones */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-3">
                            Secciones de Visualización <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sectionOptions.map((section) => (
                                <button
                                    key={section.value}
                                    type="button"
                                    onClick={() => handleToggleSection(section.value)}
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${(formData.displaySections as DisplaySection[]).includes(section.value)
                                        ? `${section.color} border-2`
                                        : "bg-slate-700/30 border-slate-600 text-slate-400 hover:border-slate-500"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${(formData.displaySections as DisplaySection[]).includes(section.value)
                                        ? "bg-current/20"
                                        : "bg-slate-600"
                                        }`}>
                                        {section.icon}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold">{section.label}</p>
                                        <p className="text-xs opacity-70">
                                            {section.value === "banner" && "Banner principal del sitio"}
                                            {section.value === "featured" && "Productos destacados"}
                                            {section.value === "trending" && "En tendencia"}
                                            {section.value === "promotional" && "Sección de promociones"}
                                            {section.value === "new-arrival" && "Nuevos ingresos"}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Configuración General */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Prioridad de Visualización
                            </label>
                            <input
                                type="number"
                                name="displayPriority"
                                value={formData.displayPriority}
                                onChange={onChangeFormData}
                                disabled={isSubmitting}
                                min="1"
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                placeholder="1"
                            />
                            <p className="text-xs text-slate-400 mt-1">1 = Primera posición</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Destacar hasta
                            </label>
                            <input
                                type="date"
                                name="featuredUntil"
                                value={formData.featuredUntil}
                                onChange={onChangeFormData}
                                disabled={isSubmitting}
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Destacado Toggle */}
                    <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            disabled={isSubmitting}
                            className="w-5 h-5 rounded border-2 border-yellow-500 bg-slate-700 checked:bg-yellow-500 disabled:opacity-50"
                        />
                        <div>
                            <p className="font-semibold text-yellow-400 flex items-center gap-2">
                                <AiFillStar size={18} />
                                Marcar como Producto Destacado
                            </p>
                            <p className="text-xs text-slate-300">
                                Aparecerá con un badge especial en todas las secciones
                            </p>
                        </div>
                    </div>

                    {/* Datos Promocionales */}
                    <div className="border-2 border-slate-700 rounded-xl p-4">
                        <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                            <BiTag size={20} className="text-cyan-400" />
                            Datos Promocionales (Opcional)
                        </h3>

                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Fecha de Inicio
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Fecha de Fin
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Descuento (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        min="0"
                                        max="100"
                                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                        placeholder="20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Texto del Badge
                                    </label>
                                    <input
                                        type="text"
                                        name="badgeText"
                                        value={formData.badgeText}
                                        onChange={onChangeFormData}
                                        disabled={isSubmitting}
                                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                        placeholder="50% OFF, NUEVO, etc."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    URL de Imagen para Banner
                                </label>
                                <input
                                    type="url"
                                    name="bannerImageUrl"
                                    value={formData.bannerImageUrl}
                                    onChange={onChangeFormData}
                                    disabled={isSubmitting}
                                    className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                    placeholder="https://ejemplo.com/banner.jpg"
                                />
                                <p className="text-xs text-slate-400 mt-1">
                                    Imagen específica para mostrar en el banner (recomendado 1200x400px)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex gap-4 z-10">
                    <ButtonAction
                        onClick={onClose}
                        variant="secondary"
                        className="flex-1"
                        text="Cancelar"
                        disabled={isSubmitting}
                    >
                        <BiX size={20} />
                    </ButtonAction>
                    <ButtonAction
                        onClick={handleSubmit}
                        variant="primary"
                        className="flex-1 flex items-center justify-center gap-2"
                        text={editingBanner ? "Actualizar" : "Guardar"}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <BiSave size={20} />
                        )}
                    </ButtonAction>
                </div>
            </div>
        </div>
    );
};

export default ModalShowcase;