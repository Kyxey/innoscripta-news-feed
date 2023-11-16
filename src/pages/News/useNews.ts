import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { newsSources, type NewsSources } from "const/news";
import axios from "axios";

type NewsSourceEntity = { key: NewsSources, url: string, enabled: boolean; };
type ModifyNewsSourceFunc = (newsSource: NewsSources, enabled: boolean) => void;
type News = {
    title: string,
    summary: string,
    description: string,
    category: string,
    createdAt: Date,
    author: string,
    source: NewsSources;
};

function useNews() {
    const newsSourcesStateInStorageKey = "newsSourcesState";
    const newsSourcesStateInStorage = localStorage.getItem(newsSourcesStateInStorageKey);
    const [newsSourcesState, setNewsSourcesState] = useState<NewsSourceEntity[]>(
        [
            newsSourcesStateInStorage ? JSON.parse(newsSourcesStateInStorage) :
                {
                    key: "NEWSSOURCE1",
                    url: newsSources.NEWSSOURCE1.url,
                    enabled: true
                },
            {
                key: "NEWSSOURCE2",
                url: newsSources.NEWSSOURCE2.url,
                enabled: false
            },
            {
                key: "NEWSSOURCE3",
                url: newsSources.NEWSSOURCE3.url,
                enabled: false
            }
        ]
    );
    const queryClient = useQueryClient();
    const fetchNews = useCallback(async () => {
        const news: News[] = [];
        for (const newsSource of newsSourcesState) {
            if (newsSource.enabled) {
                const result = await axios.get(newsSource.url);

                if (result.status == 200) {
                    // TODO: destruct data correctly
                    news.push({
                        title: result.data.title,
                        summary: result.data.summary,
                        description: result.data.description,
                        category: result.data.category,
                        createdAt: new Date(result.data.created),
                        author: result.data.author,
                        source: newsSource.key,
                    });
                }
            }
        }

        return news;
    }, [newsSourcesState]);
    const newsQueryResult = useQuery<News[]>({ queryKey: ['NEWS'], queryFn: fetchNews });

    useEffect(() => {
        localStorage.setItem(newsSourcesStateInStorageKey, JSON.stringify(newsSourcesState));
    }, [newsSourcesState]);

    const modifyNewsSource: ModifyNewsSourceFunc = (newsSource, enabled) => {
        setNewsSourcesState(newsSourcesState.map((newsSourceState) => {
            if (newsSourceState.key == newsSource) {
                return {
                    ...newsSourceState,
                    enabled,
                };
            }
            return newsSourceState;
        }));

        queryClient.invalidateQueries({ queryKey: ["NEWS"] });
    };


    return { newsSourcesState, modifyNewsSource, newsQueryResult };
}

export { useNews, type News };