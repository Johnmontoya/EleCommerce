import React, { useState } from "react";
import { BiBarChart, BiPackage, BiPlus, BiSave, BiTag, BiUpload, BiX } from "react-icons/bi";
import { BsEye, BsImage, BsTrash2, BsTruck } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import Sidebar from "../../dashboard/components/Sidebar";
import NavMobile from "../../dashboard/components/NavMobile";
import ButtonMobile from "../../../shared/ui/ButtonMobile";
import ButtonAction from "../../../shared/ui/ButtonAction";
import BreadCrumbs from "../../../shared/ui/BreadCrumbs";

interface Variant {
  name: string;
  options: string[];
}

interface Attribute {
  name: string;
  value: string;
}

interface Dimensions {
  weight: number;
  width: number;
  height: number;
  depth: number;
}

interface Shipping {
  free: boolean;
  cost: number;
}

interface Product {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceDiscount: number;
  stock: number;
  sku: string;
  barcode: string;
  brand: string;
  category: string;
  images: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  variants: Variant[];
  attributes: Attribute[];
  dimensions: Dimensions;
  shipping: Shipping;
  isDigital: boolean;
  digitalFile: string;
  relatedProducts: string[];
  soldCount: number;
  isPublished: boolean;
}

const CreateProductPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [product, setProduct] = useState<Product>({
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

  const [newTag, setNewTag] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [newVariantName, setNewVariantName] = useState<string>("");
  const [newVariantOption, setNewVariantOption] = useState<string>("");
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct({ ...product, [name]: checked });
    } else if (type === "number") {
      setProduct({ ...product, [name]: parseFloat(value) || 0 });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleDimensionChange = (field: keyof Dimensions, value: string) => {
    setProduct({
      ...product,
      dimensions: {
        ...product.dimensions,
        [field]: parseFloat(value) || 0,
      },
    });
  };

  const handleShippingChange = (field: keyof Shipping, value: string | boolean) => {
    setProduct({
      ...product,
      shipping: {
        ...product.shipping,
        [field]: field === "free" ? value : parseFloat(value as string) || 0,
      },
    });
  };

  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setProduct({ ...product, tags: [...product.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setProduct({
      ...product,
      tags: product.tags.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (newImage.trim() && !product.images.includes(newImage.trim())) {
      setProduct({ ...product, images: [...product.images, newImage.trim()] });
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setProduct({
      ...product,
      images: product.images.filter((_, i) => i !== index),
    });
  };

  const addVariant = () => {
    if (newVariantName.trim()) {
      setProduct({
        ...product,
        variants: [...product.variants, { name: newVariantName.trim(), options: [] }],
      });
      setNewVariantName("");
    }
  };

  const addVariantOption = (variantIndex: number) => {
    if (newVariantOption.trim()) {
      const updatedVariants = [...product.variants];
      updatedVariants[variantIndex].options.push(newVariantOption.trim());
      setProduct({ ...product, variants: updatedVariants });
      setNewVariantOption("");
    }
  };

  const removeVariant = (index: number) => {
    setProduct({
      ...product,
      variants: product.variants.filter((_, i) => i !== index),
    });
  };

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...product.variants];
    updatedVariants[variantIndex].options = updatedVariants[
      variantIndex
    ].options.filter((_, i) => i !== optionIndex);
    setProduct({ ...product, variants: updatedVariants });
  };

  const addAttribute = () => {
    if (newAttributeName.trim() && newAttributeValue.trim()) {
      setProduct({
        ...product,
        attributes: [
          ...product.attributes,
          { name: newAttributeName.trim(), value: newAttributeValue.trim() },
        ],
      });
      setNewAttributeName("");
      setNewAttributeValue("");
    }
  };

  const removeAttribute = (index: number) => {
    setProduct({
      ...product,
      attributes: product.attributes.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Product data:", product);
    // Aquí enviarías los datos al backend
  };

  const calculateFinalPrice = () => {
    const discount = (product.price * product.priceDiscount) / 100;
    return product.price - discount;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <div className="flex">
      {/* Sidebar */}
        <Sidebar />      
      
      <div className="flex flex-col">
      {/* Breadcrumb */} 
      <div className="max-w-7xl px-9">
        <BreadCrumbs />
      </div>      

      {/* Mobile Menu */}
        <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex-1 p-8">
        
        <ButtonMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>        

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
              <BiPackage className="text-cyan-400" size={36} />
              Crear Nuevo Producto
            </h1>
            <p className="text-slate-400">
              Completa la información del producto
            </p>
          </div>
          <div className="flex gap-3">
            <ButtonAction onClick={() => handleSubmit} children={<BiX size={18}/>} text={"Cancelar"} variant="secondary"/>
            <ButtonAction onClick={() => handleSubmit} children={<BiSave size={18}/>} text={"Guardar"} variant="primary"/>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <BiPackage size={20} className="text-cyan-400" />
                  Información Básica
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Ej: Audífonos Inalámbricos Pro X"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Slug (URL amigable) *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={product.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="audifonos-inalambricos-pro-x"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Descripción *
                    </label>
                    <textarea
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                      placeholder="Describe las características principales del producto..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-2">
                        Marca
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Ej: SoundMax"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-2">
                        Categoría *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="ID de categoría"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <FaDollarSign size={20} className="text-cyan-400" />
                  Precio e Inventario
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Precio *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="249900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Descuento (%)
                    </label>
                    <input
                      type="number"
                      name="priceDiscount"
                      value={product.priceDiscount}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="19"
                    />
                  </div>

                  {product.priceDiscount > 0 && (
                    <div className="col-span-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                      <p className="text-slate-400 text-sm mb-1">
                        Precio Final:
                      </p>
                      <p className="text-2xl font-bold text-cyan-400">
                        ${calculateFinalPrice().toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={product.sku}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="AUD-PROX-2024"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-300 font-semibold mb-2">
                      Código de Barras
                    </label>
                    <input
                      type="text"
                      name="barcode"
                      value={product.barcode}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="8909876543211"
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <BsImage size={20} className="text-cyan-400" />
                  Imágenes del Producto
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="URL de la imagen"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <BiPlus size={18} />
                      Agregar
                    </button>
                  </div>

                  {product.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <BsTrash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Variants */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <BiTag size={20} className="text-cyan-400" />
                  Variantes
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newVariantName}
                      onChange={(e) => setNewVariantName(e.target.value)}
                      className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Nombre de variante (Ej: Color, Talla)"
                    />
                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <BiPlus size={18} />
                      Agregar
                    </button>
                  </div>

                  {product.variants.map((variant, variantIndex) => (
                    <div
                      key={variantIndex}
                      className="bg-slate-700/30 border border-slate-600 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-slate-100 font-semibold">
                          {variant.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeVariant(variantIndex)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <BsTrash2 size={16} />
                        </button>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newVariantOption}
                          onChange={(e) => setNewVariantOption(e.target.value)}
                          className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-3 py-2 rounded-lg outline-none focus:border-cyan-400 transition-all text-sm"
                          placeholder="Agregar opción"
                        />
                        <button
                          type="button"
                          onClick={() => addVariantOption(variantIndex)}
                          className="bg-slate-600 hover:bg-slate-500 text-slate-200 px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                        >
                          <BiPlus size={16} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option, optionIndex) => (
                          <span
                            key={optionIndex}
                            className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
                          >
                            {option}
                            <button
                              type="button"
                              onClick={() =>
                                removeVariantOption(variantIndex, optionIndex)
                              }
                              className="hover:text-cyan-300 transition-colors"
                            >
                              <BiX size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <BiBarChart size={20} className="text-cyan-400" />
                  Atributos
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newAttributeName}
                      onChange={(e) => setNewAttributeName(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Nombre (Ej: Duración de Batería)"
                    />
                    <input
                      type="text"
                      value={newAttributeValue}
                      onChange={(e) => setNewAttributeValue(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Valor (Ej: 30 horas)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <BiPlus size={18} />
                    Agregar Atributo
                  </button>

                  {product.attributes.length > 0 && (
                    <div className="space-y-2">
                      {product.attributes.map((attr, index) => (
                        <div
                          key={index}
                          className="bg-slate-700/30 border border-slate-600 rounded-lg p-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-slate-400 text-sm">
                              {attr.name}
                            </p>
                            <p className="text-slate-100 font-medium">
                              {attr.value}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttribute(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <BsTrash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <BiPackage size={20} className="text-cyan-400" />
                  Dimensiones
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      value={product.dimensions.weight}
                      onChange={(e) =>
                        handleDimensionChange("weight", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="0.18"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Ancho (cm)
                    </label>
                    <input
                      type="number"
                      value={product.dimensions.width}
                      onChange={(e) =>
                        handleDimensionChange("width", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Alto (cm)
                    </label>
                    <input
                      type="number"
                      value={product.dimensions.height}
                      onChange={(e) =>
                        handleDimensionChange("height", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Profundidad (cm)
                    </label>
                    <input
                      type="number"
                      value={product.dimensions.depth}
                      onChange={(e) =>
                        handleDimensionChange("depth", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="3"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tags */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <BiTag size={20} className="text-cyan-400" />
                  Etiquetas
                </h2>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-3 py-2 rounded-lg outline-none focus:border-cyan-400 transition-all text-sm"
                      placeholder="Agregar etiqueta"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      <BiPlus size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="hover:text-cyan-300 transition-colors"
                        >
                          <BiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <BsTruck size={20} className="text-cyan-400" />
                  Envío
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.shipping.free}
                      onChange={(e) =>
                        handleShippingChange("free", e.target.checked)
                      }
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-slate-300 font-medium">
                      Envío Gratis
                    </span>
                  </label>

                  {!product.shipping.free && (
                    <div>
                      <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        Costo de Envío
                      </label>
                      <input
                        type="number"
                        value={product.shipping.cost}
                        onChange={(e) =>
                          handleShippingChange("cost", e.target.value)
                        }
                        min="0"
                        step="0.01"
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Digital Product */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <BiUpload size={20} className="text-cyan-400" />
                  Producto Digital
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDigital"
                      checked={product.isDigital}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-slate-300 font-medium">
                      Es un producto digital
                    </span>
                  </label>

                  {product.isDigital && (
                    <div>
                      <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        Archivo Digital (URL)
                      </label>
                      <input
                        type="url"
                        name="digitalFile"
                        value={product.digitalFile}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <BiBarChart size={20} className="text-cyan-400" />
                  Estadísticas
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={product.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="4.8"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Número de Reviews
                    </label>
                    <input
                      type="number"
                      name="reviewsCount"
                      value={product.reviewsCount}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="112"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                      Unidades Vendidas
                    </label>
                    <input
                      type="number"
                      name="soldCount"
                      value={product.soldCount}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="890"
                    />
                  </div>
                </div>
              </div>

              {/* Publish Status */}
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  {product.isPublished ? (
                    <BsEye size={20} className="text-cyan-400" />
                  ) : (
                    <FiEyeOff size={20} className="text-slate-400" />
                  )}
                  Estado de Publicación
                </h2>

                <label className="flex items-center gap-3 cursor-pointer bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={product.isPublished}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                  />
                  <div>
                    <p className="text-slate-200 font-medium">
                      Publicar Producto
                    </p>
                    <p className="text-slate-500 text-xs">
                      El producto será visible en la tienda
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default CreateProductPage;