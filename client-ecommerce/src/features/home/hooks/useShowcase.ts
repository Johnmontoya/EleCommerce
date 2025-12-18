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