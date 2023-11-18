import { useEffect, useState, type KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsSources } from "const/news";
import axios from "axios";
import defaultImg from "assets/default-img.png";
import { urlFormatter } from "helpers/formatter";
import { storageKeys } from "const/storage";
import { useSettings } from "hooks/useSettings";
import { useFavorite } from "hooks/useFavorite";
import type { DateFilters, News, Source } from "types";

function useNews() {
  const {
    queryStatus,
    setQueryStatus,
    enabledSources,
    setEnabledSources,
    enabledSourcesInStorage,
    enabledCategory: enabledCategoryNewsAPI,
    setEnabledCategory: setEnabledCategoryNewsAPI,
    modifySource: modifySourceNewsAPI,
    resetQueryStatus: resetQueryStatusNewsAPI,
  } = useSettings(
    {
      queryStatusStorageKey: storageKeys.queryStatusStorageKey,
      enabledSourcesStorageKey: storageKeys.enabledSourcesStorageKey,
      enabledCategoryStorageKey: storageKeys.enabledCategoryNewsAPIStorageKey,
    },
    { sources: [], category: "all" }
  );
  const {
    queryStatus: theGuardianQueryStatus,
    setQueryStatus: setTheGuardianQueryStatus,
    enabledSources: enabledSourcesTheGuardian,
    enabledCategory: enabledCategoryTheGuardian,
    modifyCategory: modifyCategoryTheGuardian,
    modifySource: modifySourceTheGuardian,
    resetQueryStatus: resetQueryStatusTheGuardian,
  } = useSettings(
    {
      queryStatusStorageKey: storageKeys.theGuardianQueryStatusStorageKey,
      enabledSourcesStorageKey: storageKeys.enabledSourcesTheGuardianStorageKey,
      enabledCategoryStorageKey:
        storageKeys.enabledCategoryTheGuardianStorageKey,
    },
    {
      sources: newsSources.TheGuardianAPI.sources.map(
        (eachSource) => eachSource.id
      ),
      category: "all",
    }
  );
  const {
    queryStatus: newYorkTimesQueryStatus,
    setQueryStatus: setNewYorkTimesQueryStatus,
    enabledSources: enabledSourcesNewYorkTimes,
    enabledCategory: enabledCategoryNewYorkTimes,
    modifyCategory: modifyCategoryNewYorkTimes,
    modifySource: modifySourceNewYorkTimes,
    resetQueryStatus: resetQueryStatusNewYorkTimes,
  } = useSettings(
    {
      queryStatusStorageKey: storageKeys.newYorkTimesQueryStatusStorageKey,
      enabledSourcesStorageKey:
        storageKeys.enabledSourcesNewYorkTimesStorageKey,
      enabledCategoryStorageKey:
        storageKeys.enabledCategoryNewYorkTimesStorageKey,
    },
    {
      sources: newsSources.NewYorkTimesAPI.sources.map(
        (eachSource) => eachSource.id
      ),
      category: "All",
    }
  );
  const {
    favoriteAuthors,
    favoriteSources,
    modifyFavoriteSources,
    modifyFavoriteAuthors,
  } = useFavorite({
    favoriteAuthorsStorageKey: storageKeys.favoriteAuthorsStorageKey,
    favoriteSourcesStorageKey: storageKeys.favoriteSourcesStorageKey,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryForKey, setSearchQueryForKey] = useState<string>("");
  const [dateFilters, setDateFilters] = useState<DateFilters>({
    from: null,
    to: null,
  });

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
                storageKeys.enabledSourcesStorageKey,
                JSON.stringify(newEnabledSources)
              );
            }
          }

          return fetchedSources;
        }

        return [];
      });
  };
  const fetchNews = () => {
    if (enabledSources.length == 0) {
      resetQueryStatusNewsAPI();
      return [];
    }

    const newsSource = newsSources["NewsAPI"];
    return axios
      .get(
        urlFormatter("NewsAPI", {
          baseURL: newsSource.url,
          apiKey: newsSource.apiKey,
          sources: enabledSources,
          searchQuery: searchQueryForKey,
          queryStatus: {
            limit: queryStatus.limit,
            page: queryStatus.page,
          },
          filters: {
            date: {
              from: dateFilters.from,
              to: dateFilters.to,
            },
            category: enabledCategoryNewsAPI,
          },
        })
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
                publishedAt: string | number | Date;
                author: string;
                source: Source;
                url: string;
                urlToImage: string;
              }) => {
                news.push({
                  title: newsAPIResult.title,
                  createdAt: new Date(newsAPIResult.publishedAt),
                  author: newsAPIResult.author || "",
                  source: {
                    id: newsAPIResult.source.id || "",
                    name: newsAPIResult.source.name || "",
                  },
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
  const fetchGuardianNews = () => {
    const newsSource = newsSources["TheGuardianAPI"];
    return axios
      .get(
        urlFormatter("TheGuardianAPI", {
          baseURL: newsSource.url,
          apiKey: newsSource.apiKey,
          sources: enabledSourcesTheGuardian,
          searchQuery: searchQueryForKey,
          queryStatus: {
            limit: theGuardianQueryStatus.limit,
            page: theGuardianQueryStatus.page,
          },
          filters: {
            date: {
              from: dateFilters.from,
              to: dateFilters.to,
            },
            category: enabledCategoryTheGuardian,
          },
        })
      )
      .then((result) => {
        if (result.status == 200) {
          const aggregatedResult = {
            news: result.data.response.results,
          };

          setTheGuardianQueryStatus({
            ...theGuardianQueryStatus,
            total: parseInt(result.data.response.total) || 1,
          });

          if (aggregatedResult.news && aggregatedResult.news.length > 0) {
            const news: News[] = [];
            aggregatedResult.news.forEach(
              (newsAPIResult: {
                webTitle: string;
                webPublicationDate: string | number | Date;
                fields: {
                  byline: string;
                  productionOffice: string;
                  shortUrl: string;
                  thumbnail: string;
                };
              }) => {
                const newSource = {
                  id: newsAPIResult.fields.productionOffice.toLowerCase(),
                  name: `The Guardian ${newsAPIResult.fields.productionOffice}`,
                };
                news.push({
                  title: newsAPIResult.webTitle,
                  createdAt: new Date(newsAPIResult.webPublicationDate),
                  author: newsAPIResult.fields.byline || "",
                  source: newSource,
                  url: newsAPIResult.fields.shortUrl || "",
                  image: newsAPIResult.fields.thumbnail || defaultImg,
                });
              }
            );
            return news;
          }
        }

        return [];
      });
  };
  const fetchNewYorkTimesNews = () => {
    const newsSource = newsSources["NewYorkTimesAPI"];
    return axios
      .get(
        urlFormatter("NewYorkTimesAPI", {
          baseURL: newsSource.url,
          apiKey: newsSource.apiKey,
          sources: enabledSourcesNewYorkTimes,
          searchQuery: searchQueryForKey,
          queryStatus: {
            limit: newYorkTimesQueryStatus.limit,
            page: newYorkTimesQueryStatus.page,
          },
          filters: {
            date: {
              from: dateFilters.from,
              to: dateFilters.to,
            },
            category: enabledCategoryNewYorkTimes,
          },
        })
      )
      .then((result) => {
        if (result.status == 200) {
          const aggregatedResult = {
            news: result.data.response.docs,
          };

          setNewYorkTimesQueryStatus({
            ...newYorkTimesQueryStatus,
            total: parseInt(result.data.response.meta.hits) || 1,
          });

          if (aggregatedResult.news && aggregatedResult.news.length > 0) {
            const news: News[] = [];
            aggregatedResult.news.forEach(
              (newsAPIResult: {
                source: string;
                headline: { main: string };
                pub_date: string | number | Date;
                byline: {
                  original: string;
                };
                web_url: string;
                multimedia: { url: string }[];
              }) => {
                const newSource = {
                  id: newsAPIResult.source,
                  name: newsAPIResult.source,
                };
                news.push({
                  title: newsAPIResult.headline.main,
                  createdAt: new Date(newsAPIResult.pub_date),
                  author: newsAPIResult.byline.original
                    ? newsAPIResult.byline.original.replace("By ", "")
                    : newsAPIResult.source,
                  source: newSource,
                  url: newsAPIResult.web_url || "",
                  image:
                    newsAPIResult.multimedia.length > 0
                      ? `https://www.nytimes.com/${newsAPIResult.multimedia[0].url}`
                      : defaultImg,
                });
              }
            );

            return news;
          }
        }

        return [];
      });
  };

  const sources = useQuery<Source[]>({
    queryKey: ["SOURCES"],
    queryFn: fetchSources,
    staleTime: 600 * 1000,
  });
  const newsQueryResult = useQuery<News[]>({
    queryKey: [
      "NEWSAPI",
      queryStatus.page,
      enabledSources,
      searchQueryForKey,
      dateFilters,
      enabledCategoryNewsAPI,
    ],
    queryFn: fetchNews,
    staleTime: 60 * 1000,
  });
  const theGuardianNewsQueryResult = useQuery<News[]>({
    queryKey: [
      "THEGUARDIANAPI",
      theGuardianQueryStatus.page,
      enabledSourcesTheGuardian,
      searchQueryForKey,
      dateFilters,
      enabledCategoryTheGuardian,
    ],
    queryFn: fetchGuardianNews,
    staleTime: 60 * 1000,
  });
  const newYorkTimesNewsQueryResult = useQuery<News[]>({
    queryKey: [
      "NEWYORKTIMESAPI",
      newYorkTimesQueryStatus.page,
      enabledSourcesNewYorkTimes,
      searchQueryForKey,
      dateFilters,
      enabledCategoryNewYorkTimes,
    ],
    queryFn: fetchNewYorkTimesNews,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    setEnabledCategoryNewsAPI("all");
    if (enabledCategoryNewsAPI !== "all") {
      setEnabledSources([]);
    }
  }, [
    setEnabledCategoryNewsAPI,
    enabledSources,
    enabledCategoryNewsAPI,
    setEnabledSources,
  ]);

  const modifyCategoryNewsAPI = (category: string) => {
    const categoryID = category.toLowerCase();
    setEnabledCategoryNewsAPI(categoryID);

    resetQueryStatusNewsAPI();
  };

  const searchQueryOnChange = (newText: string) => {
    setSearchQuery(newText);
  };

  const handleSearchQuerySubmit = (el: KeyboardEvent<HTMLInputElement>) => {
    if (el.key == "Enter") {
      setSearchQueryForKey(searchQuery);
      resetQueryStatusNewsAPI();
      resetQueryStatusTheGuardian();
      resetQueryStatusNewYorkTimes();
    }
  };

  const modifyDateFilters = (type: keyof DateFilters, newDate: Date | null) => {
    const newDates: DateFilters = { ...dateFilters };
    newDates[type] = newDate;
    setDateFilters(newDates);
    resetQueryStatusNewsAPI();
    resetQueryStatusTheGuardian();
    resetQueryStatusNewYorkTimes();
  };

  return {
    newsQueryResult,
    queryStatus,
    sources,
    enabledSources,
    searchQuery,
    searchQueryOnChange,
    searchQueryForKey,
    handleSearchQuerySubmit,
    dateFilters,
    modifyDateFilters,
    enabledCategoryNewsAPI,
    modifyCategoryNewsAPI,
    favoriteAuthors,
    modifyFavoriteAuthors,
    favoriteSources,
    modifyFavoriteSources,
    theGuardianNewsQueryResult,
    theGuardianQueryStatus,
    enabledCategoryTheGuardian,
    modifyCategoryTheGuardian,
    enabledSourcesTheGuardian,
    newYorkTimesNewsQueryResult,
    newYorkTimesQueryStatus,
    enabledCategoryNewYorkTimes,
    modifyCategoryNewYorkTimes,
    enabledSourcesNewYorkTimes,
    setQueryStatus,
    setTheGuardianQueryStatus,
    setNewYorkTimesQueryStatus,
    modifySourceNewsAPI,
    modifySourceTheGuardian,
    modifySourceNewYorkTimes,
  };
}

export { useNews };
