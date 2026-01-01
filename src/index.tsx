import { useState, useEffect, useCallback, useRef } from "react";
import { TableGeneratorProps } from "./types/index"; // Import types
import { apiBuilder } from "./utils/adapter";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { CoreTable } from "./Components/Core/CoreTable";
import { debounce } from "./utils/helpers";

export { useFetch } from "./hooks/useFetch";
export { useFetchGQL } from "./hooks/useFetchGQL";
export * from "./types";

// Helper components (assuming they are still JS/JSX)
import NoRecord from "./Components/NoRecord/NoRecord.jsx";
import AdditionalData from "./Components/AdditionalData/AdditionalData.jsx";
import LoadingPage from "./Components/LoadingPage/LoadingPage.jsx";

import "./index.css";

/**
 * TableGenerator Component
 *
 * A powerful, customizable table component with infinite scroll and nested row support.
 * This component acts as a wrapper around the `CoreTable` to adapt legacy data structures
 * and manage complex state logic like pagination and row expansion.
 *
 * @param props - TableGeneratorProps
 * @param props.fetchResults - Object containing data and pagination types (isLoading, apiResponse, nextPage, etc.)
 * @param props.tableSchema - Configuration object defining how each column is rendered
 * @param props.extendedTableSchema - Optional configuration for expandable nested rows
 * @param props.filters - Filter state object
 * @param props.setFilters - Function to update filter state
 * @returns JSX.Element
 */
export function TableGenerator({
  fetchResults,
  tableSchema,
  extendedTableSchema,
  filters = {},
  setFilters = () => {},
  customStyles = {
    backgroundColor: "white",
    borderBottom: "2px solid #f7f7f7",
  },
  headerClasses = "",
  customeClassTr1 = "divide-x-2 divide-gray-50",
  customeClassTr2 = "divide-x-2 divide-gray-50",
  customeClassTbodyTr = "",
  alternateTr = "",
}: TableGeneratorProps) {
  const {
    isLoading,
    isError,
    apiResponse,
    nextPage,
    resetPagination,
    paginationObj,
  } = fetchResults;

  const { limit } = paginationObj;

  const [headerData, setHeaderData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[][] | null>(null);

  const [extendedHeaderDataObj, setExtendedHeaderDataObj] = useState<
    Record<string, any[]>
  >({});
  const [extendedTableDataObj, setExtendedTableDataObj] = useState<
    Record<string, any[][]>
  >({});

  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [additionalData, setAdditionalData] = useState<any>(null);
  const [hasMorePages, setHasMorePages] = useState(true);

  // Reset state when filters change
  useEffect(() => {
    setHasMorePages(true);
    setTableData(null);
    setAdditionalData(null);
    resetPagination();
  }, [filters]);

  // Handle data fetching and processing via adapter
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (apiResponse && !isError) {
        const { totalPages, currentPage } = apiResponse?.additionalInfo ?? {};

        // Transform data using the safe adapter
        const updateApiData = await apiBuilder(
          apiResponse?.data,
          tableSchema,
          setFilters
        );

        if (isMounted) {
          if (updateApiData) {
            setHeaderData(updateApiData.header);

            setTableData((prev) => {
              const currentData = prev || [];
              const incomingData = updateApiData.body || [];

              // If it's the first page, replace data. Otherwise append for infinite scroll.
              if (currentPage === 1) {
                return incomingData;
              } else {
                return [...currentData, ...incomingData];
              }
            });
          }

          setAdditionalData(apiResponse?.additionalInfo);

          if (currentPage === totalPages) {
            setHasMorePages(false);
          } else {
            setHasMorePages(true);
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiResponse, isError]);

  const handleNextPage = useCallback(() => {
    if (hasMorePages && !isLoading) {
      nextPage();
    }
  }, [hasMorePages, isLoading, nextPage]);

  // Attach infinite scroll observer
  const lastElementRef = useInfiniteScroll(
    handleNextPage,
    hasMorePages,
    isLoading
  );

  /**
   * Handles row clicks for expansion.
   * Fetches nested data if necessary.
   */
  const handleRowClick = async (key: string) => {
    const isRowExpanded = expandedRows.includes(key);

    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((rowKey) => rowKey !== key)
      : [...expandedRows, key];

    setExpandedRows(newExpandedRows);

    if (!isRowExpanded && extendedTableSchema) {
      const { extendedDataKey, accessorKey, extendedSchema } =
        extendedTableSchema;

      const parentRow = apiResponse?.data?.find(
        (d: any) => d[accessorKey] === key
      );

      if (parentRow && parentRow[extendedDataKey]) {
        const extendedUpdatedApiData = await apiBuilder(
          parentRow[extendedDataKey],
          extendedSchema,
          setFilters
        );

        if (extendedUpdatedApiData) {
          setExtendedHeaderDataObj((prev) => ({
            ...prev,
            [key]: extendedUpdatedApiData.header,
          }));
          setExtendedTableDataObj((prev) => ({
            ...prev,
            [key]: extendedUpdatedApiData.body,
          }));
        }
      }
    }
  };

  const renderExpandedRow = (rowKey: string) => {
    const headers = extendedHeaderDataObj[rowKey];
    const data = extendedTableDataObj[rowKey];

    if (!headers || !data) return <LoadingPage />;

    return (
      <CoreTable
        headers={headers}
        data={data}
        expandedRows={[]}
        toggleRow={() => {}}
        rowKeyAccessor="id"
        hasMore={false}
        loadMore={() => {}}
        isLoading={false}
        customClassTr1={customeClassTr1}
      />
    );
  };

  const higherValue =
    Math.min(
      additionalData?.totalDocuments || 0,
      additionalData ? additionalData.currentPage * limit : 0
    ) || 0;

  if (isError) {
    return "An error occurred";
  }

  return (
    <>
      <CoreTable
        headers={headerData}
        data={tableData || []}
        expandedRows={expandedRows}
        toggleRow={handleRowClick}
        renderExpandedRow={extendedTableSchema ? renderExpandedRow : undefined}
        rowKeyAccessor={extendedTableSchema?.accessorKey || "id"}
        hasMore={hasMorePages}
        loadMore={handleNextPage}
        isLoading={isLoading}
        lastElementRef={lastElementRef}
        customStyles={customStyles}
        headerClasses={headerClasses}
        customClassTr1={customeClassTr1}
        customClassTr2={customeClassTr2}
        alternateTr={alternateTr}
        customClassTbodyTr={customeClassTbodyTr}
        LoadingComponent={<LoadingPage />}
        NoRecordComponent={
          !isLoading && tableData?.length === 0 ? <NoRecord /> : null
        }
      />

      {tableData && tableData.length !== 0 && (
        <AdditionalData
          additionalData={additionalData}
          higherValue={higherValue}
        />
      )}
    </>
  );
}
