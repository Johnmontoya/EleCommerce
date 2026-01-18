import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateCategoryMutation } from "../../hook/mutation/useCategoryMutation";
import { useCategory } from "../../hook/queries/useCategory";
import useInputs from "../../../../shared/hooks/useInputs";
import { AxiosError } from "axios";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { BiCategory } from "react-icons/bi";
import FormCategory from "../../components/FormCreateCategory/FormCategory";
import DashHeader from "../../../../shared/ui/DashHeader";
import HeaderAction from "../../../auth/components/UserCreate/HeaderAction";

interface ValidationErrors {
    [key: string]: string[];
}

const DashEditCategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const updateProduct = useUpdateCategoryMutation();
    const { data: category } = useCategory(id!);

    const [createData, onChangeCreateData, setCreateData] = useInputs({
        name: "",
        slug: "",
        image: "",
        description: "",
        isActive: false
    });

    useEffect(() => {
        if (category) {
            setCreateData({
                name: category.name,
                slug: category.slug,
                image: category.image,
                description: category.description,
                isActive: category.isActive
            })
        }
    }, [category]);

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setIsSubmitting(true);
        setValidationErrors({});

        try {
            await updateProduct.mutateAsync({ id: id!, data: createData });
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    }

    return (
        <div className="min-h-screen background-light dark:background-light">
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

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader
                            data={[]}
                            title="Editar Categoría"
                            titleData="Categorías"
                            path="categories"
                            titleIcon={<BiCategory className="text-cyan-400" size={36} />}
                            list={false}
                        />
                        <HeaderAction isSubmitting={isSubmitting} handleSubmit={handleSubmit} title="categoria" />

                        <form>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <FormCategory
                                        category={createData}
                                        onChangeCreateData={onChangeCreateData}
                                        setCreateData={setCreateData}
                                        getFieldsError={getFieldsError}
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

export default DashEditCategoryPage;