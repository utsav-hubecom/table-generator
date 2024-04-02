export default async function ApiBuilder(data, tableSchema, setFilter) {
  try {
    const transformedHeaderData = await headerBuilder(tableSchema, setFilter);

    const transformedBodyData = await bodyBuilder(data, tableSchema);

    return {
      header: transformedHeaderData,
      body: transformedBodyData,
    };
  } catch (error) {
    console.error("Error from ApiBuilder function", error);
  }
}

async function headerBuilder(tableSchema, setFilter) {
  try {
    let headerSchema = await Promise.all(
      Object.keys(tableSchema).map(async (key) => {
        function setFilterValue(keyForFilter, value) {
          setFilter((prev) => {
            let updatedValue = { ...prev };

            if (value === undefined) {
              updatedValue[key] = keyForFilter;
            } else {
              updatedValue[keyForFilter] = value;
            }

            return updatedValue;
          });
        }

        return {
          Header: tableSchema[key].headerLabel,
          accessor: key,
          HTML: await tableSchema[key].headerReflact(
            tableSchema[key].headerLabel,
            setFilterValue
          ),
          filterHTML:
            typeof tableSchema[key]?.filterReflact === "function"
              ? await tableSchema[key]?.filterReflact(setFilterValue)
              : null,
          ...tableSchema[key]?.headerUtils,
        };
      })
    );

    return headerSchema;
  } catch (error) {
    console.error("Error from headerBuilder function", error);
  }
}

async function bodyBuilder(data, tableSchema) {
  try {
    let bodySchemaV2 = await Promise.all(
      data.map(async (dataObject) => {
        let headerData = await Promise.all(
          Object.keys(tableSchema).map(async (key) => {
            let curSchemaValue = tableSchema[key];

            let currentValue = dataObject[key] || "Null";

            return {
              value: currentValue,
              accessor: key,
              HTML: await curSchemaValue.dataValueReflact(
                dataObject[key],
                dataObject
              ),
              ...curSchemaValue?.dataUtils,
            };
          })
        );

        return headerData;
      })
    );

    return bodySchemaV2;
  } catch (error) {
    console.error("Error from bodyBuilder function", error);
  }
}
