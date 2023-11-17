import { useQuery } from "@tanstack/react-query";
import { newsSources } from "const/news";
import axios from "axios";
import defaultImg from "assets/default-img.png";
import { useEffect, useState } from "react";

type News = {
  title: string;
  description: string;
  createdAt: Date;
  author: string;
  source: string;
  url: string;
  image: string;
};

type QueryStatus = {
  total: number;
  page: number;
  limit: number;
};

type Source = {
  id: string;
  name: string;
};

function useNews() {
  const queryStatusStorageKey = "NewsQStatus";
  const queryStatusInStorage = localStorage.getItem(queryStatusStorageKey);
  const enabledSourcesStorageKey = "NewsSources";
  const enabledSourcesInStorage = localStorage.getItem(
    enabledSourcesStorageKey
  );
  const [queryStatus, setQueryStatus] = useState<QueryStatus>(
    queryStatusInStorage
      ? JSON.parse(queryStatusInStorage)
      : {
          limit: 6,
          page: 1,
          total: 0,
        }
  );
  const [enabledSources, setEnabledSources] = useState<string[]>(
    enabledSourcesInStorage ? JSON.parse(enabledSourcesInStorage) : []
  );
  const fetchNews = () => {
    const newsSource = newsSources["NewsAPI"];
    return axios
      .get(
        `${newsSource.url}?sources=${enabledSources.toString()}&pageSize=${
          queryStatus.limit
        }&page=${queryStatus.page}&apiKey=${newsSource.apiKey}`
      )
      .then((result) => {
        if (result.status == 200) {
          const aggregatedResult = {
            NewsAPI: result.data.articles,
          };

          setQueryStatus({
            ...queryStatus,
            total: result.data.totalResults,
          });

          if (aggregatedResult.NewsAPI && aggregatedResult.NewsAPI.length > 0) {
            const news: News[] = [];
            aggregatedResult.NewsAPI.forEach(
              (newsAPIResult: {
                title: string;
                description: string;
                publishedAt: string | number | Date;
                author: string;
                source: { name: string };
                url: string;
                urlToImage: string;
              }) => {
                news.push({
                  title: newsAPIResult.title,
                  description: newsAPIResult.description || "",
                  createdAt: new Date(newsAPIResult.publishedAt),
                  author: newsAPIResult.author || "",
                  source: newsAPIResult.source.name || "",
                  url: newsAPIResult.url || "",
                  image: newsAPIResult.urlToImage || defaultImg,
                });
              }
            );
            return news;
          }
        }

        return [];
      });
  };

  const fetchSources = () => {
    const newsSource = newsSources["NewsAPI"];
    return axios
      .get(
        `${newsSource.url}sources?country=us&language=en&apiKey=${newsSource.apiKey}`
      )
      .then((result) => {
        if (result.status == 200) {
          const fetchedSources: Source[] = result.data.sources.map(
            (sourceData: { id: string; name: string }) => {
              return {
                id: sourceData.id,
                name: sourceData.name,
              };
            }
          );

          if (!enabledSourcesInStorage) {
            const newEnabledSources = fetchedSources.map((fetchedSource) => {
              return fetchedSource.id;
            });
            if (newEnabledSources && newEnabledSources.length > 0) {
              localStorage.setItem(
                enabledSourcesStorageKey,
                JSON.stringify(newEnabledSources)
              );
            }
          }

          return fetchedSources;
        }

        return [];
      });
  };
  const newsQueryResult = useQuery<News[]>({
    queryKey: ["NEWS", queryStatus.page, enabledSources],
    queryFn: fetchNews,
    staleTime: 60 * 1000,
  });
  const sources = useQuery<Source[]>({
    queryKey: ["SOURCES"],
    queryFn: fetchSources,
    staleTime: 600 * 1000,
  });

  useEffect(() => {
    localStorage.setItem(queryStatusStorageKey, JSON.stringify(queryStatus));
  }, [queryStatus]);

  const nextPage = () => {
    if (queryStatus.limit * queryStatus.page < queryStatus.total) {
      setQueryStatus({
        ...queryStatus,
        page: queryStatus.page + 1,
      });
    }
  };
  const prevPage = () => {
    if (queryStatus.page > 1) {
      setQueryStatus({
        ...queryStatus,
        page: queryStatus.page - 1,
      });
    }
  };

  const modifySource = (sourceID: string) => {
    let newSources: string[];
    if (enabledSources.includes(sourceID)) {
      newSources = enabledSources.filter((val) => val !== sourceID);
    } else {
      newSources = [...enabledSources, sourceID];
    }
    localStorage.setItem(enabledSourcesStorageKey, JSON.stringify(newSources));
    setEnabledSources(newSources);
  };

  return {
    newsQueryResult,
    queryStatus,
    prevPage,
    nextPage,
    sources,
    enabledSources,
    modifySource,
  };
}

export { useNews, type News, type QueryStatus };
