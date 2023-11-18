import Header from "components/Header";
import { useNews } from "hooks/useNews";
import type { UseQueryResult } from "@tanstack/react-query";
import type { News, Source } from "types";
import Card from "components/Card";
import Error from "components/Error";
import Loading from "components/Loading";
import SearchNotFound from "components/SearchNotFound";
import Icon from "components/Icon";
import { Tooltip } from "react-tooltip";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

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
        key={"My-Feed-" + newsItem.title}
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
  searchQuery: string,
  favoriteAttrs: FavoriteAttrs
) => {
  if (queryResult.isSuccess) {
    if (queryResult.data && queryResult.data.length > 0) {
      return (
        <div className="flex flex-col space-y-4 mb-4">
          {searchQuery !== "" && (
            <p className="text-2xl text-black">
              {" "}
              Search results for: <i>"{searchQuery}</i>"
            </p>
          )}
          {renderCards(queryResult.data, favoriteAttrs)}
        </div>
      );
    }

    return (
      <div>
        <SearchNotFound />
        <p className="text-lg mt-3 text-center text-gray-500">
          Start liking some news from the{" "}
          <Link
            className="text-innoscripta underline"
            to="/">
            <b>Top Headlines</b>
          </Link>{" "}
          page to continue.
        </p>
      </div>
    );
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

function MyFeed() {
  const {
    newsQueryResult,
    searchQuery,
    searchQueryOnChange,
    searchQueryForKey,
    handleSearchQuerySubmit,
    favoriteAuthors,
    modifyFavoriteAuthors,
    favoriteSources,
    modifyFavoriteSources,
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
      <Header />
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-4xl ml-12 border-b-gray-300">
        <b>My Feed</b>
      </p>
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 min-h-max pt-4">
        <div></div>
        {/* Search bar */}
        <div className="relative text-gray-400 w-full h-fit">
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
      <section className="grid grid-cols-1 grids-rows-3 lg:grid-cols-3 min-h-max">
        <div className="flex justify-center h-fit min-h-max">
          <div></div>
        </div>
        {processResult(shakeDataFromQuery(combinedQuery), searchQueryForKey, {
          favoriteAuthors: favoriteAuthors,
          favoriteSources: favoriteSources,
          favoriteAuthorModifyFn: modifyFavoriteAuthors,
          favoriteSourceModifyFn: modifyFavoriteSources,
        })}
        <div></div>
      </section>
    </div>
  );
}

export default MyFeed;
