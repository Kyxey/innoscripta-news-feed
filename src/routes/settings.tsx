import Header from "components/header";
import { storageKeys } from "const/storage";
import { useFavorite } from "hooks/useFavorite";
import { Helmet } from "react-helmet-async";

type ModifyFn = (item: string | { id: string; name: string }) => void;

function renderFavoriteDetails(
  title: string,
  favoriteItems: (string | { id: string; name: string })[],
  modifyFn: ModifyFn
) {
  return (
    <details
      className="cursor-pointer text-2xl text-left"
      open>
      <summary>{title}</summary>
      {favoriteItems.map((eachFavoriteItems) => {
        return (
          <div
            key={`favorite-item-${title}-${
              typeof eachFavoriteItems === "string"
                ? eachFavoriteItems
                : eachFavoriteItems.id
            }`}
            className="mt-4 text-lg cursor-default inline-block w-max max-w-full relative truncate mr-3">
            <div className="rounded-2xl bg-innoscripta text-white w-max max-w-full p-2 pr-10 truncate">
              {typeof eachFavoriteItems === "string"
                ? eachFavoriteItems
                : eachFavoriteItems.name}
            </div>
            <p
              className="absolute text-2xl h-full flex justify-center items-center text-center rounded-2xl w-9 transition bg-innoscripta text-red-500 hover:text-red-600 cursor-pointer top-0 right-0"
              onClick={() => modifyFn(eachFavoriteItems)}>
              <b>X</b>
            </p>
          </div>
        );
      })}
    </details>
  );
}

function Settings() {
  const {
    favoriteAuthors,
    favoriteSources,
    modifyFavoriteAuthors,
    modifyFavoriteSources,
  } = useFavorite({
    favoriteAuthorsStorageKey: storageKeys.favoriteAuthorsStorageKey,
    favoriteSourcesStorageKey: storageKeys.favoriteSourcesStorageKey,
  });
  const modifyFn: ModifyFn = (item) => {
    if (typeof item === "string") {
      modifyFavoriteAuthors(item);
    } else {
      modifyFavoriteSources(item);
    }
  };

  return (
    <div className="w-full h-full space-y-9 pt-28">
      <Helmet>
        <title>Innoscripta News Feed | Personalize Settings</title>
      </Helmet>
      <Header />
      <p className="text-left border border-t-0 border-x-0 w-1/2 text-innoscripta text-4xl ml-12 border-b-gray-300">
        <b>Personalize Settings</b>
      </p>
      <section className="flex justify-center w-full min-h-max justify-items-center">
        <div className="flex flex-col space-y-4 mb-4 w-3/4 lg:w-1/3">
          {renderFavoriteDetails("Favorite Authors", favoriteAuthors, modifyFn)}
          {renderFavoriteDetails("Favorite Sources", favoriteSources, modifyFn)}
        </div>
      </section>
    </div>
  );
}

export default Settings;
