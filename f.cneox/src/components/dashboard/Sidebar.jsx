import React from "react";
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
        "z-50 flex flex-col transition-all duration-300 ease-in-out h-screen fixed lg:relative lg:translate-x-0",
        // theme: deep navy background used by crypto dashboard
        "bg-[#000000] border-r border-[#0c1b2a] text-white",
        isOpen ? "w-64" : "w-20",
        // keep collapsed behaviour on small screens
        !isOpen && "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#0c1b2a]">
        <div className="flex items-center">
          <div
            className={clsx(
              "flex items-center justify-center rounded-xl",
              isOpen ? "w-14 h-14" : "w-12 h-12"
            )}
            style={{ background: "linear-gradient(180deg,#101827,#08131b)" }}
          >
            <img
              src="/assets/logo1.png"
              alt="Logo"
              className={clsx(
                "object-contain cursor-pointer",
                isOpen ? "w-12 h-12" : "w-9 h-9"
              )}
              onClick={() => navigate("/")}
            />
          </div>

          {isOpen && (
            <div className="ml-3">
              <h1 className="text-lg font-semibold tracking-wide text-[#f6b50a]">
                CNEOX
              </h1>
              <p className="text-xs text-[#9fb0c1]"> Dashboard</p>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className={clsx(
            "p-2 rounded-md transition-transform",
            "hover:bg-white/5",
            "focus:outline-none"
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={18}
            className={clsx(
              "transition-transform",
              isOpen ? "rotate-0 text-[#cbd5e1]" : "rotate-180 text-[#cbd5e1]"
            )}
          />
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
      <div className="p-4 border-t border-[#0c1b2a]">
        <div className="flex flex-col gap-3">
          {/* Support */}
          <button
            onClick={() => navigate("/dashboard/tickets/submit-ticket")}
            className="flex items-center gap-3 text-sm text-[#cfe6ff] hover:text-white transition px-3 py-2 rounded-md hover:bg-white/3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-[#9fb0c1]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0a9.003 9.003 0 01-12.728 0m12.728 0l1.414-1.414m-14.142 1.414L4.222 4.222"
              />
            </svg>
            <span className="flex-1">{/* show only when open */}</span>
            <span className={clsx(isOpen ? "inline" : "hidden")}>Support</span>
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="flex items-center gap-3 text-sm text-[#ffb3b3] hover:text-white transition px-3 py-2 rounded-md hover:bg-white/3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-[#ffb3b3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-12"
              />
            </svg>
            <span className={clsx(isOpen ? "inline" : "hidden")}>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ name, route, icon: Icon, isActive, handleRoute, isOpen }) {
  return (
    <div
      onClick={() => handleRoute(route)}
      className={clsx(
        "flex items-center px-3 py-2 cursor-pointer transition-colors select-none",
        // active styling: left yellow accent + slightly brighter bg
        isActive
          ? "bg-transparent"
          : "hover:bg-white/2"
      )}
    >
      {/* active left indicator */}
      <div
        className={clsx(
          "w-1 h-10 rounded-r-md mr-3 transition-all",
          isActive ? "bg-[#f6b50a]" : "bg-transparent"
        )}
      />

      <div
        className={clsx(
          "flex items-center gap-3 w-full",
          isOpen ? "" : "justify-center"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-10 h-10 rounded-md",
            // subtle dark tile for icon
            isActive ? "bg-white/5" : "bg-transparent"
          )}
        >
          {/* icon color to white/soft-blue */}
          <Icon size={18} className={clsx(isActive ? "text-[#ffd77a]" : "text-[#cfe6ff]")} />
        </div>

        {isOpen && (
          <div className="flex flex-col">
            <span className={clsx("text-sm font-medium", isActive ? "text-[#f6b50a]" : "text-[#cfe6ff]")}>
              {name}
            </span>
            {/* small muted subtitle space for consistency with screenshot */}
            <span className="text-xs text-[#6f8aa0] hidden"> {/* optional subtitle */} </span>
          </div>
        )}
      </div>
    </div>
  );
}
