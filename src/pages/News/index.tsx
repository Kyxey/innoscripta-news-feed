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
        return <Card />;
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
    <div>
      <Header />
      {processResult(newsQueryResult)}
    </div>
  );
}

export default News;
