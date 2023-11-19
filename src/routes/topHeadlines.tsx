import Header from "components/header";
import { useNews } from "hooks/useNews";
import { usePagination } from "hooks/usePagination";
import Cards from "components/cards";
import Icon from "components/icon";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import { newsSources } from "const/news";
import "react-datepicker/dist/react-datepicker.css";

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

  return (
    <div className="w-full h-full space-y-9 pt-28">
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
        <div className="relative text-gray-400 w-3/4 lg:w-1/3 h-fit py-4 px-0 lg:px-4">
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
                        checked={enabledCategoryNewsAPI === eachCategory}
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
                        name={eachCategory}
                        value={eachCategory}
                        checked={enabledCategoryTheGuardian === eachCategory}
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
                        name={eachCategory}
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
