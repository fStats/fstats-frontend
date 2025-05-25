import {useQuery} from "@tanstack/react-query";

import {News} from "@pages/types";
import {getNews} from "@services/news/api";

export const useNews = () => useQuery<News[], Error>({
    queryFn: () => getNews(),
    queryKey: ["news"]
})