import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyKycData } from "../../dummydata";
import Header from "../../component/ReportsFilter/Header";
import SearchBar from "../../component/ReportsFilter/SearchBar";
import { useAuth } from "../../hooks/useAuth";
import { fetchAllKYCs } from "../../services/kycService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import ReportFilter from "../../component/Filter/Main";

const KYCReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
        { field: "user_id", fieldName: "User ID", multipleValues: true },

    { field: "country", fieldName: "Country" },
    { field: "document", fieldName: "Document", multipleValues: true },
    { field: "status", fieldName: "Status" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllKYCs();
        console.log("called api");
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReportFilter
            data={data}
            columns={columns}
            headerText={"KYC Report"}
          />
        </>
      )}
    </div>
  );
};

export default KYCReports;

// created_date: "2023-11-20";
// doclink: "https://oneozo.com/home/public/documents/OZO-101650-PASSPORT-tshirt-1700520130096.png";
// doctype: "PASSPORT";
// id: 23;
// status: "pending";
// updated_date: "2024-01-18";
// user_id: "CROWN-100001";
