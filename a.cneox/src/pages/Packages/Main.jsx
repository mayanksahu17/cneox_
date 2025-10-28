import React, { useEffect, useState } from "react";
import { ReportsTable } from "../../component";
import { dummyPackageData } from "../../dummydata";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { createPackage, getAllPackages } from "../../services/packageService";
import Header from "../../component/ReportsFilter/Header";

import Loader from "../../component/Loader/Main";
// Packages

const Main = () => {
  const columns = [
    { field: "package_id", fieldName: "Package ID" },
    { field: "package_name", fieldName: "Package Name" },
    { field: "roi", fieldName: "ROI" },
    { field: "duration", fieldName: "Duration" },
    { field: "binary_bonus", fieldName: "Binary Bonus" },
    { field: "capping_limit", fieldName: "Capping Limit" },
    { field: "principle_return", fieldName: "Principle Return" },
    { field: "level_one_referral", fieldName: "Level One Referral" },
    { field: "status", fieldName: "Status" },
  ];

  const [render, setRender] = useState(false);
  const [reportData, setReportData] = useState([]);

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // console.log(columns.map((ele) => ele.field));
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await getAllPackages(user);
        console.log(response.data.data);
        setReportData(response.data.data);
        setLoading(false);
      } catch (error) {
        if (
          error?.response?.data?.message ===
          "Token email does not match request email"
        ) {
          toast.error("Invalid Request");
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    userData();
  }, [user]);

  const saveData = async (formData) => {
    try {
      await createPackage(formData);
      toast.success("Entry Added Successfully");
      setRender((prev) => !prev);
    } catch (error) {
      toast.error("Failed to save entry");
    }
  };

  return (
    <div>
      <Header headerText={"All Packages"} />
      {/* Add Entry Button */}

      <div className="mb-4">
        {/* <button className="bg-transparent text-primaryColor border border-primaryColor font-medium py-1 px-3 rounded-full">
          Add Entry
        </button> */}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ReportsTable columns={columns} data={reportData} />
      )}
      {/* Excelbutton */}
      <div className="my-4">
        <button className="bg-transparent text-primaryColor border border-primaryColor font-medium py-1 px-4 rounded-full">
          Excel
        </button>
      </div>
    </div>
  );
};

export default Main;
