import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Notifications } from 'react-push-notification';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <ToastContainer />
      <Notifications />
    </HelmetProvider>
  </React.StrictMode>
);
