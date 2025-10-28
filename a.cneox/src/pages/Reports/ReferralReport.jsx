import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyReferralReportData } from "../../dummydata";
import { useAuth } from "../../hooks/useAuth";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";

const ReferralReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllReferralTransactions(user);
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
    { field: "date", fieldName: "Date" },
    { field: "user_id", fieldName: "User", multipleValues: true },
    {
      field: "referral_user_id",
      fieldName: "Investment By",
      multipleValues: true,
    },

    { field: "country", fieldName: "Country" },
    // { field: "position", fieldName: "Position" },
    // { field: "percentage", fieldName: "Percentage" },
    { field: "amount", fieldName: "Referral Amount" },
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
            headerText={"Referral Report"}
            searchByCountry={true}
          />
        </>
      )}
    </div>
  );
};

export default ReferralReport;
