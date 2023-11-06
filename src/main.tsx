import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./utils/lang/i18n.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { FirebaseProvider } from "./base/store/context/FirebaseContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecoilRoot>
    <FirebaseProvider>
      <>
      <App />
          <ToastContainer 
          bodyStyle={{ zIndex: 1500 }}
          toastStyle={{ zIndex: 10000 }}
          autoClose={2500}
          pauseOnHover={false}
          containerId="toast-container"
          toastClassName={"toast-main"}
          
          /> 
          </>
    </FirebaseProvider>
      </RecoilRoot>
      </LocalizationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </React.StrictMode>
);
