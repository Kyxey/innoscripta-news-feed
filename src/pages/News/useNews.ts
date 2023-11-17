import { useQuery } from "@tanstack/react-query";
import { newsSources } from "const/news";
import axios from "axios";
import defaultImg from "assets/default-img.png";

type News = {
  title: string;
  description: string;
  createdAt: Date;
  author: string;
  source: string;
  url: string;
  image: string;
};

function useNews() {
  const fetchNews = () => {
    const newsSource = newsSources["NewsAPI"];
    return axios
      .get(
        `${newsSource.url}?category=general&country=de&apiKey=${newsSource.apiKey}`
      )
      .then((result) => {
        if (result.status == 200) {
          const aggregatedResult = {
            NewsAPI: result.data.articles,
          };

          if (aggregatedResult.NewsAPI && aggregatedResult.NewsAPI.length > 0) {
            const news: News[] = [];
            aggregatedResult.NewsAPI.forEach(
              (newsAPIResult: {
                title: string;
                description: string;
                publishedAt: string | number | Date;
                author: string;
                source: { name: string };
                url: string;
                urlToImage: string;
              }) => {
                news.push({
                  title: newsAPIResult.title,
                  description: newsAPIResult.description || "",
                  createdAt: new Date(newsAPIResult.publishedAt),
                  author: newsAPIResult.author || "",
                  source: newsAPIResult.source.name || "",
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
  const newsQueryResult = useQuery<News[]>({
    queryKey: ["NEWS"],
    queryFn: fetchNews,
  });

  return { newsQueryResult };
}

export { useNews, type News };
