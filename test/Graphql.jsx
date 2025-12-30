import { useState } from "react";

import { gql } from "@apollo/client";
import { TableGenerator, useFetchGQL } from "../index.js";

const getStaffQuery = (page, limit, filters) => {
  return gql`
    query getStaff($page: Int, $perPage: Int) {
      queryResponse: orderPagination(
        page: $page
        perPage: $perPage
        filter: {}
      ) {
        items {
          createdAt
          currency
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
  currency: {
    headerLabel: "currency#",
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
  createdAt: {
    headerLabel: "createdAt#",
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
  // Increased limit to 30 to ensure vertical overflow for scrolling
  const fetchResult = useFetchGQL(getStaffQuery, 30, filters);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Staff Table Test
      </h1>
      <div className="bg-white rounded-lg shadow p-4 h-[80vh] overflow-hidden">
        {/* TableGenerator handles its own scrolling, but we constrain the parent height */}
        <TableGenerator
          fetchResults={fetchResult}
          tableSchema={StaffTableSchema}
          filters={filters}
          setFilters={setFilters}
          customStyles={{
            backgroundColor: "white",
            borderBottom: "2px solid #f7f7f7",
          }}
        />
      </div>
    </div>
  );
}
