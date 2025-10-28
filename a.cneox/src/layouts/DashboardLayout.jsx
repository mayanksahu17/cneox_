import React, { useState } from "react";
import { Navbar, Sidebar } from "../component";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  window.addEventListener("load", () => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
  });

  return (
    <>
      <Sidebar isOpen={sideBarOpen} setFunc={setSideBarOpen} />
      {/* {sideBarOpen ? (
      ) : (
        // <Sidebar setFunc={setSideBarOpen} />
        ""
      )} */}
      <Navbar openFunc={setSideBarOpen} openSideBar={sideBarOpen} />
      <div className={sideBarOpen ? "lg:ml-72" : ""}>
        {/* <div className="py-28 pb-20 px-8 sm:px-16 w-full h-full bg-gray-100 "> */}
        <div className="py-28 pb-20 px-8 sm:px-16 w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
