import { apiClient } from "../../../shared/api/client";
import type { ApiResponse } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";
import type { PaymentInput, UpdatePaymentInput } from "../types/payment.types";

export const paymentService = {
    createPayment: async (payment: PaymentInput): Promise<ApiResponse<PaymentInput>> => {
        const { data } = await apiClient.post(endpoints.payment.create, payment);
        return data;
    },
    getPaymentById: async (userId: string): Promise<ApiResponse<PaymentInput> | null> => {
        const { data } = await apiClient.get(endpoints.payment.getPayment, { data: userId });
        return data;
    },
    updatePayment: async ({ id, payment }: UpdatePaymentInput): Promise<ApiResponse<PaymentInput>> => {
        const { data } = await apiClient.put(endpoints.payment.updatePayment(id), payment);
        return data;
    },
    deletePayment: async (id: string): Promise<ApiResponse<PaymentInput>> => {
        const { data } = await apiClient.delete(endpoints.payment.deletePayment(id));
        return data;
    }
}