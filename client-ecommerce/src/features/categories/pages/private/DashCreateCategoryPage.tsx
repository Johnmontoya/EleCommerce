import { useState } from "react";
import { useCreateCategoryMutation } from "../../hook/mutation/useCategoryMutation";
import useInputs from "../../../../shared/hooks/useInputs";
import { AxiosError } from "axios";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { BiCategory, BiSave } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { CiEraser } from "react-icons/ci";
import FormCategory from "../../components/FormCreateCategory/FormCategory";

interface ValidationErrors {
    [key: string]: string[];
}

const DashCreateCategoryPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const createCategory = useCreateCategoryMutation();

    const [createData, onChangeCreateData, setCreateData] = useInputs({
        name: "",
        slug: "",
        image: "",
        description: "",
        parent: "",
        isActive: false,
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setValidationErrors({});
        try {
            await createCategory.mutateAsync(createData);
            setCreateData({
                name: "",
                slug: "",
                image: "",
                description: "",
                parent: "",
                isActive: false,
            });
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            }
        }
    };

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    };

    const handleReset = () => {
        setCreateData({
            name: "",
            slug: "",
            image: "",
            description: "",
            parent: "",
            isActive: false,
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
                                    <BiCategory className="text-cyan-400" size={36} />
                                    Crear Nueva Categoria
                                </h1>
                                <p className="text-slate-400">
                                    Completa la información de la categoria
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

export default DashCreateCategoryPage;