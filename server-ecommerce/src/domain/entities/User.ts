export interface User {
    email: string;
    password: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    avatar: string | null;
    role: string | null;
    isActive: boolean | null | undefined;
    emailVerified: boolean | null | undefined;
    otp: string | null;
}

export class UserEntity implements User {
    constructor(
        public readonly id: string,
        public email: string,
        public password: string,
        public username: string | null,
        public firstName: string | null,
        public lastName: string | null,
        public phone: string | null,
        public avatar: string | null,
        public role: string | null,
        public isActive: boolean | null | undefined,
        public emailVerified: boolean | null | undefined,
        public otp: string | null,
    ) { }

    static create(props: Omit<User, 'id'>): UserEntity {
        const id = crypto.randomUUID();
        return new UserEntity(
            id,
            props.email,
            props.password,
            props.username,
            props.firstName,
            props.lastName,
            props.phone,
            props.avatar,
            props.role,
            props.isActive,
            props.emailVerified,
            props.otp,
        );
    }
}