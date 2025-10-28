import React, { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";

const TokenWallet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getVouchers();
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
    { field: "voucher_id", fieldName: "Voucher ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },

    { field: "from_wallet", fieldName: "Wallet" },

    { field: "country", fieldName: "Country" },
    { field: "original_amount", fieldName: "Original Amount" },
    { field: "created_on", fieldName: "Date" },
    { field: "amount", fieldName: "Amount" },
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
            headerText={"Vouchers Report"}
            searchByCountry={true}
          />
        </>
      )}
    </div>
  );
};

export default TokenWallet;
