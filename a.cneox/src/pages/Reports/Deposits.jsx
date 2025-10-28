import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyDepositReportData } from "../../dummydata";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../component/Loader/Main"; 
import ReportFilter from "../../component/Filter/Main";


const Deposits = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllDeposits(user);
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false)
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [user]);
 

  const columns = [
    { field: "id", fieldName: "Sr. no." },
    { field: "txn_id", fieldName: "TXN ID" },
    { field: "user_id", fieldName: "User ID" },
    { field: "amount", fieldName: "Amount" },
    { field: "charges", fieldName: "Charges" },
    { field: "crypto_type", fieldName: "Crypto Type" },
    { field: "status", fieldName: "Status" },
    { field: "date", fieldName: "Date" },
  ];

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
    {loading ? (
      <Loader />
    ) : (
      <>
        <ReportFilter
          data={data}
          columns={columns}
          headerText={"Deposit Report"}
        />
      </>
    )}
  </div>
  );
};

export default Deposits;
