import type React from "react";
import { useState } from "react";
import { BiCategory, BiPlus } from "react-icons/bi";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface CategoryProps {
    name: string;
    slug: string;
    image: string;
    description: string;
    isActive: boolean;
}

interface CardCategoryProps {
    category: CategoryProps;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setCreateData: React.Dispatch<React.SetStateAction<any>>;
    getFieldsError: (fieldName: string) => string | undefined;
}

const FormCategory: React.FC<CardCategoryProps> = ({
    category,
    onChangeCreateData,
    setCreateData,
    getFieldsError
}) => {
    const [newImage, setNewImage] = useState<string>("");
    const addImage = () => {
        if (newImage.trim() && !category.image.includes(newImage.trim())) {
            setCreateData({ ...category, image: newImage.trim() });
            setNewImage("");
        }
    };

    const removeImage = () => {
        setCreateData({
            ...category,
            image: "",
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setCreateData({ ...category, [name]: checked });
        } else if (type === "number") {
            setCreateData({ ...category, [name]: parseFloat(value) || 0 });
        } else {
            setCreateData({ ...category, [name]: value });
        }
    };

    return (
        <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <BiCategory size={20} className="text-cyan-400" />
                Información para registro de Categoria
            </h2>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-slate-100 font-medium">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        required
                        onChange={onChangeCreateData}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Ej: Electronica"
                    />
                    {getFieldsError("name") && (
                        <p className="text-red-500 text-sm">
                            {getFieldsError("name")}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="slug" className="text-slate-100 font-medium">
                        Slug
                    </label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={category.slug}
                        required
                        onChange={onChangeCreateData}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Ej: electronica"
                    />
                    {getFieldsError("slug") && (
                        <p className="text-red-500 text-sm">
                            {getFieldsError("slug")}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="image" className="text-slate-100 font-medium">
                        Imagen
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="URL de la imagen"
                        />
                        <ButtonAction
                            onClick={addImage}
                            text="Agregar"
                            variant="primary"
                        >
                            <BiPlus size={18} />
                        </ButtonAction>
                    </div>
                    {getFieldsError("image") && (
                        <p className="text-red-500 text-sm mt-1">
                            {getFieldsError("image")}
                        </p>
                    )}
                </div>


                {category.image && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div
                            className="relative group bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden"
                        >
                            <img
                                src={category.image}
                                className="w-full h-32 object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage()}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <BsTrash2 size={16} />
                            </button>
                        </div>
                    </div>
                )}


                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-slate-100 font-medium">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={category.description}
                        onChange={onChangeCreateData}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Describe las características principales de la categoria..."
                    />
                    {getFieldsError("description") && (
                        <p className="text-red-500 text-sm mt-1">
                            {getFieldsError("description")}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                        {category.isActive ? (
                            <BsEye size={20} className="text-cyan-400" />
                        ) : (
                            <FiEyeOff size={20} className="text-slate-400" />
                        )}
                        Estado de Categoria
                    </h2>

                    <label className="flex items-center gap-3 cursor-pointer bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={category.isActive}
                            onChange={handleInputChange}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                        />
                        <div>
                            <p className="text-slate-200 font-medium">Publicar Categoria</p>
                            <p className="text-slate-500 text-xs">
                                La categoria será visible en el menu de categorias
                            </p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FormCategory