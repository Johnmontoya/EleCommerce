import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAnalyzeTitleMutation, useUpdateProductMutation } from "../../hook/mutation/useProductMutation";
import PersonalForm from "../../components/FormCreateProduct/PersonalForm";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import { BiPackage } from "react-icons/bi";
import { useProduct } from "../../hook/queries/useProduct";
import { AxiosError } from "axios";
import PriceForm from "../../components/FormCreateProduct/PriceForm";
import ImageForm from "../../components/FormCreateProduct/ImageForm";
import VariantForm from "../../components/FormCreateProduct/VariantForm";
import AttributesForm from "../../components/FormCreateProduct/AttributesForm";
import DimensionForm from "../../components/FormCreateProduct/DimensionForm";
import TagsForm from "../../components/FormCreateProduct/TagsForm";
import DigitalForm from "../../components/FormCreateProduct/DigitalForm";
import ShippingForm from "../../components/FormCreateProduct/ShippingForm";
import StatisticsForm from "../../components/FormCreateProduct/StatisticsForm";
import type { Attribute } from "../../types/product.types";
import PublishForm from "../../components/FormCreateProduct/PublishForm";
import DashHeader from "../../../../shared/ui/DashHeader";
import HeaderAction from "../../../auth/components/UserCreate/HeaderAction";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, type ProductSchemaType } from "../../types/product.schema";
import { toast } from "sonner";


const DashEditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const analyzeTitle = useAnalyzeTitleMutation();

    // Estado para imágenes
    const [, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [allImageFiles, setAllImageFiles] = useState<File[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

    const updateProduct = useUpdateProductMutation();
    const { data: product, isLoading } = useProduct(id!);

    // Derivar imágenes existentes (no marcadas para borrar)
    const currentExistingImages = useMemo(() => {
        return (product?.images || []).filter(img => !imagesToDelete.includes(img.fileId));
    }, [product, imagesToDelete]);

    // Derivar el preview de la portada si no hay uno seleccionado explícitamente
    const activeCoverPreview = coverPreview || (currentExistingImages.length > 0 ? currentExistingImages[0].url : null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
        getValues,
    } = useForm<ProductSchemaType>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            price: 0,
            priceDiscount: 0,
            stock: 0,
            sku: "",
            barcode: "",
            brand: "",
            category: "",
            images: [],
            tags: [],
            rating: 0,
            reviewsCount: 0,
            variants: [],
            attributes: [],
            dimensions: {
                weight: 0,
                width: 0,
                height: 0,
                depth: 0,
            },
            shipping: {
                free: false,
                cost: 0,
            },
            isDigital: false,
            digitalFile: "",
            relatedProducts: [],
            soldCount: 0,
            isPublished: false
        },
        mode: 'onChange',
    });

    // Cargar datos del producto
    useEffect(() => {
        if (product) {
            console.log("=== CARGANDO PRODUCTO ===", product);

            setValue("name", product.name);
            setValue("slug", product.slug);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("priceDiscount", product.priceDiscount || 0);
            setValue("stock", product.stock);
            setValue("sku", product.sku || "");
            setValue("barcode", product.barcode || "");
            setValue("brand", product.brand || "");
            setValue("category", typeof product.category === 'object' ? product.category.id ?? '' : product.category);
            setValue("tags", product.tags || []);
            setValue("rating", product.rating || 0);
            setValue("reviewsCount", product.reviewsCount || 0);
            setValue("variants", product.variants || []);
            setValue("attributes", product.attributes || []);
            setValue("dimensions", product.dimensions || { weight: 0, width: 0, height: 0, depth: 0 });
            setValue("shipping", product.shipping || { free: false, cost: 0 });
            setValue("isDigital", product.isDigital || false);
            setValue("digitalFile", product.digitalFile || "");
            setValue("relatedProducts", product.relatedProducts || []);
            setValue("soldCount", product.soldCount || 0);
            setValue("isPublished", product.isPublished || false);
        }
    }, [product, setValue]);

    const handleFileChange = (file: File | null) => {
        setCoverFile(file);
    };

    // Eliminar una imagen existente
    const handleDeleteExistingImage = (fileId: string) => {
        console.log("Marcando imagen para eliminar:", fileId);
        setImagesToDelete(prev => [...prev, fileId]);

        // Si era el preview personalizado, lo limpiamos para que regrese al default
        const deletedImage = product?.images?.find(img => img.fileId === fileId);
        if (deletedImage && deletedImage.url === coverPreview) {
            setCoverPreview(null);
        }
    };

    const onSubmit: SubmitHandler<ProductSchemaType> = async (data) => {
        // Validar que tenga al menos una imagen (existente o nueva)
        const totalImages = currentExistingImages.length + allImageFiles.length;
        if (totalImages === 0) {
            toast.error('El producto debe tener al menos una imagen');
            return;
        }

        try {
            console.log("=== ACTUALIZANDO PRODUCTO ===");
            console.log("Imágenes existentes:", currentExistingImages.length);
            console.log("Nuevas imágenes:", allImageFiles.length);
            console.log("Imágenes a eliminar:", imagesToDelete.length);

            const formData = new FormData();

            // ============================================
            // CAMPOS BÁSICOS
            // ============================================
            formData.append('name', data.name!);
            formData.append('slug', data.slug!);
            formData.append('description', data.description!);
            formData.append('price', data.price!.toString());
            formData.append('priceDiscount', data.priceDiscount!.toString());
            formData.append('stock', data.stock!.toString());
            formData.append('sku', data.sku!);
            formData.append('category', data.category!);
            formData.append('rating', data.rating!.toString());
            formData.append('reviewsCount', data.reviewsCount!.toString());
            formData.append('soldCount', data.soldCount!.toString());
            formData.append('isDigital', data.isDigital!.toString());
            formData.append('isPublished', data.isPublished!.toString());

            // ============================================
            // CAMPOS OPCIONALES
            // ============================================
            if (data.barcode) {
                formData.append('barcode', data.barcode);
            }
            if (data.brand) {
                formData.append('brand', data.brand);
            }
            if (data.digitalFile) {
                formData.append('digitalFile', data.digitalFile);
            }

            // ============================================
            // OBJETOS Y ARRAYS
            // ============================================
            if (data.variants && data.variants.length > 0) {
                formData.append('variants', JSON.stringify(data.variants));
            }

            if (data.attributes && data.attributes.length > 0) {
                formData.append('attributes', JSON.stringify(data.attributes));
            }

            if (data.tags && data.tags.length > 0) {
                formData.append('tags', JSON.stringify(data.tags));
            }

            if (data.relatedProducts && data.relatedProducts.length > 0) {
                formData.append('relatedProducts', JSON.stringify(data.relatedProducts));
            }

            formData.append('dimensions', JSON.stringify(data.dimensions));
            formData.append('shipping', JSON.stringify(data.shipping));

            // ============================================
            // IMÁGENES A ELIMINAR
            // ============================================
            if (imagesToDelete.length > 0) {
                formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
                console.log("Enviando imagesToDelete:", imagesToDelete);
            }

            // ============================================
            // NUEVAS IMÁGENES
            // ============================================
            allImageFiles.forEach((file, index) => {
                formData.append('images', file);
                console.log(`Nueva imagen ${index + 1}: ${file.name}`);
            });

            // Debug: ver contenido del FormData
            console.log("=== FORMDATA CONTENTS ===");
            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}:`, `File(${value.name})`);
                } else {
                    console.log(`${key}:`, value);
                }
            }

            await updateProduct.mutateAsync({ id: id!, data: formData });

            toast.success('Producto actualizado exitosamente');
            navigate('/dashboard/products');
        } catch (error) {
            console.error("=== ERROR AL ACTUALIZAR ===", error);

            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'Error al actualizar el producto';
                toast.error(errorMessage);

                if (error.response?.data?.errors) {
                    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                        console.error(`Campo ${field}:`, messages);
                        toast.error(`${field}: ${messages}`);
                    });
                }
            } else {
                toast.error('Error inesperado al actualizar el producto');
            }
        }
    };

    const handleReset = () => {
        if (product) {
            // Restaurar datos originales del producto
            reset();
            setImagesToDelete([]);
            setAllImageFiles([]);
            setCoverPreview(null);
        }
    };

    const handleAnalyzeTitle = async () => {
        const name = getValues('name');

        if (!name || name.trim().length === 0) {
            toast.error('Por favor ingresa un nombre de producto primero');
            return;
        }

        try {
            const response = await analyzeTitle.mutateAsync(name);

            if (response.success && response.data) {
                setValue('name', response.data.name || name);
                setValue('slug', response.data.slug);
                setValue('description', response.data.description);
                setValue('price', response.data.price ?? 0);
                setValue('priceDiscount', response.data.priceDiscount ?? 0);
                setValue('stock', response.data.stock ?? 0);
                setValue('brand', response.data.brand ?? '');

                if (response.data.category) {
                    const categoryId = typeof response.data.category === 'object'
                        ? response.data.category.id
                        : response.data.category;
                    setValue('category', categoryId ?? '');
                }

                setValue('tags', response.data.tags ?? []);
                setValue('dimensions', response.data.dimensions ?? { weight: 0, width: 0, height: 0, depth: 0 });
                setValue('shipping', response.data.shipping ?? { free: false, cost: 0 });
                setValue('reviewsCount', response.data.reviewsCount ?? 0);
                setValue('rating', response.data.rating ?? 0);
                setValue('sku', response.data.sku ?? '');
                setValue('barcode', response.data.barcode ?? '');
                setValue('variants', response.data.variants ?? []);

                const validAttributes = response.data.attributes
                    ?.filter((attr: Attribute) => attr.name && attr.value)
                    .map((attr: Attribute) => ({
                        name: attr.name,
                        value: attr.value,
                    })) ?? [];
                setValue('attributes', validAttributes);

                setValue('soldCount', response.data.soldCount ?? 0);
                setValue('isPublished', response.data.isPublished ?? false);

                toast.success('Título analizado con éxito');
            }
        } catch (error) {
            console.error('Error analyzing title:', error);
            toast.error('Error al analizar el título');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono">
                <div className="text-center">
                    <div className="animate-spin rounded-none h-12 w-12 border-2 border-t-[#00f0ff] border-r-transparent border-b-[#ff0055] border-l-transparent mx-auto"></div>
                    <p className="mt-4 text-[#00f0ff] tracking-widest text-xs uppercase">[SYS_LOADING_PRODUCT_DATA...]</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono">
                <div className="text-center border border-[#ff0055] border-dashed p-12 relative bg-[#050505]">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]" />
                    <BiPackage className="mx-auto text-[#ff0055] opacity-50 mb-4" size={64} />
                    <p className="text-[#ff0055] tracking-widest text-xs uppercase font-bold">[ERR:_PRODUCTO_NO_ENCONTRADO]</p>
                    <button
                        onClick={() => navigate('/dashboard/products')}
                        className="mt-8 px-6 py-2 bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055] hover:bg-[#ff0055] hover:text-white transition-all text-[10px] tracking-widest uppercase font-bold"
                    >
                        [REGRESAR]
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
            <div className="flex">
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="hidden sm:flex max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        <DashHeader
                            data={[]}
                            title="Editar Producto"
                            titleData="Productos"
                            path="products"
                            titleIcon={<BiPackage className="text-cyan-400" size={36} />}
                            list={false}
                        />

                        <HeaderAction
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit(onSubmit)}
                            handleReset={handleReset}
                        />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <PersonalForm
                                        register={register}
                                        errors={errors}
                                        watch={watch}
                                        handleAnalyzeTitle={handleAnalyzeTitle}
                                        isSubmitting={isSubmitting || analyzeTitle.isPending}
                                    />

                                    <PriceForm
                                        register={register}
                                        errors={errors}
                                        watch={watch}
                                    />

                                    {/* Imágenes Existentes */}
                                    {currentExistingImages.length > 0 && (
                                        <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 border-dashed p-6 relative">
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                                            <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
                                                [IMAGENES]
                                            </h2>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {currentExistingImages.map((image, index) => (
                                                    <div
                                                        key={image.fileId}
                                                        className="relative group bg-black overflow-hidden border border-zinc-700 hover:border-[#ff0055] transition-colors"
                                                    >
                                                        {image.url === activeCoverPreview && (
                                                            <div className="absolute top-0 left-0 z-10 bg-[#e4ff00] text-black px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                                                                [PRINCIPAL]
                                                            </div>
                                                        )}
                                                        <img
                                                            src={image.url}
                                                            alt={`Imagen ${index + 1}`}
                                                            className="w-full h-32 object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                                                        />
                                                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteExistingImage(image.fileId)}
                                                                className="bg-transparent border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all"
                                                            >
                                                                [ELIMINAR]
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-6">
                                                [{currentExistingImages.length}_IMAGENES_ENCONTRADAS]
                                            </p>
                                        </div>
                                    )}

                                    {/* Nuevas Imágenes */}
                                    <ImageForm
                                        coverPreview={activeCoverPreview}
                                        setCoverPreview={setCoverPreview}
                                        onFileChange={handleFileChange}
                                        allImageFiles={allImageFiles}
                                        setAllImageFiles={setAllImageFiles}
                                        error={errors.images?.message}
                                    />

                                    <VariantForm
                                        watch={watch}
                                        setValue={setValue}
                                        errors={errors}
                                    />

                                    <AttributesForm
                                        watch={watch}
                                        setValue={setValue}
                                        errors={errors}
                                    />

                                    <DimensionForm
                                        register={register}
                                        errors={errors}
                                    />
                                </div>

                                <div className="lg:col-span-1 space-y-6">
                                    <TagsForm
                                        watch={watch}
                                        setValue={setValue}
                                        errors={errors}
                                    />

                                    <ShippingForm
                                        register={register}
                                        watch={watch}
                                        setValue={setValue}
                                        errors={errors}
                                    />

                                    <DigitalForm
                                        register={register}
                                        watch={watch}
                                        errors={errors}
                                    />

                                    <StatisticsForm
                                        register={register}
                                        errors={errors}
                                    />

                                    <PublishForm
                                        register={register}
                                        watch={watch}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashEditProductPage;