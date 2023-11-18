import type { KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsSources } from "const/news";
import axios from "axios";
import defaultImg from "assets/default-img.png";
import { useEffect, useState, useMemo } from "react";
import { urlFormatter } from "helpers/formatter";

type Source = {
  id: string;
  name: string;
};

type News = {
  title: string;
  createdAt: Date;
  author: string;
  source: Source;
  url: string;
  image: string;
};

type QueryStatus = {
  total: number;
  page: number;
  limit: number;
};

type DateFilters = {
  from: Date | null;
  to: Date | null;
};

function useNews() {
  const queryStatusStorageKey = "NewsQStatus";
  const queryStatusInStorage = localStorage.getItem(queryStatusStorageKey);
  const theGuardianQueryStatusStorageKey = "TheGuardianNewsQStatus";
  const theGuardianQueryStatusInStorage = localStorage.getItem(
    theGuardianQueryStatusStorageKey
  );
  const enabledSourcesStorageKey = "NewsSources";
  const enabledSourcesInStorage = localStorage.getItem(
    enabledSourcesStorageKey
  );
  const enabledSourcesTheGuardianStorageKey = "TheGuardianNewsSources";
  const enabledSourcesTheGuardianInStorage = localStorage.getItem(
    enabledSourcesTheGuardianStorageKey
  );
  const enabledCategoryNewsAPIStorageKey = "NewsAPI-News-Categories";
  const enabledCategoryNewsAPIInStorage = localStorage.getItem(
    enabledCategoryNewsAPIStorageKey
  );
  const enabledCategoryTheGuardianStorageKey = "Guardian-News-Categories";
  const enabledCategoryTheGuardianInStorage = localStorage.getItem(
    enabledCategoryTheGuardianStorageKey
  );
  const favoriteAuthorsStorageKey = "My-Feed-Favorite-Authors";
  const favoriteAuthorsInStorage = localStorage.getItem(
    favoriteAuthorsStorageKey
  );
  const favoriteSourcesStorageKey = "My-Feed-Favorite-Sources";
  const favoriteSourcesInStorage = localStorage.getItem(
    favoriteSourcesStorageKey
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
  const [theGuardianQueryStatus, setTheGuardianQueryStatus] =
    useState<QueryStatus>(
      theGuardianQueryStatusInStorage
        ? JSON.parse(theGuardianQueryStatusInStorage)
        : {
            limit: 6,
            page: 1,
            total: 0,
          }
    );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryForKey, setSearchQueryForKey] = useState<string>("");
  const [dateFilters, setDateFilters] = useState<DateFilters>({
    from: null,
    to: null,
  });
  const [enabledSources, setEnabledSources] = useState<string[]>(
    enabledSourcesInStorage ? JSON.parse(enabledSourcesInStorage) : []
  );
  const theGuardianSources = useMemo(
    () => [
      {
        id: "uk",
        name: "The Guardian UK",
      },
      {
        id: "us",
        name: "The Guardian US",
      },
      {
        id: "aus",
        name: "The Guardian Australia",
      },
    ],
    []
  );
  const [enabledSourcesTheGuardian, setEnabledSourcesTheGuardian] = useState<
    string[]
  >(
    enabledSourcesTheGuardianInStorage
      ? JSON.parse(enabledSourcesTheGuardianInStorage)
      : theGuardianSources.map((eachSource) => eachSource.id)
  );
  const [enabledCategoryNewsAPI, setEnabledCategoryNewsAPI] = useState<string>(
    enabledCategoryNewsAPIInStorage ? enabledCategoryNewsAPIInStorage : "all"
  );
  const [enabledCategoryTheGuardian, setEnabledCategoryTheGuardian] =
    useState<string>(
      enabledCategoryTheGuardianInStorage
        ? enabledCategoryTheGuardianInStorage
        : "all"
    );
  const [favoriteSources, setFavoriteSources] = useState<Source[]>(
    favoriteSourcesInStorage ? JSON.parse(favoriteSourcesInStorage) : []
  );
  const [favoriteAuthors, setFavoriteAuthors] = useState<string[]>(
    favoriteAuthorsInStorage ? JSON.parse(favoriteAuthorsInStorage) : []
  );

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
  const fetchNews = () => {
    if (enabledSources.length == 0) {
      setQueryStatus({
        ...queryStatus,
        page: 1,
        total: 0,
      });
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

  useEffect(() => {
    localStorage.setItem(queryStatusStorageKey, JSON.stringify(queryStatus));
  }, [queryStatus]);
  useEffect(() => {
    if (enabledSources.length > 0) {
      localStorage.setItem(
        enabledSourcesStorageKey,
        JSON.stringify(enabledSources)
      );
    } else {
      localStorage.removeItem(enabledSourcesStorageKey);
    }
  }, [enabledSources]);
  useEffect(() => {
    localStorage.setItem(
      enabledCategoryNewsAPIStorageKey,
      enabledCategoryNewsAPI
    );
  }, [enabledCategoryNewsAPI]);
  useEffect(() => {
    localStorage.setItem(
      theGuardianQueryStatusStorageKey,
      JSON.stringify(theGuardianQueryStatus)
    );
  }, [theGuardianQueryStatus]);
  useEffect(() => {
    localStorage.setItem(
      enabledCategoryTheGuardianStorageKey,
      enabledCategoryTheGuardian
    );
  }, [enabledCategoryTheGuardian]);
  useEffect(() => {
    if (!enabledSourcesTheGuardianInStorage) {
      const newEnabledSources = theGuardianSources.map((fetchedSource) => {
        return fetchedSource.id;
      });
      if (newEnabledSources && newEnabledSources.length > 0) {
        localStorage.setItem(
          enabledSourcesTheGuardianStorageKey,
          JSON.stringify(newEnabledSources)
        );
      }
    }
  }, [
    theGuardianSources,
    enabledSourcesTheGuardianInStorage,
    enabledSourcesTheGuardianStorageKey,
  ]);
  useEffect(() => {
    localStorage.setItem(
      enabledSourcesTheGuardianStorageKey,
      JSON.stringify(enabledSourcesTheGuardian)
    );
  }, [enabledSourcesTheGuardian]);
  useEffect(() => {
    localStorage.setItem(
      favoriteSourcesStorageKey,
      JSON.stringify(favoriteSources)
    );
  }, [favoriteSources]);
  useEffect(() => {
    localStorage.setItem(
      favoriteAuthorsStorageKey,
      JSON.stringify(favoriteAuthors)
    );
  }, [favoriteAuthors]);

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
    setEnabledSources(newSources);
    setEnabledCategoryNewsAPI("all");
    setQueryStatus({
      ...queryStatus,
      page: 1,
      total: 0,
    });
  };

  const modifyCategoryNewsAPI = (category: string) => {
    const categoryID = category.toLowerCase();
    setEnabledCategoryNewsAPI(categoryID);

    if (categoryID !== "all") {
      setEnabledSources([]);
    }

    setQueryStatus({
      ...queryStatus,
      page: 1,
      total: 0,
    });
  };

  const nextPageTheGuardian = () => {
    if (
      theGuardianQueryStatus.limit * theGuardianQueryStatus.page <
      theGuardianQueryStatus.total
    ) {
      setTheGuardianQueryStatus({
        ...theGuardianQueryStatus,
        page: theGuardianQueryStatus.page + 1,
      });
    }
  };
  const prevPageTheGuardian = () => {
    if (theGuardianQueryStatus.page > 1) {
      setTheGuardianQueryStatus({
        ...theGuardianQueryStatus,
        page: theGuardianQueryStatus.page - 1,
      });
    }
  };
  const modifySourceTheGuardian = (sourceID: string) => {
    let newSources: string[];
    if (enabledSourcesTheGuardian.includes(sourceID)) {
      newSources = enabledSourcesTheGuardian.filter((val) => val !== sourceID);
    } else {
      newSources = [...enabledSourcesTheGuardian, sourceID];
    }
    setEnabledSourcesTheGuardian(newSources);
    setTheGuardianQueryStatus({
      ...theGuardianQueryStatus,
      page: 1,
      total: 0,
    });
  };
  const modifyCategoryTheGuardian = (category: string) => {
    const categoryID = category.toLowerCase();
    setEnabledCategoryTheGuardian(categoryID);

    setTheGuardianQueryStatus({
      ...theGuardianQueryStatus,
      page: 1,
      total: 0,
    });
  };

  const searchQueryOnChange = (newText: string) => {
    setSearchQuery(newText);
  };

  const handleSearchQuerySubmit = (el: KeyboardEvent<HTMLInputElement>) => {
    if (el.key == "Enter") {
      setSearchQueryForKey(searchQuery);
      setQueryStatus({
        ...queryStatus,
        page: 1,
        total: 0,
      });
      setTheGuardianQueryStatus({
        ...theGuardianQueryStatus,
        page: 1,
        total: 0,
      });
    }
  };

  const modifyDateFilters = (type: keyof DateFilters, newDate: Date | null) => {
    const newDates: DateFilters = { ...dateFilters };
    newDates[type] = newDate;

    setDateFilters(newDates);
  };

  const modifyFavoriteSources = (sourceInfo: Source) => {
    let newSources: Source[];
    if (
      favoriteSources.find(
        (favoriteSource) =>
          favoriteSource.id == sourceInfo.id ||
          favoriteSource.name == sourceInfo.name
      )
    ) {
      newSources = favoriteSources.filter(
        (favoriteSource) =>
          favoriteSource.id !== sourceInfo.id &&
          favoriteSource.name !== sourceInfo.name
      );
    } else {
      newSources = [...favoriteSources, sourceInfo];
    }
    setFavoriteSources(newSources);
  };
  const modifyFavoriteAuthors = (author: string) => {
    let newAuthors: string[];
    if (favoriteAuthors.includes(author)) {
      newAuthors = favoriteAuthors.filter(
        (favoriteAuthor) => favoriteAuthor !== author
      );
    } else {
      newAuthors = [...favoriteAuthors, author];
    }
    setFavoriteAuthors(newAuthors);
  };

  return {
    newsQueryResult,
    queryStatus,
    prevPage,
    nextPage,
    sources,
    enabledSources,
    modifySource,
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
    prevPageTheGuardian,
    nextPageTheGuardian,
    enabledCategoryTheGuardian,
    modifyCategoryTheGuardian,
    modifySourceTheGuardian,
    enabledSourcesTheGuardian,
    theGuardianSources,
  };
}

export { useNews, type News, type QueryStatus, type Source };
