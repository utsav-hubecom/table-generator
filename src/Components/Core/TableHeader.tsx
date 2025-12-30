import React from "react";

interface HeaderCell {
  accessor: string;
  HTML: React.ReactNode;
  filterHTML?: React.ReactNode;
  class?: string;
}

interface TableHeaderProps {
  headers: HeaderCell[];
  customStyles?: React.CSSProperties;
  headerClasses?: string;
  customClassTr1?: string;
  customClassTr2?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  customStyles,
  headerClasses = "",
  customClassTr1 = "",
  customClassTr2 = "",
}) => {
  if (!headers || headers.length === 0) return null;

  return (
    <thead
      className={`sticky top-0 z-30 ${headerClasses}`}
      style={customStyles}
    >
      <tr className={`text-gray-900 font-semibold ${customClassTr1}`}>
        {headers.map((column) => (
          <th
            scope="col"
            key={column.accessor}
            className={`py-2 px-3 text-center text-xs ${column.accessor} ${
              column.class || ""
            } header table-generator-th`}
          >
            {column.HTML || "Error occurred"}
          </th>
        ))}
      </tr>
      <tr className={`text-gray-900 ${customClassTr2}`}>
        {headers.map((column) => (
          <React.Fragment key={`${column.accessor}-filter`}>
            {column.filterHTML ? (
              <th
                scope="col"
                className={`pb-2 px-3 text-center text-xs ${column.accessor} ${
                  column.class || ""
                } header filter-class`}
              >
                {column.filterHTML}
              </th>
            ) : (
              <th className=""></th>
            )}
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
};
