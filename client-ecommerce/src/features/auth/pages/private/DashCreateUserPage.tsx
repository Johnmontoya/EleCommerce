import { useState } from "react";
import { BiUser } from "react-icons/bi";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashHeader from "../../../../shared/ui/DashHeader";
import HeaderAction from "../../components/UserCreate/HeaderAction";
import FormInfoPersonal from "../../components/UserCreate/FormInfoPersonal";
import FormCredential from "../../components/UserCreate/FormCredential";
import FormAvatar from "../../components/UserCreate/FormAvatar";
import FormRoleAndState from "../../components/UserCreate/FormRoleAndState";
import useInputs from "../../../../shared/hooks/useInputs";
import { AxiosError } from "axios";
import { useAuthRegisterMutation } from "../../hooks/mutation/useAuthMutation";
import { useNavigate } from "react-router-dom";

interface ValidationErrors {
    [key: string]: string[];
}

const DashCreateUserPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const createUserMutation = useAuthRegisterMutation();
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [userData, onChangeCreateData, setUserData] = useInputs({
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        avatar: "",
        role: "customer",
        isActive: true,
        emailVerified: false,
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    }

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setValidationErrors({});
        setIsSubmitting(true);

        try {
            if (userData.password !== confirmPassword) {
                setValidationErrors({
                    confirmPassword: ["Las contraseñas no coinciden"],
                });
                return;
            }

            await createUserMutation.mutateAsync(userData);
            setIsSubmitting(false);
            setUserData({});
            navigate("/dashboard/users");
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setUserData({});
        setValidationErrors({});
    };

    return (
        <div className="min-h-screen background-light dark:background-light">
            <div className="flex">
                {/**Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* MObile Menu */}
                    <NavMobile
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader data={[]} title="Crear Nuevo Usuario" titleData="Usuarios" path="users" titleIcon={<BiUser className="text-cyan-400" size={36} />} list={false} />
                        <HeaderAction isSubmitting={isSubmitting} handleSubmit={handleSubmit} handleReset={handleReset} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Información Personal */}
                                <FormInfoPersonal
                                    userData={userData}
                                    onChangeCreateData={onChangeCreateData}
                                    setUserData={setUserData}
                                    getFieldsError={getFieldsError}
                                />

                                {/* Credenciales de Acceso */}
                                <FormCredential
                                    userData={userData}
                                    onChangeCreateData={onChangeCreateData}
                                    getFieldsError={getFieldsError}
                                    confirmPassword={confirmPassword}
                                    setConfirmPassword={setConfirmPassword}
                                />

                                {/* Avatar */}
                                <FormAvatar
                                    userData={userData}
                                    onChangeCreateData={onChangeCreateData}
                                />
                            </div>

                            {/* Right Sidebar */}
                            <FormRoleAndState
                                userData={userData}
                                onChangeCreateData={onChangeCreateData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashCreateUserPage;