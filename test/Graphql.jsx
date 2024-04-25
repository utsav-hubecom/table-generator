import { useState } from "react";

import { gql } from "@apollo/client";
import { TableGenerator, useFetchGQL } from "../dist/react-tablegenerator.js";

const getStaffQuery = (page, limit, filters) => {
  return gql`
    query getStaff{
      queryResponse: adminPagination(
        page: ${page}
        perPage: ${limit}
        filter: {}
      ) {
        items {
          commissionPer
          email
        }
        pageInfo {
          currentPage
          hasNextPage
          hasPreviousPage
          itemCount
          pageCount
          perPage
          __typename
        }
      }
    }
  `;
};

const StaffTableSchema = {
  commissionPer: {
    headerLabel: "commissionPer#",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "text-center font-medium min-w-[4rem]",
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div>
          <p>{dataValue}</p>
        </div>
      );
    },
  },
  email: {
    headerLabel: "email#",
    headerReflact: (value) => {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    },
    headerUtils: {
      class: "text-center font-medium min-w-[4rem]",
    },
    dataValueReflact: (dataValue, row) => {
      return (
        <div>
          <p>{dataValue}</p>
        </div>
      );
    },
  },
};

export default function StaffTable() {
  const [filters, setFilters] = useState({});

  let fetchResults = useFetchGQL(getStaffQuery, 30, filters);

  return (
    <>
      <div className="flow-root">
        <div className=" overflow-x-auto overflow-y-auto table-height-70 scroll-bar-gray-ds">
          {" "}
          {/*sm:-mx-6 lg:-mx-8 */}
          <div className="inline-block min-w-full py-4  align-middle sm:px-6 lg:px-6">
            <TableGenerator
              fetchResults={fetchResults}
              filters={filters}
              setFilters={setFilters}
              tableSchema={StaffTableSchema}
              customStyles={{
                backgroundColor: "white",
                borderBottom: "2px solid #f7f7f7",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
