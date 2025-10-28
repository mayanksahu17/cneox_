import React, { useEffect, useState } from "react";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";
import toast from "react-hot-toast";
import { getFundsReport } from "../../services/fundManagementServices";

const Report = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "date", fieldName: "Date" },
    { field: "admin", fieldName: "Admin" },
    { field: "wallet", fieldName: "Wallet" },
    { field: "amount", fieldName: "Amount" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "type", fieldName: "Type" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFundsReport();
        console.log("called api");
        console.log(response);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReportFilter data={data} columns={columns} headerText={"Report"} />
        </>
      )}
    </div>
  );
};

export default Report;
