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
    let newSources: Source[];
    if (
      favoriteSources.find(
        (favoriteSource) =>
          favoriteSource.id == sourceInfo.id ||
          favoriteSource.name == sourceInfo.name
      )
    ) {
      newSources = favoriteSources.filter(
        (favoriteSource) =>
          favoriteSource.id !== sourceInfo.id &&
          favoriteSource.name !== sourceInfo.name
      );
    } else {
      newSources = [...favoriteSources, sourceInfo];
    }
    setFavoriteSources(newSources);
  };
  const modifyFavoriteAuthors = (author: string) => {
    let newAuthors: string[];
    if (favoriteAuthors.includes(author)) {
      newAuthors = favoriteAuthors.filter(
        (favoriteAuthor) => favoriteAuthor !== author
      );
    } else {
      newAuthors = [...favoriteAuthors, author];
    }
    setFavoriteAuthors(newAuthors);
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
