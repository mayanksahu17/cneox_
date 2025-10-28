import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyWithdrawalReportData } from "../../dummydata";
import { useAuth } from "../../hooks/useAuth";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";

const WithdrawalReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllWithdrawals(user);
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [user]);

  const columns = [
    { field: "txn_id", fieldName: "TXN ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "amount", fieldName: "Amount" },
    { field: "merchant", fieldName: "Merchant" },
    { field: "country", fieldName: "Country" },
    { field: "crypto_type", fieldName: "Crypto Type" },
    { field: "final_amount", fieldName: "Final Amount" },
    { field: "status", fieldName: "Status" },
    { field: "wallet_type", fieldName: "Wallet Type" },
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
            headerText={"Withdrawal Report"}
            searchByCountry={true}
            withdrawal={true}
          />
        </>
      )}
    </div>
  );
};

export default WithdrawalReport;
