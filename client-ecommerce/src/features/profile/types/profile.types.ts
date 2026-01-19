export interface ChangePasswordInput {
    email?: string;
    otp?: string;
    password: string;
    newPassword?: string;
}

export interface UpdateAddressInput {
    id: string;
    addressData: Address;
}

export interface Address {
    id: string;
    fullName: null,
    phone: null,
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isDefault: boolean;
}