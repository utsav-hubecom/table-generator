import React, { useRef } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

interface CoreTableProps {
  headers: any[];
  data: any[][];
  expandedRows: string[];
  toggleRow: (key: any) => void;
  renderExpandedRow?: (rowKey: any) => React.ReactNode;
  rowKeyAccessor: string;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;

  customStyles?: React.CSSProperties;
  headerClasses?: string;
  customClassTr1?: string;
  customClassTr2?: string;
  alternateTr?: string;
  customClassTbodyTr?: string;

  LoadingComponent?: React.ReactNode;
  NoRecordComponent?: React.ReactNode;

  // Ref for infinite scroll
  lastElementRef?: (node: HTMLElement | null) => void;
}

export const CoreTable: React.FC<CoreTableProps> = ({
  headers,
  data,
  expandedRows,
  toggleRow,
  renderExpandedRow,
  rowKeyAccessor,
  hasMore,
  loadMore,
  isLoading,
  customStyles,
  headerClasses,
  customClassTr1,
  customClassTr2,
  alternateTr,
  customClassTbodyTr,
  LoadingComponent,
  NoRecordComponent,
  lastElementRef,
}) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200 ${customClassTbodyTr}`}
    >
      <div
        className="w-auto overflow-auto scroll_bar1 table-generator-div"
        style={{ maxHeight: "70vh", ...customStyles }}
        ref={tableContainerRef}
      >
        <table className="min-w-full table-fixed table-generator-table">
          <TableHeader
            headers={headers}
            customStyles={customStyles}
            headerClasses={headerClasses}
            customClassTr1={customClassTr1}
            customClassTr2={customClassTr2}
          />
          <TableBody
            data={data}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            renderExpandedRow={renderExpandedRow}
            rowKeyAccessor={rowKeyAccessor}
            alternateTr={alternateTr}
            customClassTbodyTr={customClassTbodyTr}
            isLoading={isLoading}
            LoadingComponent={LoadingComponent}
            NoRecordComponent={NoRecordComponent}
            lastElementRef={lastElementRef}
          />
        </table>
      </div>
    </div>
  );
};
