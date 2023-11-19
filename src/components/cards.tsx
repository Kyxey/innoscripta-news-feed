import type { UseQueryResult } from "@tanstack/react-query";
import Card from "components/card";
import { useFavorite } from "hooks/useFavorite";
import Pagination from "components/pagination";
import SearchNotFound from "components/searchNotFound";
import Error from "components/error";
import Loading from "components/loading";
import { storageKeys } from "const/storage";
import type { News } from "hooks/useNews";
import type { QueryStatus } from "hooks/useSettings";

type PropsWithPagination = {
  queryResult: UseQueryResult<News[]>;
  queryStatus: QueryStatus;
  nextPage: () => void;
  prevPage: () => void;
  searchQuery: string;
  isPaginated: true;
};

type PropsWithoutPagination = {
  queryResult: UseQueryResult<News[]>;
  searchQuery: string;
  isPaginated: false;
};

type Props = PropsWithPagination | PropsWithoutPagination;

function Cards(props: Props) {
  const {
    favoriteAuthors,
    favoriteSources,
    modifyFavoriteSources,
    modifyFavoriteAuthors,
  } = useFavorite({
    favoriteAuthorsStorageKey: storageKeys.favoriteAuthorsStorageKey,
    favoriteSourcesStorageKey: storageKeys.favoriteSourcesStorageKey,
  });

  if (props.queryResult.isSuccess) {
    if (props.queryResult.data && props.queryResult.data.length > 0) {
      return (
        <div className="flex flex-col space-y-4 mb-4 w-full py-4">
          {props.searchQuery !== "" && (
            <p className="text-2xl text-black">
              {" "}
              Search results for: <i>"{props.searchQuery}</i>"
            </p>
          )}
          {props.queryResult.data.map((newsItem) => {
            return (
              <Card
                imageLink={newsItem.image}
                title={newsItem.title}
                url={newsItem.url}
                author={newsItem.author}
                date={new Date(newsItem.createdAt)}
                source={newsItem.source}
                key={newsItem.title}
                isFavoriteAuthor={favoriteAuthors.includes(newsItem.author)}
                isFavoriteSource={
                  favoriteSources.find(
                    (favoriteSource) =>
                      favoriteSource.id === newsItem.source.id ||
                      favoriteSource.name === newsItem.source.id
                  ) !== undefined
                }
                favoriteAuthorModifyFn={modifyFavoriteAuthors}
                favoriteSourceModifyFn={modifyFavoriteSources}
              />
            );
          })}
          {props.isPaginated && (
            <Pagination
              currentPage={props.queryStatus.page}
              totalPages={Math.ceil(
                props.queryStatus.total / props.queryStatus.limit
              )}
              nextPageFn={props.nextPage}
              prevPageFn={props.prevPage}
            />
          )}
        </div>
      );
    }

    return <SearchNotFound />;
  } else if (
    props.queryResult.isError ||
    props.queryResult.isLoadingError ||
    props.queryResult.isRefetchError
  ) {
    return <Error />;
  } else if (
    props.queryResult.isRefetching ||
    props.queryResult.isLoading ||
    props.queryResult.isFetching ||
    props.queryResult.isPending
  ) {
    return <Loading />;
  }
}

export default Cards;
