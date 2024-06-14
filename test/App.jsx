import { useState } from "react";
import { TableGenerator, useFetch, useFetchGQL } from "../index";

import { gql } from "@apollo/client";

import { PatientSchema } from "./Schema/schema";

const data = [
  {
    name: "James Smith",
    id: "1",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "Michael Johnson",
    id: "2",
    type: { first: null, second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "Robert Williams",
    id: "3",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "Maria Garcia",
    id: "4",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "David Jones",
    id: "5",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "Jennifer Brown",
    id: "6",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "Patricia Miller",
    id: "7",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
  {
    name: "Linda Wilson",
    id: "8",
    type: { first: "45", second: "56" },
    items: [
      { first: "45", second: "56" },
      { first: "45", second: "56" },
      { first: "45", second: "56" },
    ],
  },
];

async function dummyFetch() {
  return new Promise((resolve, reject) => {
    resolve({
      data,
      additionalInfo: {
        totalPages: 1,
        currentPage: 1,
      },
    });
  });
}

let dummySchema = {
  id: {
    headerLabel: "Id",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
  name: {
    headerLabel: "Name",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
  [`type.first`]: {
    headerLabel: "Namess",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
  [`type.second`]: {
    headerLabel: "Second",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
};

const GET_PATIENTS_QUERY = () => {
  return gql`
    query getUsers(
      $page: Int
      $perPage: Int
      $filter: FilterFindManyhighgate_usersInput
    ) {
      queryResponse: userPagination(
        page: $page
        perPage: $perPage
        filter: $filter
      ) {
        items {
          _id
          firstName
          lastName
          phoneNo
          reference
          status
          gender
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

let extendedTableSchema = {
  first: {
    headerLabel: "first",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
  second: {
    headerLabel: "first",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
};

export default function App() {
  const [filters, setFilters] = useState({});
  const fetchResult = useFetchGQL(GET_PATIENTS_QUERY, 30, filters);

  return (
    <>
      <TableGenerator
        fetchResults={fetchResult}
        tableSchema={PatientSchema}
        extendedTableSchema={{
          extendedDataKey: "items",
          accessorKey: "id",
          extendedSchema: extendedTableSchema,
        }}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}
