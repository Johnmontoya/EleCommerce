import type { BannerSlide } from "../interfaces/banner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const bannerService = {
    // Obtener slides desde API
    async getBannerSlides(): Promise<BannerSlide[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/banners`);
            if (!response.ok) {
                throw new Error('Failed to fetch banner slides');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching banner slides:', error);
            throw error;
        }
    },

    // Obtener slide específico
    async getBannerSlideById(id: number): Promise<BannerSlide> {
        try {
            const response = await fetch(`${API_BASE_URL}/banners/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch banner slide');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching banner slide:', error);
            throw error;
        }
    }
};