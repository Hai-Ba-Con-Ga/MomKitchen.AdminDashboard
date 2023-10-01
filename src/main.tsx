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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import "./index.css";
import queryClient from "./services/queryClient.ts";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecoilRoot>
          <App />
      </RecoilRoot>
      </LocalizationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
