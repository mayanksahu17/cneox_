import React, { useEffect, useState } from "react";
import { WithdrawalFilter } from "../../component";
import { getAllRBTransactions } from "../../services/withdrawalService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
const RBWithdrawal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  const columns = [
    { field: "txn_id", fieldName: "TXN ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },

    { field: "amount", fieldName: "Amount" },
    { field: "merchant", fieldName: "Merchant" },
    { field: "country", fieldName: "Country" },
    { field: "charges", fieldName: "Charges(%)" },
    { field: "withdrawalMethod", fieldName: "Withdrawal Method" },

    { field: "crypto_type", fieldName: "Crypto Type" },
    { field: "final_amount", fieldName: "Final Amount" },
    { field: "status", fieldName: "Status" },
    { field: "date", fieldName: "Date" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllRBTransactions();
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

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <WithdrawalFilter
            data={data}
            columns={columns}
            headerText={"R&B Withdrawal"}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default RBWithdrawal;
