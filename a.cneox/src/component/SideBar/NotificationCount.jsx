import React from "react";

const NotificationCount = ({ count }) => {
  return (
    <span className="bg-redColor text-white font-medium py-1 px-2 rounded-md text-xs ml-8  ">
      {count || 0}
    </span>
  );
};

export default NotificationCount;
