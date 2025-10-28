import React, { useEffect, useState } from "react";
import {
  ReportsTable
} from "../../component";
import { dummyWalletTransferReportData } from "../../dummydata";
import { useAuth } from "../../hooks/useAuth";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main"; 
import ReportFilter from "../../component/Filter/Main";


const WalletTransfer = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllIntraWalletTransfer(user);
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
    { field: "txn_id", fieldName: "Transaction ID" },
    { field: "userId", fieldName: "User ID" },
    { field: "txn_date", fieldName: "Transaction Date" },
    { field: "amount_sent", fieldName: "Amount Sent" },
    { field: "charges_in_percent", fieldName: "Charge In Percent" },
    { field: "amount_received", fieldName: "Amount Recieved" },
    { field: "status", fieldName: "Status" },
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
          headerText={"Wallet Transfer Report"}
        />
      </>
    )}
  </div>
  );
};

export default WalletTransfer;
