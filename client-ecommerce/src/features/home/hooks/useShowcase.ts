import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../shared/lib/queryClient"
import { homeService } from "../services/homeService"

export const useBannerProducts = () => {
    return useQuery({
        queryKey: queryKeys.showcase.banner(),
        queryFn: () => homeService.getBanner(),
        select: (response) => response.data,
        staleTime: 10 * 60 * 1000,
    })
}

export const useBannerPromotional = () => {
    return useQuery({
        queryKey: queryKeys.showcase.promotional(),
        queryFn: () => homeService.getPromotions(),
        select: (response) => response.data,
        staleTime: 10 * 60 * 1000,
    })
}

export const useGetTrends = () => {
    return useQuery({
        queryKey: queryKeys.showcase.trends(),
        queryFn: () => homeService.getTrends(),
        select: (response) => response.data,
        staleTime: 10 * 60 * 1000,
    })
}

export const useGetShowcase = () => {
    return useQuery({
        queryKey: queryKeys.showcase.featured(),
        queryFn: () => homeService.getShowcase(),
        select: (response) => response.data,
        staleTime: 10 * 60 * 1000,
    })
}

