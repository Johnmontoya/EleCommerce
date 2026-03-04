import React, { useState } from "react";
import { BiPackage } from "react-icons/bi";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ImageForm from "../../components/FormCreateProduct/ImageForm";
import VariantForm from "../../components/FormCreateProduct/VariantForm";
import AttributesForm from "../../components/FormCreateProduct/AttributesForm";
import DimensionForm from "../../components/FormCreateProduct/DimensionForm";
import TagsForm from "../../components/FormCreateProduct/TagsForm";
import ShippingForm from "../../components/FormCreateProduct/ShippingForm";
import DigitalForm from "../../components/FormCreateProduct/DigitalForm";
import StatisticsForm from "../../components/FormCreateProduct/StatisticsForm";
import PublishForm from "../../components/FormCreateProduct/PublishForm";
import PersonalForm from "../../components/FormCreateProduct/PersonalForm";
import PriceForm from "../../components/FormCreateProduct/PriceForm";
import { useAnalyzeTitleMutation, useCreateProductMutation } from "../../hook/mutation/useProductMutation";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import DashHeader from "../../../../shared/ui/DashHeader";
import HeaderAction from "../../../auth/components/UserCreate/HeaderAction";
import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, type ProductSchemaType } from "../../types/product.schema";

const DashCreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const createProduct = useCreateProductMutation();
  const analyzeTitle = useAnalyzeTitleMutation();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [allImageFiles, setAllImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
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

  const handleFileChange = (file: File | null) => {
    setCoverFile(file);
  };

  const onSubmit: SubmitHandler<ProductSchemaType> = async (data) => {
    if (!coverFile && allImageFiles.length === 0) {
      toast.error('Por favor selecciona al menos una imagen');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('slug', data.slug);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('priceDiscount', data.priceDiscount.toString());
      formData.append('stock', data.stock.toString());
      formData.append('sku', data.sku);
      formData.append('category', data.category);
      formData.append('rating', data.rating.toString());
      formData.append('reviewsCount', data.reviewsCount.toString());
      formData.append('soldCount', data.soldCount.toString());
      formData.append('isDigital', data.isDigital.toString());
      formData.append('isPublished', data.isPublished.toString());

      if (data.barcode) {
        formData.append('barcode', data.barcode);
      }
      if (data.brand) {
        formData.append('brand', data.brand);
      }
      if (data.digitalFile) {
        formData.append('digitalFile', data.digitalFile);
      }

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

      allImageFiles.forEach((file) => {
        formData.append('images', file);
      });

      await createProduct.mutateAsync(formData);

      toast.success('Producto creado exitosamente');
      navigate("/dashboard/products");
      handleReset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Error al crear el producto';
        toast.error(errorMessage);

        // Mostrar errores de validación específicos
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            console.error(`Campo ${field}:`, messages);
          });
        }
      } else {
        toast.error('Error inesperado al crear el producto');
      }
    }
  };

  const handleReset = () => {
    reset();
    setCoverFile(null);
    setCoverPreview(null);
    setAllImageFiles([]);
  };

  const handleAnalyzeTitle = async () => {
    const name = watch('name');

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

        // Manejar categoría (objeto o string)
        if (response.data.category) {
          const categoryId = typeof response.data.category === 'object'
            ? response.data.category.id
            : response.data.category;
          setValue('category', categoryId);
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
          ?.filter((attr: any) => attr.name && attr.value)
          .map((attr: any) => ({
            name: attr.name as string,
            value: attr.value as string,
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

  return (
    <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <div className="max-w-7xl px-0 md:px-9">
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
              title="Crear Nuevo Producto"
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

                  <ImageForm
                    coverPreview={coverPreview}
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

export default DashCreateProductPage;