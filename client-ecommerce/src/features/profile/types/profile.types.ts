export interface ChangePasswordInput {
    email?: string;
    otp?: string;
    password: string;
    newPassword: string;
}