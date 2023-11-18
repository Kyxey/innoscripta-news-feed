const newsSources = {
  NewsAPI: {
    friendlyName: "News API",
    url: "https://newsapi.org/v2/top-headlines/",
    apiKey: "41802f21fb844cd3857ff86d1867b10e",
    sources: [],
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
    sources: [
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
  NewYorkTimesAPI: {
    friendlyName: "New York Times",
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    apiKey: "zK9LZgGGI1iaNsAVWNxnMdY6AgzAUJZs",
    sources: [
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
    categories: [
      "All",
      "Arts",
      "Books",
      "Business",
      "Education",
      "Food",
      "Health",
    ],
  },
} as const;

type NewsSources = keyof typeof newsSources;

export { newsSources, type NewsSources };
