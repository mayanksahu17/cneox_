import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyUserActivationData } from "../../dummydata";
import { useAuth } from "../../hooks/useAuth";
import { fetchAllActiveUsers } from "../../services/userService";
import toast from "react-hot-toast";
import Header from "../../component/ReportsFilter/Header";
import ResetButton from "../../component/ReportsFilter/ResetButton";
import SubmitButton from "../../component/ReportsFilter/SubmitButton";
import SearchBar from "../../component/ReportsFilter/SearchBar";

import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";

const UserActivation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "investment_date", fieldName: "Investment Date" },
    { field: "user_id", fieldName: "User", multipleValues: true },
    { field: "package_name", fieldName: "Package", multipleValues: true },
    // { field: "days_since_investment", fieldName: "Days" },
    { field: "amount", fieldName: "Payment" },
    { field: "expires_on", fieldName: "Expires On" },
    { field: "status", fieldName: "Status" },
  ];

  const { user } = useAuth();

  // const handleFilterChange = (e) => {
  //   setUserId(e.target.value)
  //   console.log(userId)
  // }

  // const handleFilterSubmit = async () => {
  //   if (activeusersData) {
  //     setIsFilter(true);
  //     const tempFilteredData = activeusersData?.filter((entry) => {
  //       return (
  //         (!userId || entry?.userId?.includes(userId))
  //       );
  //     });

  //     setFilteredData(tempFilteredData);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllActiveUsers(user);
        console.log("called api");
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReportFilter
            data={data}
            columns={columns}
            headerText={"User Activation"}
          />
        </>
      )}
    </div>
  );
};

export default UserActivation;
