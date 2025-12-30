import { TableSchema, SetFilterValue } from "../types/index";
import { safeAccess } from "./helpers";

export interface TransformedHeader {
  Header: string;
  accessor: string;
  HTML: React.ReactNode;
  filterHTML?: React.ReactNode;
  [key: string]: any;
}

export interface TransformedBodyCell {
  value: any;
  accessor: string;
  HTML: React.ReactNode;
  [key: string]: any;
}

export async function apiBuilder(
  data: any[],
  tableSchema: TableSchema,
  setFilter: React.Dispatch<React.SetStateAction<Record<string, any>>>
) {
  try {
    const transformedHeaderData = await headerBuilder(tableSchema, setFilter);
    const transformedBodyData = await bodyBuilder(data, tableSchema);

    return {
      header: transformedHeaderData,
      body: transformedBodyData,
    };
  } catch (error) {
    console.error("Error from apiBuilder function", error);
    return null; // Return null on error to handle gracefully
  }
}

async function headerBuilder(
  tableSchema: TableSchema,
  setFilter: React.Dispatch<React.SetStateAction<Record<string, any>>>
) {
  try {
    const headerSchema = await Promise.all(
      Object.keys(tableSchema).map(async (key) => {
        const setFilterValue: SetFilterValue = (keyForFilter, value) => {
          setFilter((prev) => {
            const updatedValue = { ...prev };
            if (value === undefined) {
              updatedValue[key] = keyForFilter; // This logic seems specific to the legacy implementation ???
            } else {
              updatedValue[keyForFilter] = value;
            }
            return updatedValue;
          });
        };

        const tableSchemaAccessor = tableSchema[key];
        if (!tableSchemaAccessor) {
             return {
                 Header: "Error",
                 accessor: key,
                 HTML: "Error"
             } as TransformedHeader;
        }

        return {
          Header: tableSchemaAccessor.headerLabel,
          accessor: key,
          HTML: await tableSchemaAccessor.headerReflact(
            tableSchemaAccessor.headerLabel,
            setFilterValue
          ),
          filterHTML:
            typeof tableSchemaAccessor?.filterReflact === "function"
              ? await tableSchemaAccessor?.filterReflact(setFilterValue)
              : null,
          ...tableSchemaAccessor?.headerUtils,
        } as TransformedHeader;
      })
    );

    return headerSchema;
  } catch (error) {
    console.error("Error from headerBuilder function", error);
    return [];
  }
}

async function bodyBuilder(data: any[], tableSchema: TableSchema) {
  try {
    if (!data) return [];
    
    const bodySchemaV2 = await Promise.all(
      data.map(async (dataObject) => {
        const headerData = await Promise.all(
          Object.keys(tableSchema).map(async (key) => {
            const curSchemaValue = tableSchema[key];
            const currentValue = safeAccess(dataObject, key) || "";

            if (!curSchemaValue) {
                return {
                    value: currentValue,
                    accessor: key,
                    HTML: currentValue
                } as TransformedBodyCell;
            }

            return {
              value: currentValue,
              accessor: key,
              HTML: await curSchemaValue.dataValueReflact(
                currentValue,
                dataObject
              ),
              ...curSchemaValue.dataUtils,
            } as TransformedBodyCell;
          })
        );

        return headerData;
      })
    );

    return bodySchemaV2;
  } catch (error) {
    console.error("Error from bodyBuilder function", error);
    return [];
  }
}
