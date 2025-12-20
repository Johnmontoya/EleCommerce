import React, { useState } from "react";
import { BiPackage, BiSave } from "react-icons/bi";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import useInputs from "../../../../shared/hooks/useInputs";
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
import { CiEraser } from "react-icons/ci";
import { useCreateProductMutation } from "../../hook/mutation/useProductMutation";
import { AxiosError } from "axios";

interface ValidationErrors {
  [key: string]: string[];
}

const DashCreateProductPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const createProduct = useCreateProductMutation();

  const [createData, onChangeCreateData, setCreateData] = useInputs({
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
    isPublished: false,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    setValidationErrors({});

    try {
      await createProduct.mutateAsync(createData);
      setCreateData({
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
        isPublished: false,
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
    }
  };

  const getFieldsError = (fieldName: string): string | undefined => {
    return validationErrors[fieldName]?.[0];
  }

  const handleReset = () => {
    setCreateData({
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
      isPublished: false,
    });
    setValidationErrors({});
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex flex-col flex-1">
          {/* Breadcrumb */}
          <div className="max-w-7xl px-0 md:px-9">
            <BreadCrumbs />
          </div>

          {/* Mobile Menu */}
          <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          <div className="w-full mx-auto flex-1 px-12 pb-8">
            <ButtonMobile
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                  <BiPackage className="text-cyan-400" size={36} />
                  Crear Nuevo Producto
                </h1>
                <p className="text-slate-400">
                  Completa la información del producto
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-3">
                <ButtonAction
                  onClick={handleReset}
                  text={"Resetear"}
                  variant="secondary"
                >
                  <CiEraser size={18} />
                </ButtonAction>
                <ButtonAction
                  onClick={handleSubmit}
                  text={"Guardar"}
                  variant="primary"
                >
                  <BiSave size={18} />
                </ButtonAction>
              </div>
            </div>

            <form>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <PersonalForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                    getFieldsError={getFieldsError}
                  />

                  {/* Pricing & Inventory */}
                  <PriceForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                    getFieldsError={getFieldsError}
                  />

                  {/* Images */}
                  <ImageForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                    getFieldsError={getFieldsError}
                  />

                  {/* Variants */}
                  <VariantForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                  />

                  {/* Attributes */}
                  <AttributesForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                  />

                  {/* Dimensions */}
                  <DimensionForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                  />
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Tags */}
                  <TagsForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                    getFieldsError={getFieldsError}
                  />

                  {/* Shipping */}
                  <ShippingForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                  />

                  {/* Digital Product */}
                  <DigitalForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                  />

                  {/* Statistics */}
                  <StatisticsForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
                  />

                  {/* Publish Status */}
                  <PublishForm
                    product={createData}
                    onChangeCreateData={onChangeCreateData}
                    setCreateData={setCreateData}
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
