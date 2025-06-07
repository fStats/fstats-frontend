import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchInterval: 1800000,
            gcTime: 1800000,
            staleTime: 1800000
        }
    }
});