export const endpoints = {
    orders: '/orders/all',
    ordersUser: '/orders/orders-user',
    updateOrderStatus: (id: string) => `/orders/update-status/${id}`,
    deleteOrder: (id: string) => `/orders/cancel/${id}`,
    getTrackingNumber: (trackingNumber: string) => `/orders/${trackingNumber}`,
}