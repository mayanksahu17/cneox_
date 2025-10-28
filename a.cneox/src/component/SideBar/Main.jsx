import React, { useEffect, useState } from "react";
import SidebarDropDown from "./SidebarDropDown";
import { sideBarSuperData, sideBarAllowedData } from "./sidebarData";
import { Link, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Logo } from "../../assets";
import { useAuth } from "../../hooks/useAuth";
import NotificationCount from "./NotificationCount";

const Main = ({ isOpen, setFunc }) => {
  const location = useLocation();

  const [selectedOption, setSelectedOption] = useState(location.pathname);

  const [sidebarData, setSidebarData] = useState([]);

  const userData = JSON.parse(localStorage.getItem("crown_admin"));

  const { notificationCount } = useAuth();

  console.log(notificationCount);

  useEffect(() => {
    if (userData.role === 3) {
      setSidebarData(sideBarAllowedData);
      return;
    }

    setSidebarData(sideBarSuperData);
  }, []);

  useEffect(() => {
    setSelectedOption(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-72 h-screen  py-4 overflow-y-auto bg-white
      shadow-lg shadow-gray-400 scrollbar ${
        isOpen ? "" : "hidden"
      } custom-scrollbar`}
    >
      <img src={Logo} alt="logo" className=" mt-2 mb-4 w-24 ml-14 " />
      <button
        className="text-xl text-grey-600 p-2 rounded-full absolute z-50  top-5 right-4"
        onClick={(e) => {
          e.preventDefault();
          setFunc((prev) => !prev);
        }}
      >
        <FiX />
      </button>
      <ul className=" font-medium mb-10">
        {sidebarData.map((ele) => (
          <li key={ele.id} className="cursor-pointer">
            {!ele.haveSubField ? (
              <Link to={`${ele.path}`}>
                <p
                  className={`flex items-center gap-x-1 p-2.5 pl-5  rounded-l-lg   group relative  text-sm ${
                    selectedOption === `/admin/${ele.path}`
                      ? "bg-primaryColor bg-opacity-30 text-textColor"
                      : " bg-white hover:bg-gray-200 hover:text-textColor text-black"
                  }`}
                >
                  {selectedOption === `/admin/${ele.path}` ? (
                    <span className="absolute h-full w-1 bg-primaryColor left-0 rounded-r-lg" />
                  ) : (
                    ""
                  )}
                  {/* {console.log(ele?.path)} */}
                  <span>{ele.icon}</span>
                  <span className="ms-3">{ele.field}</span>

                  {ele?.showNotificationCount &&
                    Number(notificationCount[ele?.countField]) > 0 && (
                      <NotificationCount
                        count={notificationCount[ele?.countField]}
                      />
                    )}
                </p>
              </Link>
            ) : (
              <SidebarDropDown data={ele} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
