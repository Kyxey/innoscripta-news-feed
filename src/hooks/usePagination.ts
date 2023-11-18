import type { QueryStatus } from "types";

type PaginationFnArgs = {
  queryStatus: QueryStatus;
  setQueryStatus: (queryStatus: QueryStatus) => void;
};

function usePagination() {
  const nextPage = ({ queryStatus, setQueryStatus }: PaginationFnArgs) => {
    if (queryStatus.limit * queryStatus.page < queryStatus.total) {
      setQueryStatus({
        ...queryStatus,
        page: queryStatus.page + 1,
      });
    }
  };
  const prevPage = ({ queryStatus, setQueryStatus }: PaginationFnArgs) => {
    if (queryStatus.page > 1) {
      setQueryStatus({
        ...queryStatus,
        page: queryStatus.page - 1,
      });
    }
  };

  return { nextPage, prevPage };
}

export { usePagination };
