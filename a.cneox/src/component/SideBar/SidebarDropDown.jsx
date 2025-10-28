import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NotificationCount from "./NotificationCount";

const SidebarDropDown = ({ data }) => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("crown_admin"));

  // drop down open close
  const [dropDownOpen, setDropDownOpen] = useState(false);

  //selected Drop down option
  const [selectedOption, setSelectedOption] = useState(location.pathname);

  useEffect(() => {
    setSelectedOption(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes(data.path)) {
      setDropDownOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (userData?.role === 3) {
      setDropDownOpen(true);
    }
  }, []);

  //   if (
  //     selectedOption === location.pathname &&
  //     selectedOption.includes(`/admin/${data.field.toLowerCase()}`)
  //   ) {
  //     setDropDownOpen(true);
  //   }
  // }, [location.pathname, selectedOption, data.field]);

  const { notificationCount } = useAuth();

  const modifiedNotificaitonsCount = {
    ...notificationCount,
    withdrawal:
      notificationCount?.roi_withdrawal + notificationCount?.rb_withdrawal ||
      notificationCount?.roi_withdrawal ||
      notificationCount?.rb_withdrawal,
    influencers:
      notificationCount?.powerleg + notificationCount?.free ||
      notificationCount?.powerleg ||
      notificationCount?.free,

    reports: notificationCount?.coinpayment,
  };

  return (
    <>
      <div
        onClick={() => {
          if (userData?.role === 3) {
            setDropDownOpen(true);
            return;
          }

          setDropDownOpen((prev) => !prev);
        }}
      >
        <p
          className={`flex items-center gap-x-4 p-2.5 pl-5  rounded-l-lg  group relative  text-sm  bg-white hover:bg-gray-200 hover:text-gray-700 text-black`}
        >
          {/* <span className="absolute h-full w-1 bg-primaryColor left-0 rounded-r-lg" /> */}
          {/* {selected ? (
            <span className="absolute h-full w-1 bg-primaryColor left-0 rounded-r-lg" />
          ) : (
            ""
          )} */}
          <span>{data.icon}</span>
          <span className=" w-full ">
            {data.field}{" "}
            {data?.showNotificationCount &&
              Number(modifiedNotificaitonsCount[data?.countField]) > 0 && (
                <NotificationCount
                  count={modifiedNotificaitonsCount[data?.countField]}
                />
              )}
          </span>
          <span
            className={`absolute right-5 text-base font-medium ${
              dropDownOpen ? "rotate-90" : ""
            }`}
          >
            <FiChevronRight />
          </span>
        </p>
      </div>
      {dropDownOpen ? (
        <div className="pl-7 mt-2 mb-3 pr-4">
          <ul className="flex flex-col text-[0.8rem] font-medium gap-y-1.5  text-black">
            {data.subField.map((ele, i) => (
              <Link key={i} to={`${data.path}/${ele.path}`}>
                {/* {location.pathname === `/admin/${data.path}/${ele.path}` &&
                  setDropDownOpen(true)} */}
                <li
                  key={i}
                  // onClick={() =>
                  //   setSelectedOption(`/admin/${data.path}/${ele.path}`)
                  // }
                  className={` py-2 px-3  rounded-lg ${
                    selectedOption === `/admin/${data.path}/${ele.path}`
                      ? "text-primaryColor bg-primaryColor bg-opacity-30 font-semibold translate-x-2"
                      : "hover:bg-gray-200 hover:text-textColor"
                  }`}
                >
                  - {ele.subFieldName}
                  {ele?.showNotificationCount &&
                    Number(notificationCount[ele?.countField]) > 0 && (
                      <NotificationCount
                        count={modifiedNotificaitonsCount[ele?.countField]}
                      />
                    )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SidebarDropDown;
