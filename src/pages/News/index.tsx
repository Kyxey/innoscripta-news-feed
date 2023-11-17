import Header from "components/Header";
import { useNews, News, QueryStatus } from "./useNews";
import type { UseQueryResult } from "@tanstack/react-query";
import Card from "components/Card";
import Error from "components/Error";
import Loading from "components/Loading";
import SearchNotFound from "components/SearchNotFound";
import Pagination from "components/Pagination";

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
        key={newsItem.title}
      />
    );
  });
};

const processResult = (
  queryResult: UseQueryResult<News[]>,
  queryStatus: QueryStatus,
  nextPage: () => void,
  prevPage: () => void
) => {
  if (queryResult.isSuccess) {
    if (queryResult.data) {
      return (
        <div className="flex flex-col space-y-4 mb-4">
          {renderCards(queryResult.data)}
          <Pagination
            currentPage={queryStatus.page}
            totalPages={Math.ceil(queryStatus.total / queryStatus.limit)}
            nextPageFn={nextPage}
            prevPageFn={prevPage}
          />
        </div>
      );
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
  const {
    newsQueryResult,
    queryStatus,
    nextPage,
    prevPage,
    sources,
    enabledSources,
    modifySource,
  } = useNews();

  return (
    <div className="w-full h-full">
      <Header />
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 pt-28">
        <div className="flex justify-center">
          <div className="text-left w-3/4 h-1/2 overflow-scroll border border-innoscripta rounded p-4">
            <details className="cursor-pointer text-2xl">
              <summary>Filters</summary>
              <details className="text-lg ml-2">
                <summary>Sources</summary>
                {sources.isSuccess &&
                  sources.data?.map((eachSource) => {
                    return (
                      <div
                        key={eachSource.id}
                        className="cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          className="mr-1 cursor-pointer"
                          name={eachSource.id}
                          value={eachSource.id}
                          checked={enabledSources.indexOf(eachSource.id) !== -1}
                          onChange={() => modifySource(eachSource.id)}
                        />
                        <label
                          onClick={() => modifySource(eachSource.id)}
                          className="cursor-pointer">
                          {eachSource.name}
                        </label>
                      </div>
                    );
                  })}
              </details>
            </details>
          </div>
        </div>
        {processResult(newsQueryResult, queryStatus, nextPage, prevPage)}
        <div></div>
      </section>
    </div>
  );
}

export default News;
