import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/queries/useUsers";
import useInputs from "../../../../shared/hooks/useInputs";
import { useEffect, useState } from "react";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashHeader from "../../../../shared/ui/DashHeader";
import { BiUser } from "react-icons/bi";
import HeaderAction from "../../components/UserCreate/HeaderAction";
import FormInfoPersonal from "../../components/UserCreate/FormInfoPersonal";
import FormAvatar from "../../components/UserCreate/FormAvatar";
import FormRoleAndState from "../../components/UserCreate/FormRoleAndState";
import { useUpdateUserMutation } from "../../hooks/mutation/useAuthMutation";
import { AxiosError } from "axios";

interface ValidationErrors {
    [key: string]: string[];
}

const DashEditUserPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const updateUserMutation = useUpdateUserMutation();
    const { data } = useUser(id!);

    const [userData, onChangeCreateData, setUserData] = useInputs({
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        avatar: "",
        role: "USER",
        isActive: true,
        emailVerified: false,
    });

    useEffect(() => {
        if (data) {
            setUserData({
                email: data.email,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                avatar: data.avatar,
                role: data.role,
                isActive: data.isActive,
                emailVerified: data.emailVerified,
            })
        }
    }, [data])

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    }

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setValidationErrors({});
        setIsSubmitting(true);

        try {
            await updateUserMutation.mutateAsync({ id: id!, userData });
            navigate('/dashboard/users');
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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

                    <div className="w-full mx-auto flex-1 px-12 pb-8">
                        <ButtonMobile isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader data={[]} title="Editar Usuario" titleData="Usuarios" path="users" titleIcon={<BiUser className="text-cyan-400" size={36} />} list={false} />
                        <HeaderAction isSubmitting={isSubmitting} handleSubmit={handleSubmit} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Información Personal */}
                                <FormInfoPersonal
                                    userData={userData}
                                    onChangeCreateData={onChangeCreateData}
                                    setUserData={setUserData}
                                    getFieldsError={getFieldsError}
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

export default DashEditUserPage;