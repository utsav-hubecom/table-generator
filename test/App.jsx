import { useState } from "react";
import { TableGenerator, useFetch } from "../dist/react-tablegenerator.js";

const data = [
  { name: "James Smith", id: "1" },
  { name: "Michael Johnson", id: "2" },
  { name: "Robert Williams", id: "3" },
  { name: "Maria Garcia", id: "4" },
  { name: "David Jones", id: "5" },
  { name: "Jennifer Brown", id: "6" },
  { name: "Patricia Miller", id: "7" },
  { name: "Linda Wilson", id: "8" },
  { name: "Barbara Moore", id: "9" },
  { name: "Elizabeth Taylor", id: "10" },
  { name: "Susan Anderson", id: "11" },
  { name: "Jessica Thomas", id: "12" },
  { name: "Sarah Jackson", id: "13" },
  { name: "Karen White", id: "14" },
  { name: "Nancy Harris", id: "15" },
  { name: "Lisa Martin", id: "16" },
  { name: "Betty Thompson", id: "17" },
  { name: "Margaret Garcia", id: "18" },
  { name: "Sandra Martinez", id: "19" },
  { name: "Ashley Robinson", id: "20" },
  { name: "Kimberly Clark", id: "21" },
  { name: "Emily Rodriguez", id: "22" },
  { name: "Donna Lewis", id: "23" },
  { name: "Michelle Walker", id: "24" },
  { name: "Dorothy Hall", id: "25" },
  { name: "Carol Allen", id: "26" },
  { name: "Amanda Young", id: "27" },
  { name: "Melissa King", id: "28" },
  { name: "Deborah Wright", id: "29" },
  { name: "Stephanie Lopez", id: "30" },
  { name: "Rebecca Hill", id: "31" },
  { name: "Laura Scott", id: "32" },
  { name: "Sharon Adams", id: "33" },
  { name: "Cynthia Baker", id: "34" },
  { name: "Kathleen Nelson", id: "35" },
  { name: "Amy Carter", id: "36" },
  { name: "Shirley Mitchell", id: "37" },
  { name: "Angela Perez", id: "38" },
  { name: "Helen Roberts", id: "39" },
  { name: "Anna Turner", id: "40" },
  { name: "Brenda Phillips", id: "41" },
  { name: "Pamela Campbell", id: "42" },
  { name: "Nicole Parker", id: "43" },
  { name: "Ruth Evans", id: "44" },
  { name: "Katherine Edwards", id: "45" },
  { name: "Samantha Collins", id: "46" },
  { name: "Christine Stewart", id: "47" },
  { name: "Debbie Sanchez", id: "48" },
  { name: "Megan Morris", id: "49" },
  { name: "Julie Rogers", id: "50" },
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
    Header: "Id",
    headerReflact: (value) => {
      return <p>{value}</p>;
    },
    dataValueReflact: (value) => {
      return <p>{value}</p>;
    },
  },
  name: {
    Header: "Name",
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
