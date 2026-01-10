export interface WishlistItem {
    id: string;
    wishlistId: string;
    productId: string;
    productName: string;
    productImage: string;
    category: string;
    rating: number;
    reviews: number;
    stock: number;
    price: number;
    discount: number;
    total: number;
    createdAt: string;
}

export interface CreateWishlistItemDTO {
    wishlistId: string;
    productId: string;
}

export interface UpdateWishlistItemDTO {
    id: string;
}

export interface CreateWishlistDTO {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    discount: number;
    category: string;
    stock: number;
    reviews: number;
    rating: number;
    total: number;
}


