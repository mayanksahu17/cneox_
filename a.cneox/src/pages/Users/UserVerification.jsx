import React, { useEffect, useState } from "react";
import { CheckBoxTable } from "../../component";
import Header from "../../component/ReportsFilter/Header";
import {
  approveOrRejecKYC,
  fetchAllKYCs,
  fetchAllPendingKYCs,
} from "../../services/kycService";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

const UserVerification = () => {
  const columns = [
    { field: "user_id", fieldName: "User" },
    // { field: "country_phone", fieldName: "Country/Phone" },
    { field: "document", fieldName: "Document", multipleValues: true },
    { field: "status", fieldName: "Status" },
  ];

  const [data, setData] = useState([]);
  const { user } = useAuth();

  const [selectedDataIds, setSelectedDataIds] = useState([]);

  const [render, setRender] = useState(false);

  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllPendingKYCs();
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [render]);

  // console.log(selectedDataIds);
  const approveOrRejectUser = async (selectedIds, status) => {
    if (status === "approved") {
      setApproveLoading(true);
    }

    if (status === "reject") {
      setRejectLoading(true);
    }

    if (selectedDataIds.length !== 0) {
      console.log("sdasdasd");
      const approvalData = {
        ids: selectedIds,
        status: status,
      };
      console.log(approvalData);
      try {
        const response = await approveOrRejecKYC(approvalData);
        toast.success(
          `${
            status === "approved"
              ? "Tickets approved successfully."
              : "Tickets rejected successfully"
          }`
        );
        console.log(response);
        setSelectedDataIds([]);
        setRender((prev) => !prev);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    }

    setApproveLoading(false);
    setRejectLoading(false);
  };
  console.log(selectedDataIds);

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      <Header headerText={"User Verification"} />
      {/* Approve and Reject button */}
      <div className=" my-7 flex flex-row gap-x-6">
        <button
          className="bg-primaryColor text-white font-medium py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          onClick={() => approveOrRejectUser(selectedDataIds, "approved")}
          disabled={approveLoading}
        >
          {approveLoading ? (
            <FiLoader className="animate-spin ease-in" />
          ) : null}
          Approve
        </button>
        <button
          className="bg-redColor text-white font-medium py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => approveOrRejectUser(selectedDataIds, "rejected")}
          disabled={rejectLoading}
        >
          {rejectLoading ? (
            <FiLoader className="animate-spin ease-in" />
          ) : (
            "Reject"
          )}
        </button>
      </div>
      {/* Table */}
      <div>
        <CheckBoxTable
          columns={columns}
          data={data}
          filteringParameter={"id"}
          setSelectedDataIds={setSelectedDataIds}
        />
      </div>
    </div>
  );
};

export default UserVerification;
