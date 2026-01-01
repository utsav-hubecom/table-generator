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
      className={`sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm border-b-2 border-gray-300 shadow-sm ${headerClasses}`}
      style={customStyles}
    >
      <tr
        className={`text-slate-700 uppercase tracking-wider font-semibold text-xs ${customClassTr1}`}
      >
        {headers.map((column) => (
          <th
            scope="col"
            key={column.accessor}
            className={`py-4 px-4 text-center whitespace-nowrap ${
              column.accessor
            } ${
              column.class || ""
            } header table-generator-th transition-colors hover:bg-slate-100/50`}
          >
            {column.HTML || "Error occurred"}
          </th>
        ))}
      </tr>
      <tr className={`bg-white text-gray-900 ${customClassTr2}`}>
        {headers.map((column) => (
          <React.Fragment key={`${column.accessor}-filter`}>
            {column.filterHTML ? (
              <th
                scope="col"
                className={`pb-3 px-4 text-center text-xs ${column.accessor} ${
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
