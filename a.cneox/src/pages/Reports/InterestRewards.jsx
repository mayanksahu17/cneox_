import React, { useEffect, useState } from "react";
import {
  ReportsTable
} from "../../component";
import { dummyInterestRewardData } from "../../dummydata";
import { useAuth } from "../../hooks/useAuth";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main"; 
import ReportFilter from "../../component/Filter/Main";


const InterestRewards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getAllCareerRewards(user);
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false)
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [user]);

  const columns = [
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "achievement", fieldName: "Achievements" },
    { field: "reward_amount", fieldName: "Rewards" },
    { field: "date", fieldName: "Date" },
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
          headerText={"Interest Rewards Report"}
        />
      </>
    )}
  </div>
  );
};

export default InterestRewards;
