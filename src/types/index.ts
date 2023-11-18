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

export type { Source, News, QueryStatus, DateFilters };
