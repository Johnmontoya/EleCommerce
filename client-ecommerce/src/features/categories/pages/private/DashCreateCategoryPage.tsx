import { useState } from "react";
import { useCreateCategoryMutation } from "../../hook/mutation/useCategoryMutation";
import useInputs from "../../../../shared/hooks/useInputs";
import { AxiosError } from "axios";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { BiCategory, BiSave } from "react-icons/bi";
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
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
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
                        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                            <div>
                                <h1 className="text-2xl lg:text-4xl font-black text-white mb-2 flex items-center gap-3 uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                    <BiCategory className="text-[#00f0ff]" size={36} />
                                    [CREATE_CATEGORY]
                                </h1>
                                <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                                    // INITIALIZE_NEW_CATEGORY_NODE //
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-2 px-6 py-3 border border-zinc-800 bg-black text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] hover:bg-[#ff0055]/5 transition-all font-bold uppercase tracking-widest text-xs"
                                >
                                    <CiEraser size={18} />
                                    [RESET_FORM]
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 px-6 py-3 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all font-bold uppercase tracking-widest text-xs"
                                >
                                    <BiSave size={18} />
                                    [SAVE_CONFIG]
                                </button>
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