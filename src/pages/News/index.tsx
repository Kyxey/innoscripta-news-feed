import Header from "components/Header";
import { useNews, News } from "./useNews";
import type { UseQueryResult } from "@tanstack/react-query";
import Card from "components/Card";
import Error from "components/Error";
import Loading from "components/Loading";
import SearchNotFound from "components/SearchNotFound";

const renderCards = (news: News[]) => {
  return news.map((newsItem) => {
    return (
      <Card
        imageLink={newsItem.image}
        title={newsItem.title}
        url={newsItem.url}
        description={newsItem.description}
        author={newsItem.author}
        date={new Date(newsItem.createdAt)}
        source={newsItem.source}
      />
    );
  });
};

const processResult = (queryResult: UseQueryResult<News[]>) => {
  if (queryResult.isSuccess) {
    if (queryResult.data) {
      console.log(queryResult.data.length, queryResult.data[0]);
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

function News() {
  const { newsQueryResult } = useNews();

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
