import type { Dispatch, SetStateAction } from "react";
import type { QueryStatus } from "hooks/useSettings";

type PaginationFnArgs = {
  queryStatus: QueryStatus;
  setQueryStatus: Dispatch<SetStateAction<QueryStatus>>;
};

function usePagination() {
  const nextPage = ({ queryStatus, setQueryStatus }: PaginationFnArgs) => {
    if (queryStatus.limit * queryStatus.page < queryStatus.total) {
      setQueryStatus((prevQueryStatus) => ({
        ...prevQueryStatus,
        page: queryStatus.page + 1,
      }));
    }
  };
  const prevPage = ({ queryStatus, setQueryStatus }: PaginationFnArgs) => {
    if (queryStatus.page > 1) {
      setQueryStatus((prevQueryStatus) => ({
        ...prevQueryStatus,
        page: queryStatus.page - 1,
      }));
    }
  };

  return { nextPage, prevPage };
}

export { usePagination };
