import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import ApiBuilder from "@Modules/ApiBuilder/index.js";
import { debounce } from "@Config/helperFunctions.js";

import NoRecord from "@Components/NoRecord/NoRecord.jsx";
import AdditionalData from "@Components/AdditionalData/AdditionalData.jsx";
import LoadingPage from "@Components/LoadingPage/LoadingPage.jsx";
import "./index.css";

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
}) {
  const {
    isLoading,
    isError,
    apiResponse,
    nextPage,
    resetPagination,
    paginationObj,
  } = fetchResults;

  const { extendedDataKey, accessorKey, extendedSchema } =
    extendedTableSchema ?? {};

  const { limit } = paginationObj;

  const [headerData, setHeaderData] = useState([]);
  const [tableData, setTableData] = useState(null);

  const [extendedHeaderDataObj, setExtendedHeaderDataObj] = useState({});
  const [extendedTableDataObj, setExtendedTableDataObj] = useState({});

  const [expandedRows, setExpandedRows] = useState([]);

  const [additionalData, setAdditionalData] = useState(null);

  const table = useRef();

  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    debounce(setHasMorePages(true), 300);
    setTableData(null);
    setAdditionalData(null);
    resetPagination();
  }, [filters]);

  const handleScroll = useCallback(
    debounce(() => {
      if (!table) {
        return;
      }

      if (!hasMorePages) {
        return;
      }

      // Calculate how close the user is to the bottom of the table
      const { scrollTop, scrollHeight, offsetHeight } = table.current;

      const scrollPosition = offsetHeight + scrollTop;

      const scrollMax = scrollHeight - 100;

      if (scrollPosition >= scrollMax) {
        // User has reached the bottom of the table, load more items
        nextPage();
      }
    }, 300),
    [nextPage]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (apiResponse && !isLoading && !isError) {
        const { totalPages, currentPage } = apiResponse?.additionalInfo ?? {};

        let updateApiData = await ApiBuilder(
          apiResponse?.data,
          tableSchema,
          setFilters
        );

        if (updateApiData) {
          setHeaderData(updateApiData?.header);
          if (tableData?.length > 0 && tableData?.length < limit) {
            setTableData((prev) => {
              let updatedData = [...(prev ?? []), ...[]];
              return updatedData;
            });
          } else {
            setTableData((prev) => {
              let updatedData = [
                ...(prev ?? []),
                ...(updateApiData?.body ?? []),
              ];
              return updatedData;
            });
          }
        }

        setAdditionalData(apiResponse?.additionalInfo);

        if (currentPage === totalPages) {
          setHasMorePages(false);
        } else {
          setHasMorePages(true);
        }
      }
    };

    fetchData();

    let tableEle = document.getElementById("dashboard_table");

    if (tableEle) {
      tableEle.addEventListener("scroll", handleScroll);
      return () => tableEle.removeEventListener("scroll", handleScroll);
    }
  }, [apiResponse]);

  const handleRowClick = async (key) => {
    const dataFromkey = apiResponse?.data?.find((data) => {
      if (data[accessorKey] === key) {
        return true;
      }
    });

    const extendeUpdatedApiData = await ApiBuilder(
      dataFromkey[extendedDataKey],
      extendedSchema,
      setFilters
    );

    if (extendeUpdatedApiData) {
      setExtendedHeaderDataObj((prevState) => {
        return { ...prevState, [key]: extendeUpdatedApiData?.header };
      });
      setExtendedTableDataObj((prevState) => {
        return { ...prevState, [key]: extendeUpdatedApiData?.body };
      });
    }

    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(key);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((rowKey) => rowKey !== key)
      : currentExpandedRows.concat(key);

    setExpandedRows(newExpandedRows);
  };

  const higherValue = Math.min(
    additionalData?.totalDocuments || 0,
    additionalData ? additionalData.currentPage * limit : 0
  );

  if (isError) {
    return "An error occurred";
  }

  return (
    <>
      <div
        className="relative w-full overflow-auto scroll_bar1 table-generator-div"
        ref={table}
        id="dashboard_table"
        style={{ minHeight: "70vh", maxHeight: "70vh" }}
      >
        <table className="min-w-full table-fixed table-generator-table">
          <thead
            className={`sticky top-0 z-30  ${headerClasses}`}
            style={customStyles}
          >
            <tr className={`text-gray-900 font-semibold ${customeClassTr1} `}>
              {headerData?.length !== 0 &&
                headerData?.map((column) => {
                  return (
                    <>
                      <th
                        scope="col"
                        key={column.accessor}
                        className={`py-2 px-3 text-center text-xs ${
                          column.accessor
                        } ${
                          column?.class ? column.class : ""
                        } header table-generator-th`}
                      >
                        {column.HTML || "Error occurred"}
                      </th>
                    </>
                  );
                })}
            </tr>
            <tr className={`text-gray-900 ${customeClassTr2} `}>
              {headerData?.length !== 0 &&
                headerData?.map((column) => {
                  return (
                    <>
                      {column.filterHTML ? (
                        <th
                          scope="col"
                          key={column.accessor}
                          className={`pb-2 px-3 text-center text-xs ${
                            column.accessor
                          } ${
                            column?.class ? column.class : ""
                          } header filter-class `}
                        >
                          {column.filterHTML}
                        </th>
                      ) : (
                        <th className=""></th>
                      )}
                    </>
                  );
                })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y-2 divide-gray-50 ">
            {tableData && tableData?.length !== 0 ? (
              tableData.map((rowData, index) => {
                const accessorObj = rowData.find((rowItem) => {
                  if (rowItem?.accessor == accessorKey) {
                    return true;
                  }
                });

                const extendedAccessorValue = accessorObj?.value;

                const isRowExpanded = expandedRows.includes(
                  extendedAccessorValue
                );

                const extendedTableData =
                  extendedTableDataObj[extendedAccessorValue];

                const extendedHeaderData =
                  extendedHeaderDataObj[extendedAccessorValue];

                return (
                  <>
                    <tr
                      className={`${
                        index % 2 === 0 ? undefined : ` ${alternateTr}`
                      } group slide-up-animation text-center text-xs font-semibold text-gray-600 bg-gray-50/10 hover:bg-gray-100 divide-x-2 divide-zinc-50 table-generator-trbody ${customeClassTbodyTr}`}
                      key={index}
                      onClick={() =>
                        extendedTableSchema &&
                        handleRowClick(extendedAccessorValue)
                      }
                    >
                      {rowData.map((rowItems, i) => {
                        return (
                          <td
                            className={`${
                              rowItems.accessor || ""
                            } row  py-1 pr-3  px-3 ${
                              rowItems?.class ? rowItems.class : ""
                            }`}
                            key={`${index}${i}`}
                          >
                            <div className=""></div>
                            {rowItems.HTML || "Error occurred"}
                          </td>
                        );
                      })}
                    </tr>

                    {isRowExpanded && (
                      <>
                        <table>
                          <thead>
                            <tr
                              className={`text-gray-900 font-semibold ${customeClassTr1} `}
                            >
                              {extendedHeaderData?.length !== 0 &&
                                extendedHeaderData?.map((column) => {
                                  return (
                                    <>
                                      <th
                                        scope="col"
                                        key={column.accessor}
                                        className={`py-2 px-3 text-center text-xs ${
                                          column.accessor
                                        } ${
                                          column?.class ? column.class : ""
                                        } header table-generator-th`}
                                      >
                                        {column.HTML || "Error occurred"}
                                      </th>
                                    </>
                                  );
                                })}
                            </tr>
                          </thead>

                          <tbody>
                            {extendedTableData &&
                            extendedTableData?.length !== 0
                              ? extendedTableData.map((extendedRowData) => {
                                  return (
                                    <>
                                      <tr className="group slide-up-animation text-center text-xs font-semibold text-gray-600 bg-gray-50/10 hover:bg-gray-100 divide-x-2 divide-zinc-50 table-generator-trbody">
                                        {extendedRowData.map(
                                          (
                                            extendedRowItems,
                                            extendedRowIndex
                                          ) => {
                                            return (
                                              <td
                                                className={`${
                                                  extendedRowItems.accessor ||
                                                  ""
                                                } row  py-1 pr-3  px-3 ${
                                                  extendedRowItems?.class
                                                    ? extendedRowItems.class
                                                    : ""
                                                }`}
                                              >
                                                <div className=""></div>
                                                {extendedRowItems.HTML ||
                                                  "Error occurred"}
                                              </td>
                                            );
                                          }
                                        )}
                                      </tr>
                                    </>
                                  );
                                })
                              : null}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                );
              })
            ) : isLoading ? (
              <>
                <LoadingPage />
              </>
            ) : (
              tableData?.length === 0 && <NoRecord />
            )}
          </tbody>
        </table>

        {tableData?.length !== 0 ? (
          <>
            <AdditionalData
              additionalData={additionalData}
              higherValue={higherValue}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

TableGenerator.propTypes = {
  fetchResults: PropTypes.object.isRequired,
  tableSchema: PropTypes.object.isRequired,
  extendedTableSchema: PropTypes.object,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  customeClassTr1: PropTypes.object,
  customeClassTr2: PropTypes.object,
  customeClassTbodyTr: PropTypes.object,
  alternateTr: PropTypes.object,
  headerClasses: PropTypes.string,
};
