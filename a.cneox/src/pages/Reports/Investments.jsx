import React, { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import ReportFilter from "../../component/Filter/Main";
import Loader from "../../component/Loader/Main";

const Investments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllInvestments();
        console.log("called api");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, []);

  console.log(data);

  const columns = [
    { field: "txn_id", fieldName: "Transaction ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "sponsor", fieldName: "Sponsor" },
    { field: "package_name", fieldName: "Package" },
    { field: "invested_amount", fieldName: "Invested Amount" },
    { field: "investment_date", fieldName: "Invested Date" },
    { field: "country", fieldName: "Country" },
    { field: "expires_on", fieldName: "Expires On" },
    { field: "deposit_amount", fieldName: "Deposit Amount" },
    { field: "token_amount", fieldName: "Token Amount" },
    { field: "type", fieldName: "Investmet Type" },
    { field: "voucher_id", fieldName: "Voucher ID" },
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
            headerText={"Investment Report"}
            searchByCountry={true}
          />
        </>
      )}
    </div>
  );
};

export default Investments;
