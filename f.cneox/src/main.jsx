import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "./styles/vendors/menu.css";
import "./styles/style.css";
import ToastProvider from "./providers/ToastProvider.jsx";
import AuthProvider from "./state/AuthContext.jsx";
import Loader from "./components/dashboard/Loader.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Loader>
  <AuthProvider>
    <ToastProvider />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
  // </Loader>
);
