import type { DisplaySection, PromotionalData } from "../../products/types/product.types";

export interface Banner {
    _id?: string;
    id?: string;
    productId: string;
    productName: string;
    name?: string;
    productImage: string;
    displaySections?: DisplaySection[] | undefined;  // Dónde aparece este producto
    displayPriority?: number | undefined;            // Orden (1 = primero)
    isFeatured?: boolean | undefined;                // Quick flag para destacados
    promotionalData?: PromotionalData | undefined;   // Datos de promoción
    featuredUntil?: Date | undefined;
}