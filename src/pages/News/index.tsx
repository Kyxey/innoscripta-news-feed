import Header from "components/Header";
import { useNews, News, QueryStatus } from "./useNews";
import type { UseQueryResult } from "@tanstack/react-query";
import Card from "components/Card";
import Error from "components/Error";
import Loading from "components/Loading";
import SearchNotFound from "components/SearchNotFound";
import Pagination from "components/Pagination";
import Icon from "components/Icon";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  prevPage: () => void,
  searchQuery: string
) => {
  if (queryResult.isSuccess) {
    if (queryResult.data && queryResult.data.length > 0) {
      return (
        <div className="flex flex-col space-y-4 mb-4">
          {searchQuery !== "" && (
            <h1>
              {" "}
              Search results for: <i>"{searchQuery}</i>"
            </h1>
          )}
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
    searchQuery,
    searchQueryOnChange,
    searchQueryForKey,
    handleSearchQuerySubmit,
    dateFilters,
    modifyDateFilters,
  } = useNews();

  return (
    <div className="w-full h-full">
      <Header />
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 pt-28 min-h-full">
        <div className="flex justify-center">
          <div className="text-left w-3/4 h-1/2 overflow-scroll border border-innoscripta rounded p-4">
            <div className="relative text-gray-400 mb-2">
              <Tooltip
                id="search-bar"
                openEvents={{
                  mouseenter: true,
                  focus: true,
                  click: true,
                  dblclick: true,
                  mousedown: true,
                }}
                closeEvents={{
                  blur: true,
                  click: false,
                  dblclick: false,
                  mouseleave: false,
                  mouseup: false,
                }}
              />
              <div className="absolute ml-2 h-full w-7 flex justify-center">
                <Icon type="Search" />
              </div>
              <input
                className="w-full bg-white text-left pl-11 p-2 text-gray-600 border border-gray-400"
                type="text"
                value={searchQuery}
                onChange={(el) => searchQueryOnChange(el.target.value)}
                onKeyUp={handleSearchQuerySubmit}
                placeholder="Search..."
                title="Press enter after typing to search."
                data-tooltip-id="search-bar"
                data-tooltip-content="Press enter after typing to search."
              />
            </div>
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
              <details className="text-lg ml-2">
                <summary>Date</summary>
                <div className="cursor-pointer ml-4">
                  <div className="mb-2">
                    <label>From: </label>
                    <DatePicker
                      selected={dateFilters.from}
                      placeholderText="Select a date..."
                      onChange={(date) => modifyDateFilters("from", date)}
                      onSelect={(date) => modifyDateFilters("from", date)}
                      includeDateIntervals={[
                        {
                          start: new Date("1970/1/1"),
                          end: dateFilters.to || new Date(),
                        },
                      ]}
                      className="bg-white text-left p-1 text-gray-600 border border-gray-400"
                    />
                  </div>
                  <div>
                    <label>To: </label>
                    <DatePicker
                      selected={dateFilters.to}
                      placeholderText="Select a date..."
                      onChange={(date) => modifyDateFilters("to", date)}
                      onSelect={(date) => modifyDateFilters("to", date)}
                      includeDateIntervals={[
                        {
                          start: dateFilters.from || new Date("1970/1/1"),
                          end: new Date(),
                        },
                      ]}
                      className="bg-white text-left p-1 text-gray-600 border border-gray-400"
                    />
                  </div>
                </div>
              </details>
            </details>
          </div>
        </div>
        {processResult(
          newsQueryResult,
          queryStatus,
          nextPage,
          prevPage,
          searchQueryForKey
        )}
        <div></div>
      </section>
    </div>
  );
}

export default News;
