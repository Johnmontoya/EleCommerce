export interface WishList {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class WishListEntity implements WishList {
    constructor(
        public id: string,
        public userId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(wishList: WishListEntity): WishListEntity {
        const id = crypto.randomUUID();
        return new WishListEntity(
            id,
            wishList.userId,
            wishList.createdAt,
            wishList.updatedAt,
        )
    }
}