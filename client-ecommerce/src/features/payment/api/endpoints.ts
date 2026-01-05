export const endpoints = {
    payment: {
        create: '/payments/createCard',
        getPayment: '/payments/getCard',
        updatePayment: (id: string) => `/payments/payments/${id}`,
        deletePayment: (id: string) => `/payments/payments/${id}`,
    }
}