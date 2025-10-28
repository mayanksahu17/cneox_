import React, { useEffect, useState } from "react";
import Header from "../../component/ReportsFilter/Header";
import { ReportsTable } from "../../component";
import { dummyNotificationData } from "../../dummydata";
import { getAllNotification } from "../../services/notificationServices";
import Loader from "../../component/Loader/Main";

const Main = () => {
  const [refreshData, setRefreshData] = useState(false);

  const [notificationData, setNotificationData] = useState([]);

  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", fieldName: "Sr. no." },
    { field: "message", fieldName: "Notification Message" },
    { field: "created_date", fieldName: "Date" },
    { field: "is_seen", fieldName: "Mark As Read" },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllNotification();
        console.log(response.data.notifications);
        setNotificationData(response.data.notifications);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // console.log(notificationData.map((ele) => ele.user_id));

  return (
    <div>
      <Header headerText={"All Notification"} />

      <div className="mt-7">
        {loading ? (
          <Loader />
        ) : (
          <ReportsTable columns={columns} data={notificationData} />
        )}
      </div>
    </div>
  );
};

export default Main;

// created_date: "Saturday, 17 February 2024, 04:32 PM"
// id: 8
// is_seen: 0
// message: "na8"
// updated_date: "Monday, 19 February 2024, 04:40 PM"
// user_id: null
// user_type: "admin"
