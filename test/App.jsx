import { useState } from "react";
import { TableGenerator, useFetch } from "../index";

const data = [
  {
    name: "James Smith",
    id: "1",
    type: { first: "45", second: "56" },
  },
  { name: "Michael Johnson", id: "2", type: { first: null, second: "56" } },
  { name: "Robert Williams", id: "3", type: { first: "45", second: "56" } },
  { name: "Maria Garcia", id: "4", type: { first: "45", second: "56" } },
  { name: "David Jones", id: "5", type: { first: "45", second: "56" } },
  { name: "Jennifer Brown", id: "6", type: { first: "45", second: "56" } },
  { name: "Patricia Miller", id: "7", type: { first: "45", second: "56" } },
  { name: "Linda Wilson", id: "8", type: { first: "45", second: "56" } },
  { name: "Barbara Moore", id: "9", type: { first: "45", second: "56" } },
  { name: "Elizabeth Taylor", id: "10", type: { first: "45", second: "56" } },
  { name: "Susan Anderson", id: "11", type: { first: "45", second: "56" } },
  { name: "Jessica Thomas", id: "12", type: { first: "45", second: "56" } },
  { name: "Sarah Jackson", id: "13", type: { first: "45", second: "56" } },
  { name: "Karen White", id: "14", type: { first: "45", second: "56" } },
  { name: "Nancy Harris", id: "15", type: { first: "45", second: "56" } },
  { name: "Lisa Martin", id: "16", type: { first: "45", second: "56" } },
  { name: "Betty Thompson", id: "17", type: { first: "45", second: "56" } },
  { name: "Margaret Garcia", id: "18", type: { first: "45", second: "56" } },
  { name: "Sandra Martinez", id: "19", type: { first: "45", second: "56" } },
  { name: "Ashley Robinson", id: "20", type: { first: "45", second: "56" } },
  { name: "Kimberly Clark", id: "21", type: { first: "45", second: "56" } },
  { name: "Emily Rodriguez", id: "22", type: { first: "45", second: "56" } },
  { name: "Donna Lewis", id: "23", type: { first: "45", second: "56" } },
  { name: "Michelle Walker", id: "24", type: { first: "45", second: "56" } },
  { name: "Dorothy Hall", id: "25", type: { first: "45", second: "56" } },
  { name: "Carol Allen", id: "26", type: { first: "45", second: "56" } },
  { name: "Amanda Young", id: "27", type: { first: "45", second: "56" } },
  { name: "Melissa King", id: "28", type: { first: "45", second: "56" } },
  { name: "Deborah Wright", id: "29", type: { first: "45", second: "56" } },
  { name: "Stephanie Lopez", id: "30", type: { first: "45", second: "56" } },
  { name: "Rebecca Hill", id: "31", type: { first: "45", second: "56" } },
  { name: "Laura Scott", id: "32", type: { first: "45", second: "56" } },
  { name: "Sharon Adams", id: "33", type: { first: "45", second: "56" } },
  { name: "Cynthia Baker", id: "34", type: { first: "45", second: "56" } },
  { name: "Kathleen Nelson", id: "35", type: { first: "45", second: "56" } },
  { name: "Amy Carter", id: "36", type: { first: "45", second: "56" } },
  { name: "Shirley Mitchell", id: "37", type: { first: "45", second: "56" } },
  { name: "Angela Perez", id: "38", type: { first: "45", second: "56" } },
  { name: "Helen Roberts", id: "39", type: { first: "45", second: "56" } },
  { name: "Anna Turner", id: "40", type: { first: "45", second: "56" } },
  { name: "Brenda Phillips", id: "41", type: { first: "45", second: "56" } },
  { name: "Pamela Campbell", id: "42", type: { first: "45", second: "56" } },
  { name: "Nicole Parker", id: "43", type: { first: "45", second: "56" } },
  { name: "Ruth Evans", id: "44", type: { first: "45", second: "56" } },
  { name: "Katherine Edwards", id: "45", type: { first: "45", second: "56" } },
  { name: "Samantha Collins", id: "46", type: { first: "45", second: "56" } },
  { name: "Christine Stewart", id: "47", type: { first: "45", second: "56" } },
  { name: "Debbie Sanchez", id: "48", type: { first: "45", second: "56" } },
  { name: "Megan Morris", id: "49", type: { first: "45", second: "56" } },
  { name: "Julie Rogers", id: "50", type: { first: "45", second: "56" } },
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

let dummySChema = {
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

export default function App() {
  const [filters, setFilters] = useState({});
  const fetchResult = useFetch(dummyFetch, 30, 0, filters);

  return (
    <>
      <TableGenerator
        fetchResults={fetchResult}
        tableSchema={dummySChema}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}
