import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
export function useFetchGQL(fetchQuery, limit, filters) {
  const [page, setPage] = useState(1);

  const queryResponse = fetchQuery(page, limit, filters);

  let { loading, error, data: queryResult, refetch } = useQuery(queryResponse);

  useEffect(() => {
    refetch();
  }, [page]);

  const { items, pageInfo } = queryResult?.queryResponse ?? {};

  const { currentPage, pageCount, itemCount } = pageInfo ?? {};

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  let updatedItems = useMemo(() => {
    return items?.map((item, i) => {
      let updatedItem = { ...item };
      let curOffset = limit * (page - 1);
      updatedItem["srNo"] = curOffset + i + 1;

      return updatedItem;
    });
  }, [items, limit, page]);

  return {
    isLoading: loading,
    isError: error,
    apiResponse: {
      data: updatedItems ?? [],
      additionalInfo: {
        totalDocuments: itemCount,
        totalPages: pageCount,
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
