import {News} from "@pages/types";
import {ApiMessage} from "@services/fstats/types";

export const getNews = async (): Promise<News[]> => {
    const response = await fetch("https://raw.githubusercontent.com/fStats/.github/refs/heads/main/news_updates.json");

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as News[];
};