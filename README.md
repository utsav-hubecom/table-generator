# React Table Generator

A powerful, customizable, and efficient React table library with built-in infinite scroll, nested rows, and TypeScript support.

## Features

- 🚀 **Infinite Scroll**: Built-in support for performant infinite scrolling.
- 📂 **Nested Rows**: Easily expandable rows for hierarchical data.
- 🎨 **Customizable**: Full control over headers, rows, and styles via schema.
- 🛡️ **TypeScript**: First-class type support for safety and easy development.
- 🧩 **Flexible Schema**: Define how your data is rendered using a declarative schema.

## Installation

```bash
npm install @utsavvan/react-tablegenerator
```

## Basic Usage

```tsx
import { TableGenerator, useFetch } from "@utsavvan/react-tablegenerator";
import { useState } from "react";

const MyTable = () => {
  const [filters, setFilters] = useState({});
  // Example fetching hook (or bring your own data)
  const fetchResults = useFetch(myApiFunction, 20, filters);

  const tableSchema = {
    id: {
      headerLabel: "ID",
      headerReflact: (label) => <span>{label}</span>,
      dataValueReflact: (value) => <strong>{value}</strong>,
    },
    name: {
      headerLabel: "Name",
      headerReflact: (label) => <span>{label}</span>,
      dataValueReflact: (value) => <span>{value}</span>,
    },
  };

  return (
    <TableGenerator
      fetchResults={fetchResults}
      tableSchema={tableSchema}
      filters={filters}
      setFilters={setFilters}
    />
  );
};
```

## Props

| Prop                  | Type                  | Description                                                    |
| --------------------- | --------------------- | -------------------------------------------------------------- |
| `fetchResults`        | `FetchResults`        | Object containing data, loading state, and pagination methods. |
| `tableSchema`         | `TableSchema`         | Configuration object for columns.                              |
| `extendedTableSchema` | `ExtendedTableSchema` | (Optional) Configuration for nested expandble rows.            |
| `filters`             | `object`              | Filter state object.                                           |
| `setFilters`          | `function`            | State setter for filters.                                      |
| `customStyles`        | `CSSProperties`       | Styles for the table header.                                   |

## Advanced Usage

### Nested Rows

To enable row expansion, pass `extendedTableSchema`:

```tsx
const extendedSchema = {
  details: {
    headerLabel: "Details",
    headerReflact: (l) => l,
    dataValueReflact: (v) => v,
  },
};

<TableGenerator
  // ...
  extendedTableSchema={{
    extendedDataKey: "subItems", // Key in your data object containing the nested array
    accessorKey: "id", // Key to identify unique rows
    extendedSchema: extendedSchema,
  }}
/>;
```

## License

MIT
