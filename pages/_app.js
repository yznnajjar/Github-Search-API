import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//Context
import AppProvider from "../lib/context/AppContext";
//Styles
import "antd/dist/antd.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={ queryClient }>
      <AppProvider>
        <Component { ...pageProps } />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
