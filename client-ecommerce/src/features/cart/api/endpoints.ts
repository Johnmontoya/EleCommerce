export const endpoints = {
    cart: {
        addToCart: '/cart/cart/add',
        getCart: '/cart/cart/me',
        deleteCart: (id: string) => `/cart/cart/${id}`,
        updateCart: '/cart/cart',
        createOrder: '/orders/create',
    },
    address: {
        createAddress: '/address/create',
        getAddressById: '/address/get/:id',
        getAddressByUserId: '/address/get-user',
        updateAddress: '/address/update/:id',
        deleteAddress: '/address/delete/:id',
        setDefaultAddress: '/address/set-default/:id',
    }
}