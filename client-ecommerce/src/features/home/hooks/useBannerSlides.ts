import { useState, useEffect } from 'react';
import { bannerService } from '../api/bannerService';
import { localBannerSlides } from '../api/bannerData';
import type { BannerSlide } from '../types/home.types';

export const useBannerSlides = (useLocalData = true) => {
    const [slides, setSlides] = useState<BannerSlide[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSlides = async () => {
            // Si se usa data local, retornar inmediatamente
            if (useLocalData) {
                setSlides(localBannerSlides);
                return;
            }

            // Si no, hacer fetch a la API
            setLoading(true);
            try {
                const data = await bannerService.getBannerSlides();
                setSlides(data);
                setError(null);
            } catch (err) {
                setError(err as Error);
                // Fallback a datos locales si falla la API
                console.warn('Using local data as fallback');
                setSlides(localBannerSlides);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, [useLocalData]);

    return { slides, loading, error };
};