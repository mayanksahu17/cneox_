import React, { useEffect, useState } from "react";

import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";

const CountryBusinessReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getCountryReport();
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
    { field: "country", fieldName: "Country" },
    { field: "users", fieldName: "Total Users" },
    { field: "total_investment", fieldName: "Total Investment" },

    { field: "total_cash_investment", fieldName: "Total Cash Investment" },
     {
      field: "total_voucher_investment",
      fieldName: "Total Voucher Investment",
    },
    {
      field: "total_roi_wallet",
      fieldName: "Total ROI Wallet",
    },
    {
      field: "total_referral_binary_wallet",
      fieldName: "Total R&B Wallet",
    },
    {
      field: "total_interest_wallet",
      fieldName: "Total interest Wallet",
    },
    { field: "total_earning", fieldName: "Total Earning" },

   
   
    { field: "total_withdrawal", fieldName: "Total Withdrawal" },
    { field: "total_direct_business", fieldName: "Total Direct Business" },
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
            headerText={"Country Buisness Report"}
            showSearchField={false}
            searchByCountry={true}
            removeDateFilter={false}
          />
        </>
      )}
    </div>
  );
};

export default CountryBusinessReport;

// country: "Ã…land Islands";
// total_deposit_investment: "0.0000";
// total_direct_business: "0.0000";
// total_earning: "0.0000";
// total_investment: "0.0000";
// total_referral_binary_wallet: "0.0000";
// total_roi_wallet: "0.0000";
// total_voucher_investment: "0.0000";
// total_withdrawal: "0.0000";
// users: 3;
