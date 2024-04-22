import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import ApiBuilder from "@Modules/ApiBuilder/index.js";
import { debounce } from "@Config/helperFunctions.js";

import NoRecord from "@Components/NoRecord/NoRecord.jsx";
import AdditionalData from "@Components/AdditionalData/AdditionalData.jsx";
import LoadingPage from "@Components/LoadingPage/LoadingPage.jsx";

export function TableGenerator({
  fetchResults,
  tableSchema,
  filters = {},
  setFilters = () => {},
  customStyles = {
    backgroundColor: "white",
    borderBottom: "2px solid #f7f7f7",
  },
  customeClass = "divide-x-2 divide-gray-50",
}) {
  const {
    isLoading,
    isError,
    apiResponse,
    nextPage,
    resetPagination,
    paginationObj,
  } = fetchResults;

  const { limit } = paginationObj;

  const [headerData, setHeaderData] = useState([]);
  const [tableData, setTableData] = useState(null);
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
      if (apiResponse && !isLoading && !isError && hasMorePages) {
        const { totalPages, currentPage } = apiResponse?.additionalInfo ?? {};

        let updateApiData = await ApiBuilder(
          apiResponse?.data,
          tableSchema,
          setFilters
        );

        if (updateApiData) {
          setHeaderData(updateApiData?.header);
          setTableData((prev) => {
            let updatedData = [...(prev ?? []), ...(updateApiData?.body ?? [])];
            return updatedData;
          });
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
        className="relative w-full  overflow-auto scroll_bar1 "
        ref={table}
        id="dashboard_table"
        style={{ minHeight: "70vh", maxHeight: "70vh" }}
      >
        <table className="min-w-full table-fixed">
          <thead className={`sticky top-0 z-30 `} style={customStyles}>
            <tr className={` ${customeClass} `}>
              {headerData?.length !== 0 &&
                headerData?.map((column) => {
                  return (
                    <>
                      <th
                        scope="col"
                        key={column.accessor}
                        className={`py-2 px-3 text-center text-xs font-semibold text-gray-900 ${
                          column.accessor
                        } ${column?.class ? column.class : ""} header`}
                      >
                        {column.HTML || "Error occurred"}
                      </th>
                    </>
                  );
                })}
            </tr>
            <tr className={` ${customeClass} `}>
              {headerData?.length !== 0 &&
                headerData?.map((column) => {
                  return (
                    <>
                      {column.filterHTML ? (
                        <th
                          scope="col"
                          key={column.accessor}
                          className={`py-2 px-3 text-center text-xs font-semibold text-gray-900 ${
                            column.accessor
                          } ${column?.class ? column.class : ""} header`}
                        >
                          {column.filterHTML}
                        </th>
                      ) : null}
                    </>
                  );
                })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y-2 divide-gray-50 ">
            {tableData && tableData?.length !== 0 ? (
              tableData.map((rowData, index) => {
                return (
                  <tr
                    className="text-center bg-gray-50/10 hover:bg-gray-100 divide-x-2  divide-zinc-50 group slide-up-animation"
                    key={index}
                  >
                    {rowData.map((rowItems, i) => {
                      return (
                        <td
                          className={`${
                            rowItems.accessor || ""
                          } row  py-1 pr-3  font-bold px-3 text-gray-600  ${
                            rowItems?.class ? rowItems.class : ""
                          }`}
                          key={`${index}${i}`}
                          style={{
                            fontSize: "11px",
                          }}
                        >
                          <div className=""></div>
                          {rowItems.HTML || "Error occurred"}
                        </td>
                      );
                    })}
                  </tr>
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
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  customeClass: PropTypes.object,
};
