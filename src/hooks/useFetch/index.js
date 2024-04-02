import { useEffect, useState, useCallback } from "react";

export function useFetch(fetchFunction, limit, offset, filters) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [limitValue, setLimit] = useState(limit);
  const [offsetValue, setOffset] = useState(offset);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setOffset(0 + page * limitValue);
  }, [page, limitValue]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch data using the fetch function
        const response = await fetchFunction(
          {
            limit: limitValue,
            offset: offsetValue,
          },
          filters
        );

        // Update the state with the fetched data
        setApiResponse(response);

        // Reset error state
        setIsError(false);
      } catch (error) {
        // Set error state if there's an error
        setIsError(true);
      }

      setIsLoading(false);
    };

    // Call the fetchData function
    fetchData();
  }, [offsetValue, limitValue, filters]);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(0);
  }, []);

  return {
    isLoading,
    isError,
    apiResponse,
    nextPage,
    resetPagination,

    paginationObj: {
      limit: limitValue,
      offset: offsetValue,
    },
  };
}
