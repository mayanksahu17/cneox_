import React, { useEffect, useState } from "react";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";
import { fetchAllFreeAccountsTransactions } from "../../services/freeAccountService";

const FreeAccount = () => {
  const columns = [
    { field: "transactionid", fieldName: "Transaction ID" },
   { field: "user_id", fieldName: "User ID", multipleValues: true },
     { field: "country", fieldName: "Country" },
    { field: "packageid", fieldName: "Package ID" },
    { field: "amount", fieldName: "Amount" },
    { field: "target_amount", fieldName: "Target Amount" },
    { field: "gateway", fieldName: "Gateway" },
    { field: "status", fieldName: "Status" },
    { field: "created_date", fieldName: "Created Date" },
    { field: "roi_type", fieldName: "ROI Type" },
    { field: "target_type", fieldName: "Target Type" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const getFreeLegData = async () => {
      setLoading(true);
      setData([]);
      try {
        const response = await fetchAllFreeAccountsTransactions();
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(render);
    getFreeLegData();
  }, [render]);

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReportFilter
            data={data}
            columns={columns}
            headerText={"Free Account"}
            showSearchField={false}
            freeAccountForm={true}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default FreeAccount;
