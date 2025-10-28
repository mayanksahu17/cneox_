import React, { useEffect, useState } from "react";
import { WithdrawalFilter } from "../../component";
import toast from "react-hot-toast";
import { getAllInterestWithdrwal } from "../../services/withdrawalService";
import Loader from "../../component/Loader/Main";

const InterestWithdrawal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [render, setRender] = useState(false);

  const columns = [
    { field: "txn_id", fieldName: "TXN ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },

    { field: "amount", fieldName: "Amount" },
    { field: "merchant", fieldName: "Merchant" },
    { field: "charges", fieldName: "Charges(%)" },
    { field: "withdrawalMethod", fieldName: "Withdrawal Method" },

    { field: "country", fieldName: "Country" },
    { field: "crypto_type", fieldName: "Crypto Type" },
    { field: "final_amount", fieldName: "Final Amount" },
    { field: "status", fieldName: "Status" },
    { field: "date", fieldName: "Date" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllInterestWithdrwal();
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
            headerText={"Interest Withdrawal"}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default InterestWithdrawal;
