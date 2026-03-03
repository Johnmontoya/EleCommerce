export const endpoints = {
    orders: '/orders/all',
    ordersUser: '/orders/orders-user',
    createOrder: '/orders/create',
    updateOrderStatus: (id: string) => `/orders/update-status/${id}`,
    deleteOrder: (id: string) => `/orders/cancel/${id}`,
    getTrackingNumber: (trackingNumber: string) => `/orders/${trackingNumber}`,
    createPaymentIntent: "/payments/create-intent"
}