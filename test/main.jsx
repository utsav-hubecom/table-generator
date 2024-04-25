import React from "react";

import ReactDOM from "react-dom/client";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import App from "./App";
import StaffTable from "./Graphql";

const graphqlClient = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={graphqlClient}>
      {/* <App></App> */}
      <StaffTable />
    </ApolloProvider>
  </React.StrictMode>
);
