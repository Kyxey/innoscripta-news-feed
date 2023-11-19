import type { NewsSources } from "const/news";
import type { DateFilters } from "types";

type Config = {
  baseURL: string;
  apiKey: string;
  sources: string[];
  searchQuery: string;
  queryStatus: {
    limit: number;
    page: number;
  };
  filters: {
    date: DateFilters;
    category: string;
  };
};
type Formatters = {
  [key in NewsSources]: (
    config: Config,
    categoryString: string,
    dateRangeString: string,
    apiKeyString: string,
    pageSizeString: string,
    sourcesString: string
  ) => string;
};
type CategoryFormatters = {
  [key in NewsSources]: (
    config: Pick<Config, "filters" | "sources">,
    isCategoryNeeded: boolean
  ) => string;
};
type DateRangeFormatters = {
  [key in NewsSources]: (dateFilters: DateFilters) => string;
};
type APIKeyFormatters = {
  [key in NewsSources]: (apiKey: string) => string;
};
type PageFormatter = (pageNumber: number) => string;
type PageSizeFormatters = {
  [key in NewsSources]: (pageSize: number) => string;
};
type SearchQueryFormatter = (searchQuery: string) => string;
type SourcesFormatters = {
  [key in NewsSources]: (
    sources: string[],
    isCategoryNeeded: boolean
  ) => string;
};

const sourcesFormatters: SourcesFormatters = {
  NewsAPI: (sources, isCategoryNeeded) =>
    isCategoryNeeded ? "" : `sources=${sources}`,
  TheGuardianAPI: (sources) =>
    sources.length > 0 ? `production-office=${sources.join("|")}&` : "",
  NewYorkTimesAPI: (sources, isCategoryNeeded) =>
    sources.length > 0
      ? `source:(${sources.join(", ")})${isCategoryNeeded ? " AND " : ""} `
      : "",
};

const searchQueryFormatter: SearchQueryFormatter = (searchQuery) =>
  searchQuery ? `q=${encodeURI(searchQuery)}&` : "";

const pageSizeFormatters: PageSizeFormatters = {
  NewsAPI: (pageSize) => `pageSize=${pageSize}`,
  TheGuardianAPI: (pageSize) => `page-size=${pageSize}`,
  NewYorkTimesAPI:
    // NewYorkTimes API doesn't allow page limits
    () => ``,
};

const apiKeyFormatters: APIKeyFormatters = {
  NewsAPI: (apiKey) => `apiKey=${apiKey}`,
  TheGuardianAPI: (apiKey) => `api-key=${apiKey}`,
  NewYorkTimesAPI: (apiKey) => `api-key=${apiKey}`,
};

const pageFormatter: PageFormatter = (pageNumber) => `page=${pageNumber}`;

const dateRangeFormatters: DateRangeFormatters = {
  NewsAPI: (dateFilters) =>
    `${dateFilters.from ? `from=${dateFilters.from.toISOString()}&` : ""}${
      dateFilters.to ? `to=${dateFilters.to.toISOString()}&` : ""
    }`,
  TheGuardianAPI: (dateFilters) =>
    `${dateFilters.from ? `from-date=${dateFilters.from.toISOString()}&` : ""}${
      dateFilters.to ? `to-date=${dateFilters.to.toISOString()}&` : ""
    }`,
  NewYorkTimesAPI: (dateFilters) =>
    `${
      dateFilters.from
        ? `begin_date=${dateFilters.from
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "")}&`
        : ""
    }${
      dateFilters.to
        ? `end_date=${dateFilters.to
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "")}&`
        : ""
    }`,
};

const categoryFormatters: CategoryFormatters = {
  NewsAPI: (config, isCategoryNeeded) =>
    isCategoryNeeded ? `category=${config.filters.category.toLowerCase()}` : "",
  TheGuardianAPI: (config, isCategoryNeeded) =>
    isCategoryNeeded ? `section=${config.filters.category.toLowerCase()}&` : "",
  NewYorkTimesAPI: (config, isCategoryNeeded) =>
    isCategoryNeeded ? `news_desk:("${config.filters.category}")` : "",
};

const formatters: Formatters = {
  NewsAPI: (
    config,
    categoryString,
    dateRangeString,
    apiKeyString,
    pageSizeString,
    sourcesString
  ) =>
    `${config.baseURL}?${
      // NewsAPI doesn't allow both filters. Either one should be used
      categoryString || sourcesString
    }&${searchQueryFormatter(
      config.searchQuery
    )}${pageSizeString}&${pageFormatter(
      config.queryStatus.page
    )}&${dateRangeString}${apiKeyString}`,
  TheGuardianAPI: (
    config,
    categoryString,
    dateRangeString,
    apiKeyString,
    pageSizeString,
    sourcesString
  ) =>
    `${config.baseURL}?${sourcesString}${categoryString}${searchQueryFormatter(
      config.searchQuery
    )}${pageSizeString}&${pageFormatter(
      config.queryStatus.page
    )}&show-fields=shortUrl,byline,thumbnail,productionOffice&${dateRangeString}${apiKeyString}`,
  NewYorkTimesAPI: (
    config,
    categoryString,
    dateRangeString,
    apiKeyString,
    pageSizeString,
    sourcesString
  ) =>
    `${config.baseURL}?${
      sourcesString || categoryString
        ? `fq=${sourcesString}${categoryString}&`
        : ""
    }${searchQueryFormatter(
      config.searchQuery
    )}${pageSizeString}${pageFormatter(
      config.queryStatus.page
    )}&${dateRangeString}sort=newest&${apiKeyString}`,
};

function urlFormatter(type: NewsSources, config: Config) {
  const isCategoryNeeded =
    config.filters.category !== "" &&
    config.filters.category.toLowerCase() !== "all";

  const categoryString = categoryFormatters[type](
    {
      filters: config.filters,
      sources: config.sources,
    },
    isCategoryNeeded
  );
  const dateRangeString = dateRangeFormatters[type](config.filters.date);
  const apiKeyString = apiKeyFormatters[type](config.apiKey);
  const pageSizeString = pageSizeFormatters[type](config.queryStatus.limit);
  const sourcesString = sourcesFormatters[type](
    config.sources,
    isCategoryNeeded
  );

  return formatters[type](
    config,
    categoryString,
    dateRangeString,
    apiKeyString,
    pageSizeString,
    sourcesString
  );
}

export { urlFormatter };
