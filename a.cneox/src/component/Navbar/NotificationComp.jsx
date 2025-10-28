import React from "react";
import { FiBell, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { changeNotificationStatus } from "../../services/notificationServices";

import { notificationType } from "./data";

const NotificationComp = ({ data, refresh, closeNoticatioTab }) => {
  const markNotification = async (id) => {
    try {
      const response = await changeNotificationStatus({
        ids: [id],
        status: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-row items-center gap-x-4 border-b-[1px] py-5 border-gray-300 relative cursor-pointer">
      {/* icons */}
      <button
        className="text-lg text-subTextColor  p-1 rounded-full absolute z-50  top-2.5 right-0"
        onClick={() => {
          markNotification(data?.id);
          refresh((prev) => !prev);
        }}
      >
        <FiX />
      </button>

      <Link
        to={
          notificationType?.filter((ele) => ele.type === data.type)[0]?.redirect
        }
        onClick={() => {
          markNotification(data?.id);
          refresh((prev) => !prev);

          closeNoticatioTab(false);
        }}
      >
        <div className="flex flex-row items-center gap-x-4">
          <div className="p-2.5 text-lg text-white bg-primaryColor w-fit rounded-full relative ">
            <FiBell />
          </div>

          <div>
            {/* Heading */}
            <h5 className="text-textColor text-base font-medium  capitalize">
              {
                notificationType.filter((ele) => ele.type === data.type)[0]
                  ?.title
              }
            </h5>
            {/* subtext  */}
            <p className="text-xs  text-textColor opacity-60">{data.message}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotificationComp;
