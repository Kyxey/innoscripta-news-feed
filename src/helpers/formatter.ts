import type { NewsSources } from "const/news";

function urlFormatter(
  type: NewsSources,
  config: {
    baseURL: string;
    apiKey: string;
    sources: string[];
    searchQuery: string;
    queryStatus: {
      limit: number;
      page: number;
    };
    filters: {
      date: {
        from: Date | null;
        to: Date | null;
      };
      category: string;
    };
  }
) {
  switch (type) {
    case "NewsAPI":
      return `${config.baseURL}?${
        config.filters.category !== "all"
          ? `category=${config.filters.category}`
          : `sources=${config.sources.toString()}`
      }&${
        config.searchQuery ? `q=${encodeURI(config.searchQuery)}&` : ""
      }pageSize=${config.queryStatus.limit}&page=${config.queryStatus.page}&${
        config.filters.date.from
          ? `from=${config.filters.date.from.toISOString()}&`
          : ""
      }${
        config.filters.date.to
          ? `to=${config.filters.date.to.toISOString()}&`
          : ""
      }apiKey=${config.apiKey}`;

    case "NEWSSOURCE2":
      // TODO:
      return `${config.baseURL}?sources=${config.sources.toString()}&${
        config.searchQuery ? `q=${encodeURI(config.searchQuery)}&` : ""
      }pageSize=${config.queryStatus.limit}&page=${config.queryStatus.page}&${
        config.filters.date.from
          ? `from=${config.filters.date.from.toISOString()}&`
          : ""
      }${
        config.filters.date.to
          ? `to=${config.filters.date.to.toISOString()}&`
          : ""
      }apiKey=${config.apiKey}`;

    case "NEWSSOURCE3":
      // TODO:
      return `${config.baseURL}?sources=${config.sources.toString()}&${
        config.searchQuery ? `q=${encodeURI(config.searchQuery)}&` : ""
      }pageSize=${config.queryStatus.limit}&page=${config.queryStatus.page}&${
        config.filters.date.from
          ? `from=${config.filters.date.from.toISOString()}&`
          : ""
      }${
        config.filters.date.to
          ? `to=${config.filters.date.to.toISOString()}&`
          : ""
      }apiKey=${config.apiKey}`;
  }
}

export { urlFormatter };
