import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { ChevronDown } from "lucide-react"; // or whichever icon set you are using
import RoundButton from "./RoundButton";
import WhiteRoundButton from "./WhiteRoundButton";
// eslint-disable-next-line react/prop-types
const Navbar = ({ mobileMenu, setMobileMenu, color }) => {
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  const [mobileSubMenuSub, setMobileSubMenuSub] = useState("");
  const [menuTitle, setMenuTitle] = useState("");

  const handleMenu = () => {
    setMobileMenu(false);
    setMobileSubMenu("");
    setMobileSubMenuSub("");
  };

  const handleSubMenu = (e, id) => {
    e.preventDefault();
    setMobileSubMenu(id);

    if (e.target.tagName === "A") {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleSubMenuSub = (e, id) => {
    e.preventDefault();
    setMobileSubMenuSub(id);
    if (e.target.tagName === "A") {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleGoBack = () => {
    if (mobileSubMenuSub) {
      setMobileSubMenuSub("");
      return;
    }
    if (mobileSubMenu) {
      setMobileSubMenu("");
      return;
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { pathname } = location;

  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <div>
      {/* Main navigation */}
      <div className="flex items-center justify-between px-4 text-lg bg-white  ">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative h-18 w-36">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-white rounded-md ">
                  <img
                    src="/assets/logo1.png"
                    alt="logo1"
                    height={300}
                    width={350}
                  />
                </div>
                <div>
                  {/* <div className="text-xs text-gray-500">Invest Owen Risk</div> */}
                </div>
              </div>
            </div>
          </Link>

          <nav className="hidden ml-8 lg:flex">
            <ul className="flex space-x-1">
              <li>
                <Link
                  to="/"
                  className={`flex items-center px-4 py-2 ${
                    isActive("/")
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  Home
                  {/* <ChevronDown className="w-4 h-4 ml-1" /> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`flex items-center px-4 py-2 ${
                    isActive("/services")
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  Services
                  {/* <ChevronDown className="w-4 h-4 ml-1" /> */}
                </Link>
              </li>

            <li
                  className="relative"
                  onMouseEnter={() => setActiveDropdown("services")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center px-4 py-2 ${
                      isActive("/pages")
                        ? "text-green-500 border-b-2 border-green-500"
                        : "text-gray-700 hover:text-green-500"
                    }`}
                  >
                    Pages
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "services" && (
                    <div className="absolute left-0 z-10 w-48 py-2 bg-white rounded-md shadow-md top-full">
                      <Link
                        to="/pages/team"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Team
                      </Link>
                      <Link
                        to="/pages/business-plan"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Business Plan
                      </Link>
                      <Link
                        to="/pages/legal"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Legal
                      </Link>
                    </div>
                  )}
              </li>



              <li
                  className="relative"
                  onMouseEnter={() => setActiveDropdown("projects")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center px-4 py-2 ${
                      isActive("/reports")
                        ? "text-green-500 border-b-2 border-green-500"
                        : "text-gray-700 hover:text-green-500"
                    }`}
                  >
                    Reports
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === "projects" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "projects" && (
                    <div className="absolute left-0 z-10 w-56 py-2 bg-white rounded-md shadow-md top-full">
                      <Link
                        to="/reports/trade-view"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Trade View
                      </Link>
                      <Link
                        to="/reports/solar-report"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Solar Purchase Document
                      </Link>
                    </div>
                  )}
                </li>
                
                {/* Add PDF Downloads to mobile menu */}
              <Link
                to="/pdf-downloads"
                className={`-m-3 p-3 flex items-center rounded-md ${
                  isActive("/pdf-downloads")
                    ? "text-green-500 font-medium"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                PDF DOWNLOAD
              </Link>


              <li>
                <Link
                  to="/contact"
                  className={`flex items-center px-4 py-2 ${
                    isActive("/contact")
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="items-center hidden  lg:flex">
          <div className="flex justify-start space-x-2">
            <Link to="/login">
              <WhiteRoundButton className="" text="Login" />
            </Link>
            <Link to="/signup">
              <RoundButton className="" text="Sign Up" />
            </Link>
          </div>
        </div>
        {/* ---------------------------------------------------------------------------------*/}
        {/* Mobile menu button */}
        <button
          className="flex items-center border border-gray-900 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="pb-6 overflow-y-auto bg-white lg:hidden">
          <div className="px-5 pt-4">
            <nav className="grid gap-y-2">
              <Link
                to="/"
                className={`-m-3 p-3 flex items-center rounded-md ${
                  isActive("/")
                    ? "text-green-500 font-medium"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`-m-3 p-3 flex items-center rounded-md ${
                  isActive("/services")
                    ? "text-green-500 font-medium"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>



              <Link
                to="/pdf-downloads"
                className={`-m-3 p-3 flex items-center rounded-md ${
                  isActive("/pdf-downloads")
                    ? "text-green-500 font-medium"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                PDF DOWNLOAD
              </Link>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown("mobile-services")}
                  className={`-m-3 p-3 flex items-center rounded-md w-full text-left ${
                    isActive("/pages")
                      ? "text-green-500 font-medium"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  Pages
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform ${
                      activeDropdown === "mobile-services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "mobile-services" && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      to="/pages/team"
                      className={`block px-3 py-2 rounded-md text-base ${
                        isActive("/pages/team")
                          ? "text-green-500 font-medium"
                          : "text-gray-700 hover:text-green-500"
                      }`}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Team
                    </Link>
                    <Link
                      to="/pages/business-plan"
                      className={`block px-3 py-2 rounded-md text-base ${
                        isActive("/pages/business-plan")
                          ? "text-green-500 font-medium"
                          : "text-gray-700 hover:text-green-500"
                      }`}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Business Plan
                    </Link>
                    <Link
                      to="/pages/legal"
                      className={`block px-3 py-2 rounded-md text-base ${
                        isActive("/pages/legal")
                          ? "text-green-500 font-medium"
                          : "text-gray-700 hover:text-green-500"
                      }`}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Legal
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown("mobile-projects")}
                  className={`-m-3 p-3 flex items-center rounded-md w-full text-left ${
                    isActive("/reports")
                      ? "text-green-500 font-medium"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  Reports
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform ${
                      activeDropdown === "mobile-projects" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "mobile-projects" && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      to="/reports/trade-report"
                      className={`block px-3 py-2 rounded-md text-base ${
                        isActive("/reports/trade-report")
                          ? "text-green-500 font-medium"
                          : "text-gray-700 hover:text-green-500"
                      }`}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Trade Report
                    </Link>
                    <Link
                      to="/reports/trade-view"
                      className={`block px-3 py-2 rounded-md text-base ${
                        isActive("/reports/trade-view")
                          ? "text-green-500 font-medium"
                          : "text-gray-700 hover:text-green-500"
                      }`}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Trade View
                    </Link>
                    <Link
                      to="/reports/solar-purchase-document"
                      className={`block px-3 py-2 rounded-md text-base ${
                        isActive("/reports/solar-purchase-document")
                          ? "text-green-500 font-medium"
                          : "text-gray-700 hover:text-green-500"
                      }`}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Solar Purchase Document
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className={`-m-3 p-3 flex items-center rounded-md ${
                  isActive("/contact")
                    ? "text-green-500 font-medium"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile menu buttons */}
            <div className="flex pt-2 space-x-2 border-gray-100">
              <Link to="/login" className="flex-1">
                <WhiteRoundButton text="Login" className="w-full" />
              </Link>
              <Link to="/signup" className="flex-1">
                <RoundButton text="Sign Up" className="w-full" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
