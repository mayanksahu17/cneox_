import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import notificationService from "../../services/notificationService";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const notificationType = [
  { type: "fund_management", title: "Fund Report", redirect: "/dashboard" },
  { type: "powerleg", title: "Powerleg", redirect: "/dashboard/investments/package-activation" },
  { type: "free", title: "Free", redirect: "/dashboard/investments/package-activation" },
  { type: "coinpayment", title: "Coinpayment Report", redirect: "/dashboard/investments/package-activation" },
  { type: "investment", title: "Investment Report", redirect: "/dashboard/investments/package-activation" },
  { type: "rb_withdrawal", title: "R&B Withdrawal", redirect: "/dashboard/reports/withdrawal" },
  { type: "roi_withdrawal", title: "ROI Withdrawal", redirect: "/dashboard/reports/withdrawal" },
  { type: "interest_withdrawal", title: "Interest Withdrawal", redirect: "/dashboard/reports/withdrawal" },
  { type: "token", title: "Voucher Report", redirect: "/dashboard/vouchers/all" },
  { type: "kyc", title: "KYC", redirect: "/dashboard/settings/kyc" },
  { type: "ticket", title: "Ticket", redirect: "/dashboard/tickets/all" },
  { type: "binary", title: "Binary Report", redirect: "/dashboard/reports/bi" },
  { type: "referral", title: "Referral Report", redirect: "/dashboard/reports/ri" },
  { type: "career", title: "Extra Income Report", redirect: "/dashboard/reports/extra-income" },
  { type: "roi", title: "ROI Report", redirect: "/dashboard/reports/roi" },
];

const Notifications = () => {
  const { user } = useAuth();
  const [allNotifications, setAllNotifications] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const socket = io("https://crownbankers.com");
    socket.emit("userId", user?.user?.userId);
    socket.on("newUserNotification", () => {
      setRender((prev) => !prev); // trigger refresh
    });
    return () => socket.disconnect();
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const res = await notificationService.getAllNotifications(user);
        if (res?.data?.success) {
          setAllNotifications(res?.data?.notifications);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    })();
  }, [render]);

  const markNotification = async (id) => {
    try {
      await notificationService.markNotificationAsSeen(
        { ids: [id], status: 1 },
        user
      );
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      if (!allNotifications.length) return;

      const ids = allNotifications.map((n) => n.id);
      await notificationService.markNotificationAsSeen(
        { ids, status: 1 },
        user
      );
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md w-72 max-h-[320px] overflow-y-auto">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">Notifications</h2>
        <p
          className="text-xs text-blue-600 hover:underline cursor-pointer"
          onClick={markAllNotificationsAsRead}
        >
          MARK ALL AS READ
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {allNotifications.length > 0 ? (
          allNotifications.map((el, index) => {
            const route =
              notificationType.find((n) => n.type === el.type)?.redirect || "/";
            return (
              <Link
                to={route}
                onClick={() => markNotification(el?.id)}
                key={index}
              >
                <div className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-start gap-3">
                  {!el?.is_seen && (
                    <div className="mt-1 bg-green-500 w-2 h-2 rounded-full flex-shrink-0" />
                  )}
                  <div className="text-sm text-gray-800 dark:text-white w-full">
                    <p>{el?.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {el?.created_date}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
            No Notifications
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
