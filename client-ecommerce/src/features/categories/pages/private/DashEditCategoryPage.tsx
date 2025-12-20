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
import { BiCategory, BiSave } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import FormCategory from "../../components/FormCreateCategory/FormCategory";

interface ValidationErrors {
    [key: string]: string[];
}

const DashEditCategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

        setValidationErrors({});

        try {
            await updateProduct.mutateAsync({ id: id!, data: createData });
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            }
        }
    };

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    }

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
                                    <BiCategory className="text-cyan-400" size={36} />
                                    Actualizar Categoría
                                </h1>
                                <p className="text-slate-400">
                                    Edita la información de la categoría
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-3">
                                <ButtonAction
                                    onClick={handleSubmit}
                                    text={"Actualizar"}
                                    variant="primary"
                                >
                                    <BiSave size={18} />
                                </ButtonAction>
                            </div>
                        </div>

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