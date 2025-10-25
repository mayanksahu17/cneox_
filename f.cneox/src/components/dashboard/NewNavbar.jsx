import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../../constants/route";
import clsx from "clsx";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Logo } from "../../assets";
import { useAuth } from "../../hooks/useAuth";
import Notifications from "./Notifications";

export default function NewNavbar() {
  const navigate = useNavigate();
  const { user, logOutUser } = useAuth();

  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoute = (route) => {
    setActiveRoute(route);
    navigate(route);
    setDropdownOpen(false); // Close dropdown on route change
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };
  return (
    <nav className="z-50 bg-white py-2 px-4 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div
          className="cursor-pointer h-14 px-4 w-14 rounded-full bg-blue-100 flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            alt="Logo Image"
            className="w-[80%] h-full object-contain"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          {dropdownOpen ? (
            <FaTimes
              className="text-gray-600 cursor-pointer"
              size={24}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          ) : (
            <FaBars
              className="text-gray-600 cursor-pointer"
              size={24}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          )}
        </div>

        {/* Navigation Links (Hidden on mobile) */}
        <div className="hidden lg:flex space-x-6">
          {routes.map((el, index) => (
            <NavbarItem
              key={index}
              {...el}
              isActive={location.pathname === el.route}
              handleRoute={handleRoute}
            />
          ))}
        </div>
      </div>

      {/* Icons on the right side */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 lg:space-x-4 relative ">
          <Notifications />

          <div
            className="flex items-center  cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="h-10 w-10 sm:h-10 sm:w-10 bg-white rounded-full cursor-pointer flex items-center justify-center">
              <img
                src={
                  user?.user?.profile_picture
                    ? user?.user?.profile_picture
                    : Logo
                }
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>

            {isDropdownOpen && (
              <div className="text-black absolute top-10 z-50 sm:top-14 font-normal bg-white rounded shadow-sm mt-2 py-2 w-40 md:w-52 right-0 text-sm">
                <div
                  className="cursor-pointer px-3 py-1.5 hover:bg-gray-200"
                  onClick={() => navigate("/dashboard/settings/profile")}
                >
                  Settings
                </div>
                <div
                  className="cursor-pointer px-3 py-1.5 hover:bg-gray-200"
                  onClick={() => navigate("/dashboard/tickets/submit-ticket")}
                >
                  Help & Support
                </div>
                <div
                  className="cursor-pointer px-3 py-1.5 hover:bg-red-100 text-red-400"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {dropdownOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg p-4 space-y-4">
          {routes.map((el, index) => (
            <DropdownItem
              key={index}
              {...el}
              isActive={location.pathname === el.route}
              handleRoute={handleRoute}
            />
          ))}
        </div>
      )}
    </nav>
  );
}

function NavbarItem({ name, route, isActive, handleRoute, icon: Icon }) {
  return (
    <div
      className={clsx(
        "flex items-center space-x-2 text-gray-600 cursor-pointer",
        isActive
          ? "font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full"
          : "font-normal"
      )}
      onClick={() => handleRoute(route)}
    >
      <Icon size={16} />
      <span>{name}</span>
    </div>
  );
}

function DropdownItem({ name, route, isActive, handleRoute, icon: Icon }) {
  return (
    <div
      className={clsx(
        "flex items-center space-x-2 text-gray-600 cursor-pointer p-2",
        isActive
          ? "font-bold text-blue-500 bg-blue-50 rounded-lg"
          : "font-normal"
      )}
      onClick={() => handleRoute(route)}
    >
      <Icon size={16} />
      <span>{name}</span>
    </div>
  );
}
