import { useState, useEffect } from "react";
import type { Source } from "types";

function useFavorite(storageKeys: {
  favoriteAuthorsStorageKey: string;
  favoriteSourcesStorageKey: string;
}) {
  const favoriteAuthorsInStorage = localStorage.getItem(
    storageKeys.favoriteAuthorsStorageKey
  );
  const favoriteSourcesInStorage = localStorage.getItem(
    storageKeys.favoriteSourcesStorageKey
  );

  const [favoriteSources, setFavoriteSources] = useState<Source[]>(
    favoriteSourcesInStorage ? JSON.parse(favoriteSourcesInStorage) : []
  );
  const [favoriteAuthors, setFavoriteAuthors] = useState<string[]>(
    favoriteAuthorsInStorage ? JSON.parse(favoriteAuthorsInStorage) : []
  );

  const modifyFavoriteSources = (sourceInfo: Source) => {
    setFavoriteSources((prevFavoriteSources) => {
      if (
        prevFavoriteSources.findIndex(
          (favoriteSource) =>
            favoriteSource.id === sourceInfo.id ||
            favoriteSource.name === sourceInfo.name
        ) !== -1
      ) {
        return prevFavoriteSources.filter(
          (favoriteSource) =>
            favoriteSource.id !== sourceInfo.id &&
            favoriteSource.name !== sourceInfo.name
        );
      }

      return [...prevFavoriteSources, sourceInfo];
    });
  };
  const modifyFavoriteAuthors = (author: string) => {
    setFavoriteAuthors((prevFavoriteAuthors) => {
      if (prevFavoriteAuthors.includes(author)) {
        return favoriteAuthors.filter(
          (favoriteAuthor) => favoriteAuthor !== author
        );
      }

      return [...prevFavoriteAuthors, author];
    });
  };

  useEffect(() => {
    localStorage.setItem(
      storageKeys.favoriteSourcesStorageKey,
      JSON.stringify(favoriteSources)
    );
  }, [favoriteSources, storageKeys.favoriteSourcesStorageKey]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.favoriteAuthorsStorageKey,
      JSON.stringify(favoriteAuthors)
    );
  }, [favoriteAuthors, storageKeys.favoriteAuthorsStorageKey]);

  return {
    favoriteSources,
    modifyFavoriteSources,
    favoriteAuthors,
    modifyFavoriteAuthors,
  };
}

export { useFavorite };
