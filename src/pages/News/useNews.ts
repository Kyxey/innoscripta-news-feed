import { useState, useEffect, useCallback } from "react";
import { newsSources, type NewsSources } from "const/news";

type NewsSourceEntity = { key: NewsSources, url: string, enabled: boolean; };
type ModifyNewsSourceFunc = (newsSource: NewsSources, enabled: boolean) => void;

function useNews() {
    const newsSourcesStateInStorageKey = "newsSourcesState";
    const newsSourcesStateInStorage = localStorage.getItem(newsSourcesStateInStorageKey);
    const [newsState, setNewsState] = useState<
        // TODO: add the correct type
        string>();
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
    };

    const fetchNews = useCallback(() => {
        // TODO: fetch the APIs
        setNewsState(newsSourcesState[0].key);
    }, [newsSourcesState]);

    return { newsState, newsSourcesState, modifyNewsSource, fetchNews };
}

export { useNews };