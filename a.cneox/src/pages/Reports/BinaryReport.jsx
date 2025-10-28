import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyBinaryReportData } from "../../dummydata";
import toast from "react-hot-toast";
import reportService from "../../services/reportService";
import Loader from "../../component/Loader/Main";
import { useAuth } from "../../hooks/useAuth";
import ReportFilter from "../../component/Filter/Main";

const BinaryReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getBIReport(user);
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
    { field: "country", fieldName: "Country" },
    { field: "id", fieldName: "Position" },
    { field: "percentage", fieldName: "Percentage" },
    { field: "status", fieldName: "Status" },
    { field: "amount", fieldName: "Amount" },
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
            headerText={"Binary Report"}
            searchByCountry={true}
          />
        </>
      )}
    </div>
  );
};

export default BinaryReport;
