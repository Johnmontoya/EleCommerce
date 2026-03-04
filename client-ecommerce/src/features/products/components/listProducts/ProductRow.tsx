import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useDeleteProductMutation } from "../../hook/mutation/useProductMutation";
import SweetAlertas from "../../../../shared/ui/SweetAlertas";

interface ProductRowProps {
    product: any;
    selectedData: string[];
    handleSelectData: (userId: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, selectedData, handleSelectData }) => {
    const navigate = useNavigate();
    const deleteProduct = useDeleteProductMutation();
    const Cancel = () => { };

    const ConfirmDeleteBlog = async (id: string) => {
        await deleteProduct.mutateAsync(id);
    };

    const handleDelete = (product: any) => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar el producto ${product.name}`,
            onConfirm: () => ConfirmDeleteBlog(product.id),
            onCancel: Cancel,
        });
    };

    return (
        <tr
            key={product?.id}
            className="text-center border-t border-zinc-800 border-dashed hover:bg-[#050505] transition-colors font-mono"
        >
            <td className="px-6 py-4">
                <label className="flex gap-3 items-center cursor-pointer relative justify-center">
                    <input type="checkbox" checked={selectedData.includes(product?.id!)} onChange={() => handleSelectData(product?.id!)} className="hidden peer" />
                    <span className="w-4 h-4 bg-black border border-zinc-600 relative flex items-center justify-center peer-checked:border-[#00f0ff] peer-checked:bg-[#00f0ff]/20 transition-all"></span>
                    <FaCheck size={10} className="absolute hidden peer-checked:inline left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00f0ff]" />
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-start gap-4">
                    <div className="relative group w-12 h-12">
                        <div className="absolute inset-0 border border-zinc-700 group-hover:border-[#00f0ff] transition-colors" />
                        <img
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-[#e4ff00] font-bold text-xs uppercase tracking-widest">{product.name}</p>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-1">[{product.brand}]</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="px-2 py-1 bg-black border border-zinc-800 text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] uppercase">
                    {product?.category?.slug}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="text-white text-xs font-bold tracking-widest text-left inline-block">
                    CR_{Math.round(
                        product.price - (product.price * (product.priceDiscount || 0)) / 100
                    )}
                    {(product.priceDiscount && product.priceDiscount > 0) ? (
                        <div className="text-[10px] text-[#ff0055] mt-1 tracking-[0.2em]">
                            -[{product.priceDiscount}%]
                        </div>
                    ) : null}
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${product.stock > 10
                    ? "text-[#e4ff00]"
                    : product.stock > 0
                        ? "text-[#ff0055]"
                        : "text-zinc-500"
                    }`}>
                    {product.stock}_UNT
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={`flex items-center justify-center gap-2 px-2 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all ${product.isPublished
                    ? "bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]"
                    : "bg-black border-zinc-800 text-zinc-500"
                    }`}>
                    {product.isPublished ? (
                        <>
                            <span className="w-1.5 h-1.5 bg-[#00f0ff]"></span>
                            [EN_LINEA]
                        </>
                    ) : (
                        <>
                            <span className="w-1.5 h-1.5 bg-zinc-500"></span>
                            [BORRADOR]
                        </>
                    )}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex mx-auto items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(`/dashboard/products/${product.id}`)}
                        className="text-zinc-400 hover:text-[#00f0ff] transition-colors p-1"
                        title="VIEW_DATA"
                    >
                        <BsEye size={16} />
                    </button>
                    <button
                        onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
                        className="text-zinc-400 hover:text-[#e4ff00] transition-colors p-1"
                        title="EDIT_AUTH"
                    >
                        <BiEdit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(product)}
                        className="text-zinc-400 hover:text-[#ff0055] transition-colors p-1"
                        title="EXEC_DELETE"
                    >
                        <BsTrash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow