import { ReactNode } from "react";

export interface PaginationObject {
  limit: number;
}

export interface AdditionalInfo {
  totalPages: number;
  currentPage: number;
  totalDocuments?: number;
  [key: string]: any;
}

export interface ApiResponse {
  data: any[];
  additionalInfo: AdditionalInfo;
}

export interface FetchResults {
  isLoading: boolean;
  isError: boolean;
  apiResponse?: ApiResponse;
  nextPage: () => void;
  resetPagination: () => void;
  paginationObj: PaginationObject;
}

export type SetFilterValue = (keyForFilter: string, value?: any) => void;

export interface TableColumnSchema<T = any> {
  headerLabel: string;
  headerReflact: (label: string, setFilterValue: SetFilterValue) => ReactNode;
  filterReflact?: (setFilterValue: SetFilterValue) => ReactNode;
  dataValueReflact: (value: any, rowData: T) => ReactNode;
  headerUtils?: Record<string, any>;
  dataUtils?: Record<string, any>;
}

export interface TableSchema<T = any> {
  [key: string]: TableColumnSchema<T>;
}

export interface ExtendedTableSchema<T = any> {
  extendedDataKey: string;
  accessorKey: string;
  extendedSchema: TableSchema<T>;
}

export interface TableGeneratorProps<T = any> {
  fetchResults: FetchResults;
  tableSchema: TableSchema<T>;
  extendedTableSchema?: ExtendedTableSchema<T>;
  filters?: Record<string, any>;
  setFilters?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  customStyles?: React.CSSProperties;
  headerClasses?: string;
  customeClassTr1?: string;
  customeClassTr2?: string;
  customeClassTbodyTr?: string;
  alternateTr?: string;
}
