import type React from "react";
import { useState } from "react";
import { BiCategory, BiPlus } from "react-icons/bi";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";

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
    setCreateData: React.Dispatch<React.SetStateAction<CategoryProps>>;
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
        <div className="border border-zinc-800 bg-[#050505] p-8 font-mono relative overflow-hidden">
            {/* Tech accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

            <h2 className="text-lg font-bold text-[#00f0ff] mb-8 flex items-center gap-2 uppercase tracking-widest border-b border-zinc-800 pb-4">
                <BiCategory size={20} />
                [DATOS_CATEGORIA]
            </h2>
            <div className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-1">
                        [NOMBRE_CATEGORIA]
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        required
                        onChange={onChangeCreateData}
                        className="w-full bg-black border border-zinc-800 text-white uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all placeholder:text-zinc-700"
                        placeholder="e.g. ELECTRONICS"
                    />
                    {getFieldsError("name") && (
                        <p className="text-red-500 text-sm">
                            {getFieldsError("name")}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="slug" className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-1">
                        [IDENTIFICADOR_SLUG]
                    </label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={category.slug}
                        required
                        onChange={onChangeCreateData}
                        className="w-full bg-black border border-zinc-800 text-[#00f0ff] tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all placeholder:text-zinc-700 lowercase"
                        placeholder="e.g. electronics"
                    />
                    {getFieldsError("slug") && (
                        <p className="text-red-500 text-sm">
                            {getFieldsError("slug")}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="image" className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-1">
                        [FUENTE_URL_IMAGEN]
                    </label>
                    <div className="flex items-stretch gap-2">
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            className="flex-1 bg-black border border-zinc-800 text-white tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all placeholder:text-zinc-700"
                            placeholder="https://..."
                        />
                        <button
                            type="button"
                            onClick={addImage}
                            className="flex items-center justify-center gap-2 px-6 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all font-bold uppercase tracking-widest text-xs"
                        >
                            <BiPlus size={18} />
                            <span className="hidden md:flex">[ADD]</span>
                        </button>
                    </div>
                    {getFieldsError("image") && (
                        <p className="text-red-500 text-sm mt-1">
                            {getFieldsError("image")}
                        </p>
                    )}
                </div>


                {category.image && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        <div className="relative group border border-zinc-800 bg-black overflow-hidden p-1">
                            <div className="absolute inset-0 bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                            <img
                                src={category.image}
                                className="w-full h-32 object-cover grayscale mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                                alt="Category Preview"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage()}
                                className="absolute top-2 right-2 border border-[#ff0055] bg-black text-[#ff0055] hover:bg-[#ff0055] hover:text-white p-2 transition-all opacity-0 group-hover:opacity-100 z-20"
                            >
                                <BsTrash2 size={16} />
                            </button>
                        </div>
                    </div>
                )}


                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="description" className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-1">
                        [DESCRIPCION_CATEGORIA]
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={category.description}
                        onChange={onChangeCreateData}
                        rows={4}
                        className="w-full bg-black border border-zinc-800 text-zinc-300 tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/50 transition-all placeholder:text-zinc-700 resize-none font-mono"
                        placeholder="ENTER DETAILED DESCRIPTION PROFILE..."
                    />
                    {getFieldsError("description") && (
                        <p className="text-red-500 text-sm mt-1">
                            {getFieldsError("description")}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-4 mt-8 border-t border-zinc-800 pt-6">
                    <h2 className="text-[10px] font-bold text-[#00f0ff] tracking-widest uppercase flex items-center gap-2">
                        {category.isActive ? (
                            <BsEye size={16} className="text-[#e4ff00]" />
                        ) : (
                            <FiEyeOff size={16} className="text-[#ff0055]" />
                        )}
                        [TOGGLE_ESTADO_SISTEMA]
                    </h2>

                    <label className="flex items-center gap-4 cursor-pointer bg-black border border-zinc-800 p-4 hover:border-[#00f0ff] transition-all relative overflow-hidden group">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${category.isActive ? 'bg-[#e4ff00]' : 'bg-[#ff0055]'}`} />
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={category.isActive}
                                onChange={handleInputChange}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-zinc-900 border border-zinc-700 peer-focus:outline-none peer-checked:bg-[#e4ff00]/20 peer-checked:border-[#e4ff00] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-500 after:border after:border-zinc-700 after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-[#e4ff00] peer-checked:after:border-[#e4ff00]"></div>
                        </div>
                        <div>
                            <p className="text-white font-bold uppercase tracking-widest text-xs">
                                {category.isActive ? "[ESTADO: VISIBLE]" : "[ESTADO: OCULTO]"}
                            </p>
                            <p className="text-zinc-500 text-[10px] uppercase font-mono mt-1">
                                // TOGGLE CATEGORIA EXPOSURE TO CLIENT INTERFACES //
                            </p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FormCategory