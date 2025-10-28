import React, { useEffect, useRef, useState } from "react";
import { FiBell, FiLoader, FiLogOut, FiMenu } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { getAllUnReadNotification } from "../../services/notificationServices";
import baseURL from "../../constants/baseURL";
import Loader from "../../component/Loader/Main";
import NotificationComp from "./NotificationComp";
import { socketURL } from "../../constants/baseURL";
const Main = ({ openFunc, openSideBar }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const notificationBtnRef = useRef(null);

  const { notifications, setNotificationCount, updateNotifications } =
    useAuth();

  const [loading, setLoading] = useState(true);

  const [refreshNotification, setRefreshNotification] = useState(false);

  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(socketURL);
    socket.emit("admin", { userType: "admin" });

    updateNotifications([]);
    socket.on("newAdminNotification", (data) => {
      updateNotifications(data?.data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogOut = () => {
    logOutUser();
    toast.success("logout successful");
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "notification-btn") {
        if (
          notificationBtnRef.current &&
          !notificationBtnRef.current.contains(event.target) &&
          notificationRef.current &&
          !notificationRef.current.contains(event.target)
        ) {
          setNotificationOpen(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      updateNotifications([]);
      try {
        const response = await getAllUnReadNotification();
        updateNotifications(response.data.notifications);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [refreshNotification]);

  useEffect(() => {
    setNotificationCount(
      notifications
        ?.map((ele) => ele.type)
        .reduce((acc, type) => {
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {})
    );
  }, [notifications, setNotificationCount]);

  return (
    <div className="h-16 w-full bg-white fixed z-40 flex flex-row items-center justify-between px-6 top-0 shadow-lg">
      <button
        className="text-xl text-textColor p-2 rounded-full"
        onClick={(e) => {
          e.preventDefault();
          openFunc((prev) => !prev);
        }}
      >
        {openSideBar ? null : <FiMenu />}
      </button>

      <div className="flex flex-row items-center justify-end gap-x-7 relative">
        {/* notification tab */}
        <button
          className="flex flex-row items-center gap-x-3 bg-white px-2 py-2 rounded-full text-base text-textColor text-opacity-70 shadow-md ring-2 ring-gray-300 relative"
          onClick={(e) => {
            e.preventDefault();
            setNotificationOpen((prev) => !prev);
          }}
          ref={notificationBtnRef}
          id="notification-btn"
        >
          <span className="absolute  bg-redColor -bottom-2 -right-3 rounded-full text-white px-2.5 py-1 text-xs">
            {!loading ? (
              notifications?.length
            ) : (
              <FiLoader className="text-white font-semibold animate-spin" />
            )}
          </span>

          <FiBell />
        </button>
        {/* logoout tab */}
        <button
          onClick={handleLogOut}
          className="hover:bg-red-400 hover:text-white flex flex-row items-center gap-x-3 bg-white px-3 py-2 rounded-md text-sm text-textColor text-opacity-70 shadow-md ring-2 ring-gray-300"
        >
          <FiLogOut />
          Log out
        </button>
        {/* notification tab */}
        <div
          className={`absolute top-12 right-36 w-80  py-2.5 px-6 z-30 bg-white rounded-md shadow-lg ring-1 ring-gray-300 overflow-hidden ${
            notificationOpen ? "" : "hidden"
          } `}
          ref={notificationRef}
          id="notification-tab"
        >
          <h3 className="font-medium text-textColor text-md">
            Recent Notifications
          </h3>
          <p className="text-xs text-subTextColor">
            {notifications?.length} new unread notifications
          </p>
          <div className=" mt-2 pr-2 overflow-scroll min-h-72 max-h-72 custom-scrollbar">
            {loading ? (
              <Loader />
            ) : (
              notifications?.map((ele) => (
                <NotificationComp
                  key={ele.id}
                  data={ele}
                  refresh={setRefreshNotification}
                  closeNoticatioTab={setNotificationOpen}
                />
              ))
            )}
          </div>
          <div className="w-full flex justify-end">
            <Link to={"/admin/notification"}>
              <button
                className="text-blueColor font-semibold mt-4 mb-1 "
                onClick={() => {
                  setNotificationOpen(false);
                }}
              >
                See All Notification
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
