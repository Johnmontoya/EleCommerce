import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { wishService } from "../../services/wishServices"
import type { WishlistItem } from "../../types/wish.types";

export const useWishlistItems = () => {
    return useQuery<WishlistItem[] | null, Error>({
        queryKey: queryKeys.wishlist.get(),
        queryFn: () => wishService.getWishlistItems(),
        select: (response) => response || null,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};

export const useWishCount = (userId: string) => {
    return useQuery({
        queryKey: ['wishlist'],
        queryFn: () => wishService.getWishCount(userId),
        select: (response) => response,
        staleTime: 2 * 60 * 1000,
    })
}