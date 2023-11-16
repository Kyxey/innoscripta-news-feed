import Header from "components/Header";
import { useNews, News } from "./useNews";
import type { UseQueryResult } from "@tanstack/react-query";
import Card from "components/Card";
import Error from "components/Error";
import Loading from "components/Loading";
import SearchNotFound from "components/SearchNotFound";

function News() {
  const { newsQueryResult } = useNews();
  const renderCards = (news: News[]) => {
    if (news.length > 0) {
      return news.map((newsItem) => {
        // TODO:
        newsItem;
        return (
          <Card
            imageLink="https://picsum.photos/800"
            title="News 1"
            url="https://google.com"
            description="This is the full description."
            author="Ali Azizjahan"
            date={new Date()}
            category="Horror"
            source="KYXEY News"
          />
        );
      });
    }
    return null;
  };

  const processResult = (queryResult: UseQueryResult<News[]>) => {
    if (queryResult.isSuccess) {
      if (queryResult.data && queryResult.data.length > 0) {
        return renderCards(queryResult.data);
      }

      return <SearchNotFound />;
    } else if (
      queryResult.isError ||
      queryResult.isLoadingError ||
      queryResult.isRefetchError
    ) {
      return <Error />;
    } else if (
      queryResult.isRefetching ||
      queryResult.isLoading ||
      queryResult.isFetching ||
      queryResult.isPending
    ) {
      return <Loading />;
    }
  };

  return (
    <div className="w-full h-full">
      <Header />
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 pt-28">
        <div></div>
        <div className="flex flex-col space-y-4">
          {processResult(newsQueryResult)}
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default News;
