import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Menu, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import Notifications from "./Notifications";

const Navbar = ({ pageTitle, toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logOutUser } = useAuth();
  const { theme, setTheme } = useTheme();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };
  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#0c1b2a] bg-[#000000] text-white">
      <div className="flex items-center justify-between px-5 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-[#0b1c2d] hover:bg-[#11283f] transition lg:hidden"
          >
            <Menu size={20} className="text-[#cfe6ff]" />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-wide text-[#f6b50a]">
              {pageTitle}
            </h1>
            <p className="text-xs text-[#8fa5bb] hidden md:block">
              Let’s check your update today
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[#0b1c2d] hover:bg-[#11283f] transition"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-[#f6b50a]" />
            ) : (
              <Moon size={18} className="text-[#cfe6ff]" />
            )}
          </button> */}

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotification}
              className="p-2 rounded-full bg-[#0b1c2d] hover:bg-[#11283f] transition relative"
            >
              <Bell size={18} className="text-[#cfe6ff]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#f6b50a] rounded-full"></span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-80 z-50 rounded-lg border border-[#132b44] bg-[#0c1b2a] shadow-xl backdrop-blur-md">
                <Notifications />
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#0b1c2d] border-2 border-[#f6b50a] overflow-hidden">
                <img
                  src="/assets/logo1.png"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown
                size={16}
                className="hidden md:block text-[#9fb0c1]"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-lg border border-[#132b44] bg-[#0c1b2a] shadow-lg z-50">
                <div className="py-2 text-sm">
                  <Link
                    to="/dashboard/settings/profile"
                    className="block px-4 py-2 text-[#cfe6ff] hover:bg-[#11283f] rounded-md"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/dashboard/tickets/submit-ticket"
                    className="block px-4 py-2 text-[#cfe6ff] hover:bg-[#11283f] rounded-md"
                  >
                    Help & Support
                  </Link>
                  <div className="border-t border-[#132b44] my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-[#ffb3b3] hover:bg-[#2a1212] rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
