import React, { useEffect, useState } from "react";

import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";
import reportService from "../../services/reportService";

const CreateInvestment = () => {
  const columns = [
    { field: "transactionid", fieldName: "Transaction ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "packageid", fieldName: "Package ID" },
    { field: "country", fieldName: "Country" },
    { field: "amount", fieldName: "Amount" },
    { field: "gateway", fieldName: "Gateway" },
    { field: "created_date", fieldName: "Created Date" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [render, setRender] = useState(false);

  useEffect(() => {
    const getPowerLegData = async () => {
      setData([]);
      setLoading(true);
      try {
        const response = await reportService.getAllInvestmentsByAdmin();
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPowerLegData();
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
            headerText={"Admin activated accounts"}
            showSearchField={false}
            createInvestmentForm={true}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default CreateInvestment;
