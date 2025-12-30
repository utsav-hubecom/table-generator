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
                  index % 2 === 0 ? undefined : ` ${alternateTr}`
                } group slide-up-animation text-center text-xs font-semibold text-gray-600 bg-gray-50/10 hover:bg-gray-100 divide-x-2 divide-zinc-50 table-generator-trbody ${customClassTbodyTr}`}
                onClick={() => {
                  if (renderExpandedRow && rowKey) {
                    toggleRow(rowKey);
                  }
                }}
              >
                {rowData.map((cell, i) => (
                  <td
                    className={`${cell.accessor || ""} row py-1 pr-3 px-3 ${
                      cell.class || ""
                    }`}
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
