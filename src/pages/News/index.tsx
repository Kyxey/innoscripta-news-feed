import Header from "components/Header";
import { useNews } from "hooks/useNews";
import { usePagination } from "hooks/usePagination";
import type { UseQueryResult } from "@tanstack/react-query";
import type { News, QueryStatus, Source } from "types";
import Card from "components/Card";
import Error from "components/Error";
import Loading from "components/Loading";
import SearchNotFound from "components/SearchNotFound";
import Pagination from "components/Pagination";
import Icon from "components/Icon";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import { newsSources } from "const/news";
import "react-datepicker/dist/react-datepicker.css";

type FavoriteAttrs = {
  favoriteAuthors: string[];
  favoriteSources: Source[];
  favoriteAuthorModifyFn: (favoriteAuthor: string) => void;
  favoriteSourceModifyFn: (favoriteSource: Source) => void;
};

const renderCards = (news: News[], favoriteAttrs: FavoriteAttrs) => {
  return news.map((newsItem) => {
    return (
      <Card
        imageLink={newsItem.image}
        title={newsItem.title}
        url={newsItem.url}
        author={newsItem.author}
        date={new Date(newsItem.createdAt)}
        source={newsItem.source}
        key={newsItem.title}
        isFavoriteAuthor={favoriteAttrs.favoriteAuthors.includes(
          newsItem.author
        )}
        isFavoriteSource={
          favoriteAttrs.favoriteSources.find(
            (favoriteSource) =>
              favoriteSource.id == newsItem.source.id ||
              favoriteSource.name == newsItem.source.id
          ) !== undefined
        }
        favoriteAuthorModifyFn={favoriteAttrs.favoriteAuthorModifyFn}
        favoriteSourceModifyFn={favoriteAttrs.favoriteSourceModifyFn}
      />
    );
  });
};

