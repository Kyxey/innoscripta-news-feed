import Header from "components/header";
import { useNews } from "hooks/useNews";
import Icon from "components/icon";
import { Tooltip } from "react-tooltip";
import "react-datepicker/dist/react-datepicker.css";
import Cards from "components/cards";
import { Helmet } from "react-helmet-async";

function MyFeed() {
  const {
    newsQueryResult,
    searchQuery,
    searchQueryOnChange,
    searchQueryForKey,
    handleSearchQuerySubmit,
    theGuardianNewsQueryResult,
    newYorkTimesNewsQueryResult,
    combineQueries,
    shakeDataFromQuery,
  } = useNews();

  const combinedQuery = combineQueries([
    newsQueryResult,
    theGuardianNewsQueryResult,
    newYorkTimesNewsQueryResult,
  ]);

  return (
    <div className="w-full h-full space-y-9 pt-28">
      <Helmet>
        <title>Innoscripta News Feed | My Feed</title>
      </Helmet>
      <Header />
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-4xl ml-12 border-b-gray-300">
        <b>My Feed</b>
      </p>
      <section className="flex w-full min-h-max pt-4">
        {/* Search bar */}
        <div className="relative text-gray-400 w-3/4 lg:w-1/3 mx-auto h-fit">
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
      <section className="flex justify-center min-h-max w-3/4 lg:w-1/3 mx-auto">
        <Cards
          queryResult={shakeDataFromQuery(combinedQuery)}
          searchQuery={searchQueryForKey}
          isPaginated={false}
        />
      </section>
    </div>
  );
}

export default MyFeed;
