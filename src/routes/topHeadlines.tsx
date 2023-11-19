import Header from "components/header";
import { useNews } from "hooks/useNews";
import { usePagination } from "hooks/usePagination";
import Cards from "components/cards";
import DatePicker from "react-datepicker";
import Search from "components/search";
import { newsSources } from "const/news";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

function TopHeadlines() {
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

  const modifySourceNewsAPIFn = (sourceID: string) => {
    modifySourceNewsAPI(sourceID);

    // Because the NewsAPI doesn't support both filters
    modifyCategoryNewsAPI("all");
  };
  const modifyCategoryNewsAPIFn = (category: string) => {
    modifyCategoryNewsAPI(category.toLowerCase());

    // Because the NewsAPI doesn't support both filters
    sources.data?.forEach((eachSource) => {
      !enabledSources.includes(eachSource.id) &&
        modifySourceNewsAPI(eachSource.id);
    });
  };

  return (
    <div className="w-full h-full space-y-9 pt-28">
      <Helmet>
        <title>Innoscripta News Feed | Top Headlines</title>
      </Helmet>
      <Header />
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-4xl ml-12 border-b-gray-300">
        <b>Top Headlines</b>
      </p>
      <section className="flex flex-col lg:flex-row w-full min-h-max items-center lg:items-start mx-0 lg:mx-8">
        {/* Search bar and general filters */}
        <div className="relative text-gray-600 w-3/4 lg:w-1/3 h-fit py-0 lg:py-4 px-0 lg:px-4">
          <div className="text-left overflow-scroll border border-innoscripta rounded p-4">
            <details className="cursor-pointer text-2xl mb-4">
              <summary>Date</summary>
              <div className="cursor-pointer ml-4">
                <div className="mb-2">
                  <label>From: </label>
                  <DatePicker
                    selected={dateFilters?.from}
                    placeholderText="Select a date..."
                    onChange={(date) =>
                      modifyDateFilters("from", date || undefined)
                    }
                    onSelect={(date) =>
                      modifyDateFilters("from", date || undefined)
                    }
                    includeDateIntervals={[
                      {
                        start: new Date("1970/1/1"),
                        end: dateFilters?.to || new Date(),
                      },
                    ]}
                    className="bg-white text-left p-1 text-gray-600 border border-gray-400"
                  />
                </div>
                <div>
                  <label>To: </label>
                  <DatePicker
                    selected={dateFilters?.to}
                    placeholderText="Select a date..."
                    onChange={(date) =>
                      modifyDateFilters("to", date || undefined)
                    }
                    onSelect={(date) =>
                      modifyDateFilters("to", date || undefined)
                    }
                    includeDateIntervals={[
                      {
                        start: dateFilters?.from || new Date("1970/1/1"),
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
        <Search
          searchQuery={searchQuery}
          searchQueryOnChange={searchQueryOnChange}
          handleSearchQuerySubmit={handleSearchQuerySubmit}
        />
      </section>

      {/* NewsAPI */}
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-2xl ml-12 border-b-gray-300">
        <b>{newsSources.NewsAPI.friendlyName}</b>
      </p>
      <section className="flex flex-col lg:flex-row w-full min-h-max items-center lg:items-start mx-0 lg:mx-8">
        <div className="relative text-gray-600 w-3/4 lg:w-1/3 h-fit py-0 lg:py-4 px-0 lg:px-4">
          <div className="text-left overflow-scroll border border-innoscripta rounded p-4">
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
                          onChange={() => modifySourceNewsAPIFn(eachSource.id)}
                        />
                        <label
                          onClick={() => modifySourceNewsAPIFn(eachSource.id)}
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
                        name={`NewsAPI-Category-${eachCategory}`}
                        value={eachCategory.toLowerCase()}
                        checked={
                          enabledCategoryNewsAPI.toLowerCase() ===
                          eachCategory.toLowerCase()
                        }
                        onChange={() => modifyCategoryNewsAPIFn(eachCategory)}
                      />
                      <label
                        onClick={() => modifyCategoryNewsAPIFn(eachCategory)}
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
        <div className="flex justify-center min-h-max w-3/4 lg:w-1/3 pt-4 lg:pt-0">
          <Cards
            queryResult={newsQueryResult}
            searchQuery={searchQueryForKey}
            isPaginated={true}
            nextPage={() => {
              nextPage({ queryStatus, setQueryStatus });
            }}
            prevPage={() => {
              prevPage({ queryStatus, setQueryStatus });
            }}
            queryStatus={queryStatus}
          />
        </div>
      </section>

      {/* The Guardian */}
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-2xl ml-12 border-b-gray-300">
        <b>{newsSources.TheGuardianAPI.friendlyName}</b>
      </p>
      <section className="flex flex-col lg:flex-row w-full min-h-max items-center lg:items-start mx-0 lg:mx-8">
        <div className="relative text-gray-600 w-3/4 lg:w-1/3 h-fit py-0 lg:py-4 px-0 lg:px-4">
          <div className="text-left overflow-scroll border border-innoscripta rounded p-4">
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
                        name={`TheGuardian-Category-${eachCategory}`}
                        value={eachCategory}
                        checked={
                          enabledCategoryTheGuardian.toLowerCase() ===
                          eachCategory.toLowerCase()
                        }
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
        <div className="flex justify-center min-h-max w-3/4 lg:w-1/3 pt-4 lg:pt-0">
          <Cards
            queryResult={theGuardianNewsQueryResult}
            searchQuery={searchQueryForKey}
            isPaginated={true}
            nextPage={() => {
              nextPage({
                queryStatus: theGuardianQueryStatus,
                setQueryStatus: setTheGuardianQueryStatus,
              });
            }}
            prevPage={() => {
              prevPage({
                queryStatus: theGuardianQueryStatus,
                setQueryStatus: setTheGuardianQueryStatus,
              });
            }}
            queryStatus={theGuardianQueryStatus}
          />
        </div>
      </section>

      {/* New York Times */}
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-2xl ml-12 border-b-gray-300">
        <b>{newsSources.NewYorkTimesAPI.friendlyName}</b>
      </p>
      <section className="flex flex-col lg:flex-row w-full min-h-max items-center lg:items-start mx-0 lg:mx-8">
        <div className="relative text-gray-600 w-3/4 lg:w-1/3 h-fit py-0 lg:py-4 px-0 lg:px-4">
          <div className="text-left overflow-scroll border border-innoscripta rounded p-4">
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
                        name={`NewYorkTimes-Category-${eachCategory}`}
                        value={eachCategory}
                        checked={enabledCategoryNewYorkTimes === eachCategory}
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
        <div className="flex justify-center min-h-max w-3/4 lg:w-1/3 pt-4 lg:pt-0">
          <Cards
            queryResult={newYorkTimesNewsQueryResult}
            searchQuery={searchQueryForKey}
            isPaginated={true}
            nextPage={() => {
              nextPage({
                queryStatus: newYorkTimesQueryStatus,
                setQueryStatus: setNewYorkTimesQueryStatus,
              });
            }}
            prevPage={() => {
              prevPage({
                queryStatus: newYorkTimesQueryStatus,
                setQueryStatus: setNewYorkTimesQueryStatus,
              });
            }}
            queryStatus={newYorkTimesQueryStatus}
          />
        </div>
      </section>
    </div>
  );
}

export default TopHeadlines;