const processResult = (
  queryResult: UseQueryResult<News[]>,
  queryStatus: QueryStatus,
  nextPage: () => void,
  prevPage: () => void,
  searchQuery: string,
  favoriteAttrs: FavoriteAttrs
) => {
  if (queryResult.isSuccess) {
    if (queryResult.data && queryResult.data.length > 0) {
      return (
        <div className="flex flex-col space-y-4 mb-4 px-3 lg:px-0">
          {searchQuery !== "" && (
            <p className="text-2xl text-black">
              {" "}
              Search results for: <i>"{searchQuery}</i>"
            </p>
          )}
          {renderCards(queryResult.data, favoriteAttrs)}
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
    sources,
    enabledSources,
    searchQuery,
    searchQueryOnChange,
    searchQueryForKey,
    handleSearchQuerySubmit,
    dateFilters,
    modifyDateFilters,
    enabledCategoryNewsAPI,
    modifyCategoryNewsAPI,
    favoriteAuthors,
    modifyFavoriteAuthors,
    favoriteSources,
    modifyFavoriteSources,
    enabledCategoryTheGuardian,
    enabledSourcesTheGuardian,
    modifyCategoryTheGuardian,
    theGuardianNewsQueryResult,
    theGuardianQueryStatus,
    newYorkTimesNewsQueryResult,
    newYorkTimesQueryStatus,
    enabledCategoryNewYorkTimes,
    modifyCategoryNewYorkTimes,
    enabledSourcesNewYorkTimes,
    setNewYorkTimesQueryStatus,
    setQueryStatus,
    setTheGuardianQueryStatus,
    modifySourceNewsAPI,
    modifySourceTheGuardian,
    modifySourceNewYorkTimes,
  } = useNews();
  const { nextPage, prevPage } = usePagination();

  return (
    <div className="w-full h-full space-y-9 pt-28">
      <Header />
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-4xl ml-12 border-b-gray-300">
        <b>Top Headlines</b>
      </p>
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 min-h-max pt-4">
        {/* Search bar and general filters */}
        <div className="flex justify-center h-fit min-h-max mb-4">
          <div className="text-left w-3/4 h-1/2 overflow-scroll border border-innoscripta rounded p-4">
            <details className="cursor-pointer text-2xl mb-4">
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
          </div>
        </div>
        {/* Search bar */}
        <div className="relative text-gray-400 w-3/4 lg:w-full mx-auto h-fit">
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
          <div className="absolute ml-2 h-full w-7 flex justify-center top-0">
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
        <div></div>
      </section>

      {/* News API */}
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-2xl ml-12 border-b-gray-300">
        <b>{newsSources.NewsAPI.friendlyName}</b>
      </p>
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 min-h-max">
        <div className="flex justify-center h-fit min-h-max mb-4">
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
                          onChange={() => modifySourceNewsAPI(eachSource.id)}
                        />
                        <label
                          onClick={() => modifySourceNewsAPI(eachSource.id)}
                          className="cursor-pointer">
                          {eachSource.name}
                        </label>
                      </div>
                    );
                  })}
              </details>
              <details className="text-lg ml-2">
                <summary>Categories</summary>
                {newsSources.NewsAPI.categories.map((eachCategory) => {
                  return (
                    <div
                      key={`NewsAPI-Category-${eachCategory}`}
                      className="cursor-pointer ml-4">
                      <input
                        type="radio"
                        className="mr-1 cursor-pointer"
                        name={eachCategory}
                        value={eachCategory}
                        checked={enabledCategoryNewsAPI == eachCategory}
                        onChange={() => modifyCategoryNewsAPI(eachCategory)}
                      />
                      <label
                        onClick={() => modifyCategoryNewsAPI(eachCategory)}
                        className="cursor-pointer">
                        {eachCategory}
                      </label>
                    </div>
                  );
                })}
              </details>
            </details>
          </div>
        </div>
        {processResult(
          newsQueryResult,
          queryStatus,
          () => {
            nextPage({ queryStatus, setQueryStatus });
          },
          () => {
            prevPage({ queryStatus, setQueryStatus });
          },
          searchQueryForKey,
          {
            favoriteAuthors: favoriteAuthors,
            favoriteSources: favoriteSources,
            favoriteAuthorModifyFn: modifyFavoriteAuthors,
            favoriteSourceModifyFn: modifyFavoriteSources,
          }
        )}
        <div></div>
      </section>

      {/* The Guardian */}
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-2xl ml-12 border-b-gray-300">
        <b>{newsSources.TheGuardianAPI.friendlyName}</b>
      </p>
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 min-h-max">
        <div className="flex justify-center h-fit min-h-max mb-4">
          <div className="text-left w-3/4 h-1/2 overflow-scroll border border-innoscripta rounded p-4">
            <details className="cursor-pointer text-2xl">
              <summary>Filters</summary>
              <details className="text-lg ml-2">
                <summary>Sources</summary>
                {newsSources.TheGuardianAPI.sources.length > 0 &&
                  newsSources.TheGuardianAPI.sources.map((eachSource) => {
                    return (
                      <div
                        key={eachSource.id}
                        className="cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          className="mr-1 cursor-pointer"
                          name={eachSource.id}
                          value={eachSource.id}
                          checked={enabledSourcesTheGuardian.includes(
                            eachSource.id
                          )}
                          onChange={() =>
                            modifySourceTheGuardian(eachSource.id)
                          }
                        />
                        <label
                          onClick={() => modifySourceTheGuardian(eachSource.id)}
                          className="cursor-pointer">
                          {eachSource.name}
                        </label>
                      </div>
                    );
                  })}
              </details>
              <details className="text-lg ml-2">
                <summary>Categories</summary>
                {newsSources.TheGuardianAPI.categories.map((eachCategory) => {
                  return (
                    <div
                      key={`TheGuardian-Category-${eachCategory}`}
                      className="cursor-pointer ml-4">
                      <input
                        type="radio"
                        className="mr-1 cursor-pointer"
                        name={eachCategory}
                        value={eachCategory}
                        checked={enabledCategoryTheGuardian == eachCategory}
                        onChange={() => modifyCategoryTheGuardian(eachCategory)}
                      />
                      <label
                        onClick={() => modifyCategoryTheGuardian(eachCategory)}
                        className="cursor-pointer">
                        {eachCategory}
                      </label>
                    </div>
                  );
                })}
              </details>
            </details>
          </div>
        </div>
        {processResult(
          theGuardianNewsQueryResult,
          theGuardianQueryStatus,
          () => {
            nextPage({
              queryStatus: theGuardianQueryStatus,
              setQueryStatus: setTheGuardianQueryStatus,
            });
          },
          () => {
            prevPage({
              queryStatus: theGuardianQueryStatus,
              setQueryStatus: setTheGuardianQueryStatus,
            });
          },
          searchQueryForKey,
          {
            favoriteAuthors: favoriteAuthors,
            favoriteSources: favoriteSources,
            favoriteAuthorModifyFn: modifyFavoriteAuthors,
            favoriteSourceModifyFn: modifyFavoriteSources,
          }
        )}
        <div></div>
      </section>

      {/* New York Times */}
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-2xl ml-12 border-b-gray-300">
        <b>{newsSources.NewYorkTimesAPI.friendlyName}</b>
      </p>
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 min-h-max">
        <div className="flex justify-center h-fit min-h-max mb-4">
          <div className="text-left w-3/4 h-1/2 overflow-scroll border border-innoscripta rounded p-4">
            <details className="cursor-pointer text-2xl">
              <summary>Filters</summary>
              <details className="text-lg ml-2">
                <summary>Sources</summary>
                {newsSources.NewYorkTimesAPI.sources.length > 0 &&
                  newsSources.NewYorkTimesAPI.sources.map((eachSource) => {
                    return (
                      <div
                        key={eachSource.id}
                        className="cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          className="mr-1 cursor-pointer"
                          name={eachSource.id}
                          value={eachSource.id}
                          checked={enabledSourcesNewYorkTimes.includes(
                            eachSource.id
                          )}
                          onChange={() =>
                            modifySourceNewYorkTimes(eachSource.id)
                          }
                        />
                        <label
                          onClick={() =>
                            modifySourceNewYorkTimes(eachSource.id)
                          }
                          className="cursor-pointer">
                          {eachSource.name}
                        </label>
                      </div>
                    );
                  })}
              </details>
              <details className="text-lg ml-2">
                <summary>Categories</summary>
                {newsSources.NewYorkTimesAPI.categories.map((eachCategory) => {
                  return (
                    <div
                      key={`NewYorkTimes-Category-${eachCategory}`}
                      className="cursor-pointer ml-4">
                      <input
                        type="radio"
                        className="mr-1 cursor-pointer"
                        name={eachCategory}
                        value={eachCategory}
                        checked={enabledCategoryNewYorkTimes == eachCategory}
                        onChange={() =>
                          modifyCategoryNewYorkTimes(eachCategory)
                        }
                      />
                      <label
                        onClick={() => modifyCategoryNewYorkTimes(eachCategory)}
                        className="cursor-pointer">
                        {eachCategory}
                      </label>
                    </div>
                  );
                })}
              </details>
            </details>
          </div>
        </div>
        {processResult(
          newYorkTimesNewsQueryResult,
          newYorkTimesQueryStatus,
          () => {
            nextPage({
              queryStatus: newYorkTimesQueryStatus,
              setQueryStatus: setNewYorkTimesQueryStatus,
            });
          },
          () => {
            prevPage({
              queryStatus: newYorkTimesQueryStatus,
              setQueryStatus: setNewYorkTimesQueryStatus,
            });
          },
          searchQueryForKey,
          {
            favoriteAuthors: favoriteAuthors,
            favoriteSources: favoriteSources,
            favoriteAuthorModifyFn: modifyFavoriteAuthors,
            favoriteSourceModifyFn: modifyFavoriteSources,
          }
        )}
        <div></div>
      </section>
    </div>
  );
}

export default News;
