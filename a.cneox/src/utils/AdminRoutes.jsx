import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoutes = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const allowedPaths = [
    "/admin/dashboard",
    "/admin/reports/daily-business-report",
    "/admin/reports/coin-payment-report",
    "/admin/reports/country-business-report",
    "/admin/reports/investments",
  ];

  // console.log(pathname);

  const userData = JSON.parse(localStorage.getItem("crown_admin"));

  if (userData?.role !== 3) {
    return <Outlet />;
  }

  return userData?.role === 3 && allowedPaths.includes(pathname) ? (
    <Outlet />
  ) : (
    <Navigate to={"/admin/dashboard"} />
  );
};

export default AdminRoutes;
