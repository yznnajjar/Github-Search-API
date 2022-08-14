import React, { useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
//Context
import AppProvider from "../lib/context/AppContext";
//Styles
import "antd/dist/antd.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={ queryClient }>
      <Hydrate state={ pageProps.dehydratedState }>
        <AppProvider>
          <Component { ...pageProps } />
        </AppProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
