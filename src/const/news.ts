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
  TheGuardianAPI: {
    friendlyName: "The Guardian",
    url: "https://content.guardianapis.com/search",
    apiKey: "491736bc-c681-4410-af41-bfe41ebf000d",
    categories: [
      "All",
      "Business",
      "Education",
      "Games",
      "Culture",
      "Science",
      "Sport",
      "Technology",
    ],
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
