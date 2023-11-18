import type { KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsSources } from "const/news";
import axios from "axios";
import defaultImg from "assets/default-img.png";
import { useEffect, useState, useMemo } from "react";
import { urlFormatter } from "helpers/formatter";
import { storageKeys } from "const/storage";

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
  const queryStatusInStorage = localStorage.getItem(
    storageKeys.queryStatusStorageKey
  );
  const theGuardianQueryStatusInStorage = localStorage.getItem(
    storageKeys.theGuardianQueryStatusStorageKey
  );
  const newYorkTimesQueryStatusInStorage = localStorage.getItem(
    storageKeys.newYorkTimesQueryStatusStorageKey
  );
  const enabledSourcesInStorage = localStorage.getItem(
    storageKeys.enabledSourcesStorageKey
  );
  const enabledSourcesTheGuardianInStorage = localStorage.getItem(
    storageKeys.enabledSourcesTheGuardianStorageKey
  );
  const enabledSourcesNewYorkTimesInStorage = localStorage.getItem(
    storageKeys.enabledSourcesNewYorkTimesStorageKey
  );
  const enabledCategoryNewsAPIInStorage = localStorage.getItem(
    storageKeys.enabledCategoryNewsAPIStorageKey
  );
  const enabledCategoryTheGuardianInStorage = localStorage.getItem(
    storageKeys.enabledCategoryTheGuardianStorageKey
  );
  const enabledCategoryNewYorkTimesInStorage = localStorage.getItem(
    storageKeys.enabledCategoryNewYorkTimesStorageKey
  );
  const favoriteAuthorsInStorage = localStorage.getItem(
    storageKeys.favoriteAuthorsStorageKey
  );
  const favoriteSourcesInStorage = localStorage.getItem(
    storageKeys.favoriteSourcesStorageKey
  );

  const [queryStatus, setQueryStatus] = useState<QueryStatus>(
    queryStatusInStorage
      ? JSON.parse(queryStatusInStorage)
      : {
          limit: 10,
          page: 1,
          total: 0,
        }
  );
  const [theGuardianQueryStatus, setTheGuardianQueryStatus] =
    useState<QueryStatus>(
      theGuardianQueryStatusInStorage
        ? JSON.parse(theGuardianQueryStatusInStorage)
        : {
            limit: 10,
            page: 1,
            total: 0,
          }
    );
  const [newYorkTimesQueryStatus, setNewYorkTimesQueryStatus] =
    useState<QueryStatus>(
      newYorkTimesQueryStatusInStorage
        ? JSON.parse(newYorkTimesQueryStatusInStorage)
        : {
            limit: 10,
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
  const newYorkTimesSources = useMemo(
    () => [
      {
        id: "The New York Times",
        name: "The New York Times",
      },
      {
        id: "International New York Times",
        name: "International New York Times",
      },
      {
        id: "International Herald Tribune",
        name: "International Herald Tribune",
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
  const [enabledSourcesNewYorkTimes, setEnabledSourcesNewYorkTimes] = useState<
    string[]
  >(
    enabledSourcesNewYorkTimesInStorage
      ? JSON.parse(enabledSourcesNewYorkTimesInStorage)
      : newYorkTimesSources.map((eachSource) => eachSource.id)
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
  const [enabledCategoryNewYorkTimes, setEnabledCategoryNewYorkTimes] =
    useState<string>(
      enabledCategoryNewYorkTimesInStorage
        ? enabledCategoryNewYorkTimesInStorage
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
    localStorage.setItem(
      storageKeys.queryStatusStorageKey,
      JSON.stringify(queryStatus)
    );
  }, [queryStatus]);
  useEffect(() => {
    if (enabledSources.length > 0) {
      localStorage.setItem(
        storageKeys.enabledSourcesStorageKey,
        JSON.stringify(enabledSources)
      );
    } else {
      localStorage.removeItem(storageKeys.enabledSourcesStorageKey);
    }
  }, [enabledSources]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.enabledCategoryNewsAPIStorageKey,
      enabledCategoryNewsAPI
    );
  }, [enabledCategoryNewsAPI]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.theGuardianQueryStatusStorageKey,
      JSON.stringify(theGuardianQueryStatus)
    );
  }, [theGuardianQueryStatus]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.newYorkTimesQueryStatusStorageKey,
      JSON.stringify(newYorkTimesQueryStatus)
    );
  }, [newYorkTimesQueryStatus]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.enabledCategoryTheGuardianStorageKey,
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
          storageKeys.enabledSourcesTheGuardianStorageKey,
          JSON.stringify(newEnabledSources)
        );
      }
    }
  }, [theGuardianSources, enabledSourcesTheGuardianInStorage]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.enabledSourcesTheGuardianStorageKey,
      JSON.stringify(enabledSourcesTheGuardian)
    );
  }, [enabledSourcesTheGuardian]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.enabledCategoryNewYorkTimesStorageKey,
      enabledCategoryNewYorkTimes
    );
  }, [enabledCategoryNewYorkTimes]);
  useEffect(() => {
    if (!enabledSourcesNewYorkTimesInStorage) {
      const newEnabledSources = newYorkTimesSources.map((fetchedSource) => {
        return fetchedSource.id;
      });
      if (newEnabledSources && newEnabledSources.length > 0) {
        localStorage.setItem(
          storageKeys.enabledSourcesNewYorkTimesStorageKey,
          JSON.stringify(newEnabledSources)
        );
      }
    }
  }, [newYorkTimesSources, enabledSourcesNewYorkTimesInStorage]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.enabledSourcesNewYorkTimesStorageKey,
      JSON.stringify(enabledSourcesNewYorkTimes)
    );
  }, [enabledSourcesNewYorkTimes]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.favoriteSourcesStorageKey,
      JSON.stringify(favoriteSources)
    );
  }, [favoriteSources]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.favoriteAuthorsStorageKey,
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
  const nextPageNewYorkTimes = () => {
    if (
      newYorkTimesQueryStatus.limit * newYorkTimesQueryStatus.page <
      newYorkTimesQueryStatus.total
    ) {
      setNewYorkTimesQueryStatus({
        ...newYorkTimesQueryStatus,
        page: newYorkTimesQueryStatus.page + 1,
      });
    }
  };
  const prevPageNewYorkTimes = () => {
    if (newYorkTimesQueryStatus.page > 1) {
      setNewYorkTimesQueryStatus({
        ...newYorkTimesQueryStatus,
        page: newYorkTimesQueryStatus.page - 1,
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
  const modifySourceNewYorkTimes = (sourceID: string) => {
    let newSources: string[];
    if (enabledSourcesNewYorkTimes.includes(sourceID)) {
      newSources = enabledSourcesNewYorkTimes.filter((val) => val !== sourceID);
    } else {
      newSources = [...enabledSourcesNewYorkTimes, sourceID];
    }
    setEnabledSourcesNewYorkTimes(newSources);
    setNewYorkTimesQueryStatus({
      ...newYorkTimesQueryStatus,
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
  const modifyCategoryNewYorkTimes = (category: string) => {
    const categoryID = category;
    setEnabledCategoryNewYorkTimes(categoryID);

    setNewYorkTimesQueryStatus({
      ...newYorkTimesQueryStatus,
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
    newYorkTimesNewsQueryResult,
    newYorkTimesQueryStatus,
    prevPageNewYorkTimes,
    nextPageNewYorkTimes,
    enabledCategoryNewYorkTimes,
    modifyCategoryNewYorkTimes,
    modifySourceNewYorkTimes,
    enabledSourcesNewYorkTimes,
    newYorkTimesSources,
  };
}

export { useNews, type News, type QueryStatus, type Source };
