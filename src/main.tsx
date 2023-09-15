import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./utils/lang/i18n.ts";

/**
 *
 * Fix regeneratorRuntime is not defined
 */
import "regenerator-runtime";
// import "./utils/errorTracking/sentry";
import "./index.css";
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
