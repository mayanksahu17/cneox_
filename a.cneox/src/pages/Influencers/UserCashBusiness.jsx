import React, { useEffect, useState } from "react";
import Header from "../../component/ReportsFilter/Header";
import ResetButton from "../../component/ReportsFilter/ResetButton";
import SearchBar from "../../component/ReportsFilter/SearchBar";
import SubmitButton from "../../component/ReportsFilter/SubmitButton";
import DateRangePicker from "../../component/ReportsFilter/DateRangePicker";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import { getUserCashBusinessData } from "../../services/userCashBusinessServices";

const UserCashBusiness = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [allFilters, setAllFilters] = useState({
    userId: "",
    startDate: "",
    endDate: "",
  });
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (allFilters.userId && allFilters.startDate && allFilters.endDate) {
        const response = await getUserCashBusinessData(
          allFilters.userId,
          allFilters.startDate,
          allFilters.endDate
        );
        console.log(response);
        setData(response?.data);
        setLoading(false);
        // setAllFilters({ userId: "", startDate: "", endDate: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (name) => (event) => {
    setAllFilters((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setAllFilters({ userId: "", startDate: "", endDate: "" });
    setData([]);
    setLoading(true);
  };

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      <Header headerText={"User Cash Business"} />

      {/* from */}
      <div className="bg-white w-full py-2 px-5 rounded-md ring-1 ring-gray-300 shadow-lg my-6">
        <form action="submit">
          <h3 className="text-xl mb-2 pt-3 text-greenColor font-semibold">
            User Cash Business
          </h3>
          {/* input field */}
          <div className="  flex flex-row gap-x-4">
            <DateRangePicker
              startDate={allFilters.startDate}
              endDate={allFilters.endDate}
              handleFilterChange={handleFilterChange}
            />
          </div>
          <SearchBar
            userId={allFilters.userId}
            searchText={"User ID"}
            handleFilterChange={handleFilterChange}
          />
          <div className="mt-6 mb-3 flex gap-4">
            <SubmitButton handleFilterSubmit={handleFilterSubmit} />
            <ResetButton handleReset={handleReset} />
          </div>
        </form>
      </div>
      {/* cards */}
      {data.length === 0 ? (
        <p className="font-medium text-lg text-subTextColor text-center mt-4 ">
          Please give User ID, Start & End Date.
        </p>
      ) : loading ? (
        <Loader />
      ) : (
        <div className="w-full grid md:grid-flow-row grid-flow-col grid-rows-3 md:grid-rows-1  md:grid-cols-3 gap-5 mb-7 ">
          <div className="w-full bg-white rounded-md shadow-md ring-1 ring-gray-200">
            <h3 className="text-2xl font-medium text-textColor flex flex-row justify-between pt-3 px-5">
              <span className="">Cash Business</span>
              <span className="">{data?.cashBusiness || 0}</span>
            </h3>
            <p className="text-sm font-normal text-subTextColor flex flex-row justify-between pt-1 pb-3 px-[1.35rem]">
              <span className="">Total Cash Business</span>
              <span className="">Total</span>
            </p>
          </div>
          <div className="w-full bg-white rounded-md shadow-md ring-1 ring-gray-200">
            <h3 className="text-2xl font-medium text-textColor flex flex-row justify-between pt-3 px-5">
              <span className="">Vocuher Business</span>
              <span className="">{data?.tokenBusiness || 0}</span>
            </h3>
            <p className="text-sm font-normal text-subTextColor flex flex-row justify-between pt-1 pb-3 px-[1.35rem]">
              <span className="">Total Vocuher Business</span>
              <span className="">Total</span>
            </p>
          </div>
          <div className="w-full bg-white rounded-md shadow-md ring-1 ring-gray-200">
            <h3 className="text-2xl font-medium text-textColor flex flex-row justify-between pt-3 px-5">
              <span className="">Withdrawal Business</span>
              <span className="">{data?.withdrawals || 0}</span>
            </h3>
            <p className="text-sm font-normal text-subTextColor flex flex-row justify-between pt-1 pb-3 px-[1.35rem]">
              <span className="">Total Withdrawal Business</span>
              <span className="">Total</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCashBusiness;
