import React from "react";

interface CellData {
  accessor: string;
  HTML: React.ReactNode;
  class?: string;
  value?: any;
}

interface TableBodyProps {
  // Array of rows, where each row is an array of cells
  data: CellData[][];
  expandedRows: string[];
  toggleRow: (key: any) => void;
  // Render prop for expanded content
  renderExpandedRow?: (rowKey: any) => React.ReactNode;
  // Accessor key to identify the row (e.g., 'id')
  rowKeyAccessor: string;

  alternateTr?: string;
  customClassTbodyTr?: string;
  isLoading?: boolean;
  LoadingComponent?: React.ReactNode;
  NoRecordComponent?: React.ReactNode;
  lastElementRef?: (node: HTMLElement | null) => void;
}

export const TableBody: React.FC<TableBodyProps> = ({
  data,
  expandedRows,
  toggleRow,
  renderExpandedRow,
  rowKeyAccessor,
  alternateTr = "",
  customClassTbodyTr = "",
  isLoading,
  LoadingComponent,
  NoRecordComponent,
  lastElementRef,
}) => {
  if (data && data.length > 0) {
    return (
      <tbody className="bg-white divide-y-2 divide-gray-50">
        {data.map((rowData, index) => {
          // Find the value used for the unique key (e.g. ID)
          const keyCell = rowData.find(
            (cell) => cell.accessor === rowKeyAccessor
          );
          const rowKey = keyCell?.value;
          const isExpanded = expandedRows.includes(rowKey);

          // Ref for infinite scroll on the last item
          const isLastItem = index === data.length - 1;

          return (
            <React.Fragment key={index}>
              <tr
                ref={isLastItem && lastElementRef ? lastElementRef : null}
                className={`${
                  index % 2 === 0
                    ? "bg-white"
                    : `${alternateTr || "bg-slate-50/30"}`
                } group transition-all duration-200 hover:bg-sky-50/50 hover:shadow-sm border-b border-gray-100 last:border-b-0 text-center text-sm font-medium text-slate-600 table-generator-trbody ${customClassTbodyTr}`}
                onClick={() => {
                  if (renderExpandedRow && rowKey) {
                    toggleRow(rowKey);
                  }
                }}
              >
                {rowData.map((cell, i) => (
                  <td
                    className={`${
                      cell.accessor || ""
                    } row py-3 pr-4 px-4 whitespace-nowrap ${cell.class || ""}`}
                    key={`${index}-${i}`}
                  >
                    <div className=""></div>
                    {cell.HTML || "Error occurred"}
                  </td>
                ))}
              </tr>
              {isExpanded && renderExpandedRow && (
                <tr>
                  <td colSpan={rowData.length}>{renderExpandedRow(rowKey)}</td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  }

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={100}>{LoadingComponent}</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      <tr>
        <td colSpan={100}>{NoRecordComponent}</td>
      </tr>
    </tbody>
  );
};
