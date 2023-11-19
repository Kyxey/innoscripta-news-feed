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
        from?: Date;
        to?: Date;
      };
      category: string;
    };
  }
) {
  let srcs = "",
    fq = "";
  const isCategoryNeeded = config.filters.category.toLowerCase() !== "all";

  switch (type) {
    case "NewsAPI":
      return `${config.baseURL}?${
        isCategoryNeeded
          ? `category=${config.filters.category.toLowerCase()}`
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

    case "TheGuardianAPI":
      return `${config.baseURL}?${
        config.sources.length > 0
          ? `production-office=${config.sources.join("|").toString()}&`
          : ""
      }${
        isCategoryNeeded
          ? `section=${config.filters.category.toLowerCase()}&`
          : ""
      }${
        config.searchQuery ? `q=${encodeURI(config.searchQuery)}&` : ""
      }page-size=${config.queryStatus.limit}&page=${
        config.queryStatus.page
      }&show-fields=shortUrl,byline,thumbnail,productionOffice&${
        config.filters.date.from
          ? `from-date=${config.filters.date.from.toISOString()}&`
          : ""
      }${
        config.filters.date.to
          ? `to-date=${config.filters.date.to.toISOString()}&`
          : ""
      }api-key=${config.apiKey}`;

    case "NewYorkTimesAPI":
      config.sources.forEach((eachSource, i) => {
        srcs += `"${eachSource}"${i === config.sources.length - 1 ? "" : ", "}`;
      });

      if (srcs || isCategoryNeeded) {
        if (srcs) {
          fq += `source:(${srcs})${isCategoryNeeded ? " AND " : ""} `;
        }

        if (isCategoryNeeded) {
          fq += `news_desk:("${config.filters.category}")`;
        }
      }

      return `${config.baseURL}?${
        srcs || config.filters.category ? `fq=${fq}&` : ""
      }${config.searchQuery ? `q=${encodeURI(config.searchQuery)}&` : ""}page=${
        config.queryStatus.page
      }&${
        config.filters.date.from
          ? `begin_date=${config.filters.date.from
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "")}&`
          : ""
      }${
        config.filters.date.to
          ? `end_date=${config.filters.date.to
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "")}&`
          : ""
      }sort=newest&api-key=${config.apiKey}`;
  }
}

export { urlFormatter };
