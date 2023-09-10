import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./utils/lang/i18n.ts";
// import "./utils/errorTracking/sentry";
import "./index.css";
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
