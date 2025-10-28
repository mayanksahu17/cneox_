import React, { useEffect, useState } from "react";
import { WithdrawalFilter } from "../../component";
import { getAllROITransactions } from "../../services/withdrawalService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";

const ROIWithdrawal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllROITransactions();
        console.log("called api");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [render]);

  const columns = [
    { field: "txn_id", fieldName: "TXN ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "amount", fieldName: "Amount" },
    { field: "merchant", fieldName: "Merchant" },
    { field: "country", fieldName: "Country" },
    { field: "withdrawalMethod", fieldName: "Withdrawal Method" },
    { field: "charges", fieldName: "Charges(%)" },
    { field: "crypto_type", fieldName: "Crypto Type" },
    { field: "final_amount", fieldName: "Final Amount" },
    { field: "status", fieldName: "Status" },
    { field: "date", fieldName: "Date" },
    { field: "count", fieldName: "Count" },
  ];

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <WithdrawalFilter
            data={data}
            columns={columns}
            headerText={"ROI Withdrawal"}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default ROIWithdrawal;
