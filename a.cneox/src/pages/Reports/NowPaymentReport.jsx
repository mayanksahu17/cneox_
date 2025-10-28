import React, { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import ReportFilter from "../../component/Filter/Main";
import Loader from "../../component/Loader/Main";

const NowPaymentReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllNownpaymentTransaction();
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, []);

  const columns = [
    // { field: "id", fieldName: "ID" },
    { field: "user_id", fieldName: "User", multipleValues: true },
    { field: "country", fieldName: "Country" },
    { field: "txn_id", fieldName: "Transaction Id" },
    { field: "currency2", fieldName: "Crypto", multipleValues: true },
    { field: "currency1", fieldName: "USD", multipleValues: true },
    { field: "received_amount", fieldName: "Recieved Amount" },
    { field: "status_text", fieldName: "Status" },
    { field: "created_at", fieldName: "Created Date" },
    { field: "checkout_url", fieldName: "Checkout Url" },
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
            headerText={"NowPayment Report"}
            searchByCountry={true}
          />
        </>
      )}
    </div>
  );
};

export default NowPaymentReport;
