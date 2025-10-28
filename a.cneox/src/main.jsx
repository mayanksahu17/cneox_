import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { Route, RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import AuthProvider from "./state/AuthContext.jsx";
import ToastProvider from "./provider/ToastProvider.jsx";
import Loader from "./component/Loader/Main.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Loader>
    <ToastProvider />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Loader>
  // </React.StrictMode>
);
