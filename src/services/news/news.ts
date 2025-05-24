import {useQuery} from "@tanstack/react-query";

import {News} from "@pages/types";
import {getNews} from "@services/news/newsApi";

export const useNews = () => useQuery<News[], Error>({
    queryFn: () => getNews(),
    queryKey: ["news"]
})