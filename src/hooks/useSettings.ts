import { useState, useEffect } from "react";
import type { QueryStatus } from "types";

function useSettings(
  storageKeys: {
    queryStatusStorageKey: string;
    enabledSourcesStorageKey: string;
    enabledCategoryStorageKey: string;
  },
  defaults: { sources: string[]; category: string }
) {
  const queryStatusInStorage = localStorage.getItem(
    storageKeys.queryStatusStorageKey
  );
  const enabledSourcesInStorage = localStorage.getItem(
    storageKeys.enabledSourcesStorageKey
  );
  const enabledCategoryInStorage = localStorage.getItem(
    storageKeys.enabledCategoryStorageKey
  );

  const [queryStatus, setQueryStatus] = useState<QueryStatus>(
    queryStatusInStorage
      ? JSON.parse(queryStatusInStorage)
      : {
          limit: 10,
          page: 1,
          total: 0,
        }
  );
  const [enabledSources, setEnabledSources] = useState<string[]>(
    enabledSourcesInStorage
      ? JSON.parse(enabledSourcesInStorage)
      : defaults.sources
  );
  const [enabledCategory, setEnabledCategory] = useState(
    enabledCategoryInStorage ? enabledCategoryInStorage : defaults.category
  );
  const resetQueryStatus = () => {
    setQueryStatus((prevQueryStatus) => ({
      ...prevQueryStatus,
      page: 1,
      total: 0,
    }));
  };
  const modifySource = (sourceID: string) => {
    setEnabledSources((prevEnabledSources) => {
      if (prevEnabledSources.includes(sourceID)) {
        return prevEnabledSources.filter((val) => val !== sourceID);
      }
      return [...prevEnabledSources, sourceID];
    });
    resetQueryStatus();
  };

  useEffect(() => {
    localStorage.setItem(
      storageKeys.enabledCategoryStorageKey,
      enabledCategory
    );
  }, [enabledCategory, storageKeys.enabledCategoryStorageKey]);
  useEffect(() => {
    if (enabledSources.length > 0) {
      localStorage.setItem(
        storageKeys.enabledSourcesStorageKey,
        JSON.stringify(enabledSources)
      );
    } else {
      localStorage.removeItem(storageKeys.enabledSourcesStorageKey);
    }
  }, [enabledSources, storageKeys.enabledSourcesStorageKey]);
  useEffect(() => {
    if (!enabledSourcesInStorage) {
      const newEnabledSources = defaults.sources;
      if (newEnabledSources && newEnabledSources.length > 0) {
        localStorage.setItem(
          storageKeys.enabledSourcesStorageKey,
          JSON.stringify(newEnabledSources)
        );
      }
    }
  }, [
    enabledSources,
    storageKeys.enabledSourcesStorageKey,
    defaults.sources,
    enabledSourcesInStorage,
  ]);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.queryStatusStorageKey,
      JSON.stringify(queryStatus)
    );
  }, [queryStatus, storageKeys.queryStatusStorageKey]);

  const modifyCategory = (category: string) => {
    const categoryID = category;
    setEnabledCategory(categoryID);

    resetQueryStatus();
  };

  return {
    modifySource,
    queryStatus,
    setQueryStatus,
    enabledSources,
    setEnabledSources,
    enabledSourcesInStorage,
    enabledCategory,
    setEnabledCategory,
    modifyCategory,
    resetQueryStatus,
  };
}

export { useSettings };
