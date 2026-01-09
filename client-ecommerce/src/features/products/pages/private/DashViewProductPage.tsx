// pages/admin/ProductDetailPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hook/queries/useProduct";
import { useDeleteProductMutation, useUpdateProductMutation } from "../../hook/mutation/useProductMutation";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
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
    const updateProduct = useUpdateProductMutation();

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
                data: { isPublished: !product.isPublished }
            });
        }
    };

    if (isLoading) return <LoadingFallback />;
    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Producto no encontrado</p>
                    <button
                        onClick={() => navigate("/dashboard/products")}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="flex">
                {/** Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
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