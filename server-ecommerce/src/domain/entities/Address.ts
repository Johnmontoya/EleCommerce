export interface Address {
    userId: string;
    fullName: string | null;
    phone: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    isDefault: boolean | null | undefined;
}

export class AddressEntity implements Address {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public fullName: string | null,
        public phone: string | null,
        public street: string | null,
        public city: string | null,
        public state: string | null,
        public country: string | null,
        public zipCode: string | null,
        public isDefault: boolean | null | undefined,
    ) { }

    static create(props: Omit<Address, 'id'>): AddressEntity {
        const id = crypto.randomUUID();
        return new AddressEntity(
            id,
            props.userId,
            props.fullName,
            props.phone,
            props.street,
            props.city,
            props.state,
            props.country,
            props.zipCode,
            props.isDefault,
        );
    }
}

