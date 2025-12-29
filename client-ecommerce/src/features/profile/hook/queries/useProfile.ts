import { useQuery } from "@tanstack/react-query"
import { profileService } from "../../services/profileService"
import { queryKeys } from "../../../../shared/lib/queryClient"

export const useProfile = () => {
    return useQuery({
        queryKey: queryKeys.profile.get(),
        queryFn: () => profileService.getProfile(),
        select: (response) => response.data,
        staleTime: 2 * 60 * 1000,
    })
}