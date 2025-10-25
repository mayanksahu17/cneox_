import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../../constants/route";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoute = (route) => {
    navigate(route);
  };

  return (
    <div
      className={clsx(
        "z-50 flex flex-col transition-all duration-300 ease-in-out h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
        isOpen ? "w-64" : "w-20",
        "fixed lg:relative lg:translate-x-0",
        !isOpen && "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
        <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
  <img
    src="/assets/logo1.png"
    alt="Logo"
    className="w-16 h-16 object-contain"
    onClick={() => navigate("/")}
  />
</div>

          {isOpen && (
            <h1 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">
              Crown Bankers
            </h1>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Routes */}
      <div className="flex flex-col overflow-y-auto py-4 flex-1">
        {routes.map((el, index) => (
          <SidebarItem
            key={index}
            {...el}
            isActive={location.pathname === el.route}
            handleRoute={handleRoute}
            isOpen={isOpen}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          {/* Support */}
          <button
            onClick={() => navigate("/dashboard/tickets/submit-ticket")}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0a9.003 9.003 0 01-12.728 0m12.728 0l1.414-1.414m-14.142 1.414L4.222 4.222"
              />
            </svg>
            {isOpen && <span>Support</span>}
          </button>


          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-12"
              />
            </svg>
            {isOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ name, route, icon: Icon, isActive, handleRoute, isOpen }) {
  return (
    <div
      className={clsx(
        "flex items-center px-4 py-2 cursor-pointer",
        isActive
          ? "bg-gray-50 dark:bg-gray-700 text-green-600 dark:text-green-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      )}
      onClick={() => handleRoute(route)}
    >
      <div className="flex items-center">
        <Icon size={20} />
        {isOpen && <span className="ml-3">{name}</span>}
      </div>
    </div>
  );
}
