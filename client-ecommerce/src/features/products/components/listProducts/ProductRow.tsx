import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdBlock, MdCheckCircle } from "react-icons/md";
import { useDeleteProductMutation } from "../../hook/mutation/useProductMutation";

interface ProductRowProps {
    product: any;
    selectedData: string[];
    handleSelectData: (userId: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, selectedData, handleSelectData }) => {
    const navigate = useNavigate();
    const deleteProduct = useDeleteProductMutation();

    const handleDelete = (product: any) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto ${product.name}?`)) {
            deleteProduct.mutate(product.id);
        }
    };

    return (
        <tr
            key={product?.id}
            className="text-center border-t border-slate-700 hover:bg-slate-700/30 transition-colors"
        >
            <td className="px-6 py-4">
                <label className="flex gap-3 items-center cursor-pointer relative">
                    <input type="checkbox" checked={selectedData.includes(product?.id!)} onChange={() => handleSelectData(product?.id!)} className="hidden peer" />
                    <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-cyan-600"></span>
                    <FaCheck size={12} className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2 text-cyan-600" />
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-start gap-3">
                    <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
                    />
                    <div className="text-left">
                        <p className="text-slate-100 font-semibold">{product.name}</p>
                        <p className="text-slate-400 text-xs">{product.brand}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border-blue-500/30 rounded-full text-sm">
                    {product?.category?.slug}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="text-slate-100 font-light">
                    ${Math.round(
                        product.price - (product.price * product.priceDiscount!) / 100
                    )}
                    {product.priceDiscount && (
                        <span className="ml-2 text-sm text-green-400">
                            {product.priceDiscount}%
                        </span>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`font-light ${product.stock > 10
                    ? "text-green-400"
                    : product.stock > 0
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}>
                    {product.stock}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${product.isPublished
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}>
                    {product.isPublished ? (
                        <>
                            <MdCheckCircle size={14} />
                            Publicado
                        </>
                    ) : (
                        <>
                            <MdBlock size={14} />
                            Borrador
                        </>
                    )}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex mx-auto items-center justify-center gap-2">
                    <ButtonAction
                        variant="view"
                        onClick={() => navigate(`/dashboard/products/${product.id}`)}
                        text=""
                    >
                        <BsEye size={18} />
                    </ButtonAction>
                    <ButtonAction
                        variant="edit"
                        onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
                        text=""
                    >
                        <BiEdit size={18} />
                    </ButtonAction>
                    <ButtonAction
                        variant="delete"
                        onClick={() => handleDelete(product)}
                        text=""
                    >
                        <BsTrash2 size={18} />
                    </ButtonAction>
                </div>
            </td>
        </tr>
    )
}

export default ProductRow