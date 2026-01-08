import { useQuery } from "@tanstack/react-query"
import { showcaseService } from "../../services/showcaseService"

export const useBannerAll = () => {
    return useQuery({
        queryKey: ['banner'],
        queryFn: () => showcaseService.getAllBanners(),
        select: (response) => response.data,
        staleTime: 2 * 60 * 1000, // 1 hour
    })
}