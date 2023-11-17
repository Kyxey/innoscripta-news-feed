const newsSources = {
  NewsAPI: {
    friendlyName: "News API",
    url: "https://newsapi.org/v2/top-headlines/",
    apiKey: "41802f21fb844cd3857ff86d1867b10e",
    categories: [
      "All",
      "Business",
      "Entertainment",
      "General",
      "Health",
      "Science",
      "Sports",
      "Technology",
    ],
  },
  NEWSSOURCE2: {
    friendlyName: "NEWSSOURCE2",
    url: "www.exmaple2.com",
    apiKey: "",
    categories: [],
  },
  NEWSSOURCE3: {
    friendlyName: "NEWSSOURCE3",
    url: "www.exmaple3.com",
    apiKey: "",
    categories: [],
  },
} as const;

type NewsSources = keyof typeof newsSources;

export { newsSources, type NewsSources };
