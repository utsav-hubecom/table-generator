import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
export function useFetchGQL(fetchQuery, limit, filters) {
  const [page, setPage] = useState(1);

  // Determine the query AST. 
  // If fetchQuery is a function, call it. Otherwise use it directly.
  // Note: If fetchQuery depends on page/filters, it might return a different query AST on render? 
  // Ideally, it should return a static query with variables.
  // But legacy usage (test/App.jsx) implies it might be a function.
  const queryAst = typeof fetchQuery === "function" ? fetchQuery(page, limit, filters) : fetchQuery;

  let {
    loading,
    error,
    data: queryResult,
    refetch,
  } = useQuery(queryAst, {
    variables: {
      page,
      perPage: limit,
      filter: { filter: filters },
    },
  });

  useEffect(() => {
    refetch();
  }, [page, filters]);

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
