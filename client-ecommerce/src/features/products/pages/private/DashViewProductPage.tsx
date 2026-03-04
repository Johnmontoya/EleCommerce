// pages/admin/ProductDetailPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hook/queries/useProduct";
import { useDeleteProductMutation, useUpdatePublishProductMutation } from "../../hook/mutation/useProductMutation";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashViewHeader from "../../components/viewsProduct/DashViewHeader";
import CardPriceCard from "../../components/viewsProduct/CardPriceCard";
import CardMainInfo from "../../components/viewsProduct/CardMainInfo";
import SweetAlertas from "../../../../shared/ui/SweetAlertas";

const DashViewProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: product, isLoading } = useProduct(id!);
    const deleteProduct = useDeleteProductMutation();
    const updateProduct = useUpdatePublishProductMutation();

    const Cancel = () => { };

    const ConfirmDeleteBlog = async (id: string) => {
        await deleteProduct.mutateAsync(id);
        navigate("/dashboard/products");
    };

    const handleDelete = () => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar el producto ${product?.name}`,
            onConfirm: () => ConfirmDeleteBlog(id!),
            onCancel: Cancel,
        });
    };

    const handleTogglePublish = async () => {
        if (product) {
            await updateProduct.mutateAsync({
                id: product.id,
                isPublished: !product.isPublished
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono">
                <div className="text-center">
                    <div className="animate-spin rounded-none h-12 w-12 border-2 border-t-[#00f0ff] border-r-transparent border-b-[#ff0055] border-l-transparent mx-auto"></div>
                    <p className="mt-4 text-[#00f0ff] tracking-widest text-xs uppercase">[CARGANDO_DATOS_DEL_PRODUCTO...]</p>
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
                    <p className="text-[#ff0055] tracking-widest text-xs uppercase font-bold mb-8 flex flex-col items-center">
                        <span className="text-4xl block mb-2">⚠</span>
                        [ERR:_PRODUCTO_NO_ENCONTRADO]
                    </p>
                    <button
                        onClick={() => navigate("/dashboard/products")}
                        className="px-6 py-2 bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055] hover:bg-[#ff0055] hover:text-white transition-all text-[10px] tracking-widest uppercase font-bold"
                    >
                        [REGRESAR_A_LA_BASE_DE_DATOS]
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
            <div className="flex">
                {/** Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashViewHeader
                            data={product}
                            handleTogglePublish={handleTogglePublish}
                            handleDelete={handleDelete}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Info */}
                            <CardMainInfo product={product} />

                            {/* Sidebar */}
                            <CardPriceCard product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashViewProductPage;