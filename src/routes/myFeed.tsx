import Header from "components/header";
import { useNews } from "hooks/useNews";
import Search from "components/search";
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
      <section className="flex w-full min-h-max pt-4 justify-center">
        <Search
          searchQuery={searchQuery}
          searchQueryOnChange={searchQueryOnChange}
          handleSearchQuerySubmit={handleSearchQuerySubmit}
        />
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
