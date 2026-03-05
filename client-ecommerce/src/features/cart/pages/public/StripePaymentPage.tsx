import { useMemo, useState } from "react";
import CheckoutPage from "../../../orders/components/stripePage/CheckoutPage";
import { useAddressUser, useCartUser } from "../../hook/queries/useCart";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import type { SavedAddress } from "../../../orders/types/checkout.types";
import type { CartResponseItems } from "../../types/cart.types";
import type { Address } from "../../../profile/types/profile.types";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import { orderService } from "../../../orders/services/orderService";

const StripePaymentPage = () => {
    const { data: cart, isLoading } = useCartUser();
    const { user } = useAuthStore();
    const { data: addressUser } = useAddressUser();

    // ── Cálculos de precios ────────────────────────────────────────────────────
    const sortedCart = useMemo(() => {
        if (!cart) return [];
        return [...cart].sort((a, b) => a.id.localeCompare(b.id));
    }, [cart]);

    const pricing = useMemo(() => {
        if (!cart || cart.length === 0) {
            return { subtotal: 0, tax: 0, shippingCost: 0, discount: 0, total: 0 };
        }

        let subtotalSinDescuento = 0;
        let totalDescuento = 0;

        cart.forEach((item) => {
            const precioOriginal = item.price * item.quantity;
            subtotalSinDescuento += precioOriginal;

            if (item.discount && item.discount > 0) {
                totalDescuento += precioOriginal * (item.discount / 100);
            }
        });

        const subtotalConDescuento = subtotalSinDescuento - totalDescuento;
        const shippingCost = subtotalConDescuento < 150000 ? 15000 : 0;
        const tax = subtotalConDescuento * 0.02;
        const total = subtotalConDescuento + tax + shippingCost;

        return {
            subtotal: parseFloat(subtotalSinDescuento.toFixed(2)),
            discount: parseFloat(totalDescuento.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            shippingCost,
            total: parseFloat(total.toFixed(2)),
        };
    }, [cart]);

    const [trackingNumber] = useState(() => `TRK-${crypto.randomUUID().toUpperCase()}`);

    const handleCreateOrder = async (addressId: string, notes: string) => {
        if (!user || !cart || cart.length === 0) {
            throw new Error("No hay sesión o carrito vacío");
        }

        // Mapear cada item del carrito al formato que espera el backend
        const items = cart.map((item: CartResponseItems) => ({
            cartId: item.cartId,
            name: item.name,
            image: item.image,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount ?? 0,
            total: item.price * item.quantity,
        }));

        const result = await orderService.createOrder({
            userId: user.id as string,
            subtotal: pricing.subtotal,
            tax: pricing.tax,
            shippingCost: pricing.shippingCost,
            discount: pricing.discount,
            total: pricing.total,
            paymentMethod: "STRIPE",
            addressId,
            trackingNumber,
            notes: notes || null,
            items,
        });

        return result;
    };

    const customer = {
        email: user?.email ?? "",
        name: user?.firstName || user?.username || user?.email?.split("@")[0] || "Cliente",
    };

    const savedAddresses: SavedAddress[] = addressUser?.map((address: Address) => ({
        id: address.id,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        phone: address.phone,
    })) ?? [];

    const cartItemsStock = sortedCart.map((item: CartResponseItems) => item.stock);

    if (isLoading) return <LoadingFallback />;

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-slate-400 gap-3">
                <p className="text-lg">Tu carrito está vacío.</p>
                <a href="/products" className="text-sky-400 hover:underline text-sm">
                    Ver productos
                </a>
            </div>
        );
    }

    return (
        <div>
            <CheckoutPage
                stock={cartItemsStock}
                cartItems={sortedCart}
                customer={customer}
                pricing={pricing}
                savedAddresses={savedAddresses}
                onCreateOrder={handleCreateOrder}
            />
        </div>
    );
};

export default StripePaymentPage;