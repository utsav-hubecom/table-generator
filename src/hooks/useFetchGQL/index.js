import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
export function useFetchGQL(fetchQuery, limit, filters) {
  const [page, setPage] = useState(1);

  const queryResponse = fetchQuery(page, limit, filters);

  let { loading, error, data: queryResult, refetch } = useQuery(queryResponse);

  useEffect(() => {
    refetch();
  }, [page]);

  const { items, pageInfo } = queryResult?.queryResponse ?? {};

  const { currentPage, itemCount } = pageInfo ?? {};

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(0);
  }, []);

  return {
    isLoading: loading,
    isError: error,
    apiResponse: {
      data: items ?? [],
      additionalData: {
        totalDocuments: itemCount,
        currentPage,
      },
    },
    nextPage,
    resetPagination,

    paginationObj: {
      limit,
    },
  };
}
