import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../api/endpoints";

export const paymentService = {
    async createPaymentIntent({ orderId, amount, customerEmail, customerName }: { orderId: string, amount: number, customerEmail: string, customerName: string }) {
        const response = await apiClient.post(endpoints.createPaymentIntent, {
            orderId,
            amount,
            customerEmail,
            customerName,
        });
        return response.data.data;
    },
};