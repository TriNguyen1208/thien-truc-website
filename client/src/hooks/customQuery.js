import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DEFAULT_STALE_TIME = 10 * 60 * 1000;

// Custom hook để gọi API
const useCustomQuery = (queryKey, queryFn, staleTime = DEFAULT_STALE_TIME, option = {}) => {
    return useQuery({
        queryKey,
        queryFn,
        staleTime,
        ...option,
    });
};

const useCustomMutation = (queryKey, queryFn) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: queryFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKey, // match theo prefix
                exact: false,            // cho phép match tất cả ["news_list", ...]
            });
        }
    });
};

export { useCustomQuery, useCustomMutation };
