import React, { useCallback, useEffect, useState } from "react";
import Header from "../../component/ReportsFilter/Header";
import useKeyboardFilterSubmit from "../../hooks/useKeyboardFilterSubmit";
import { ReportsTable } from "../../component";
import SubmitButton from "../../component/ReportsFilter/SubmitButton";
import ExportButton from "../../component/ReportsFilter/ExportButton";
import ResetButton from "../../component/ReportsFilter/ResetButton";
import DateRangePicker from "../../component/ReportsFilter/DateRangePicker";
import SearchBar from "../../component/ReportsFilter/SearchBar";
import UsersTable from "../../component/ReportsTable/UsersTable";

const UserlistComp = ({ data, columns, headerText, renderFunc }) => {
  const [allFilters, setAllFilters] = useState({
    userId: "",
    startDate: "",
    endDate: "",
    country: "",
    status: "",
  });
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (name) => (event) => {
    setAllFilters((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleFilterSubmit = useCallback(() => {
    if (data) {
      let finalData;

      if (allFilters?.userId) {
       console.log("inside userId")
        const sortedData = data.slice().sort((a, b) => {
          const idA = a.serialNumber;
          const idB = b.serialNumber;
          return idA - idB;
        });

        finalData = sortedData;
      } else {
        finalData = data;
      }
      const tempFilteredData = finalData?.filter((entry) => {
        const entryDate =
          entry.date ||
          entry.created_at ||
          entry.investment_date ||
          entry.txn_date ||
          entry.created_date ||
          entry.createdAt;

        const entryUserId =
          entry.user_Id ||
          entry.userId ||
          entry.Id ||
          entry.user_id ||
          entry.user?.id ||
          entry.userid;

        const entryCountry = entry.countryAndPhone.split(",")[0];

        // setting the oprder

        const entryStatus = entry.status;

        const entrySponsorId = entry.sponsor.id;

        // console.log(entrySponsorId.includes(allFilters.userId));
        // console.log(entrySponsor);

        const entryEmail = entry.user.email;

        return (
          (!allFilters.startDate ||
            new Date(entryDate) >= new Date(allFilters.startDate)) &&
          (!allFilters.endDate ||
            new Date(entryDate) <= new Date(allFilters.endDate)) &&
          (!allFilters.userId ||
            entryUserId?.includes(
              allFilters.userId
                .split("")
                .filter((ele) => ele !== "\t")
                .join("")
            ) ||
            entrySponsorId.includes(allFilters.userId) ||
            entryEmail.includes(allFilters.userId)) &&
          (!allFilters.country ||
            entryCountry
              ?.toLowerCase()
              .split("")
              .filter((ele) => ele !== "\t")
              .join("")
              .includes(
                allFilters.country
                  .toLowerCase()
                  .split("")
                  .filter((ele) => ele !== "\t")
                  .join("")
              )) &&
          (!allFilters.status || entryStatus === allFilters.status)
        );
      });

      setFilteredData(tempFilteredData);
    }
  }, [
    allFilters.endDate,
    allFilters.startDate,
    allFilters.userId,
    data,
    allFilters.country,
    allFilters.status,
  ]);

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData]);

  const handleReset = () => {
    setAllFilters({
      userId: "",
      startDate: "",
      endDate: "",
      country: "",
      status: "",
    });
    setFilteredData(data);
  };

  //   console.log("Åland Islands, d".split(",")[0]);
  //   console.log(allFilters);

  useKeyboardFilterSubmit(handleFilterSubmit);

  return (
    <div className="flex flex-col gap-3 justify-center p-3">
      <Header headerText={headerText} />

      <div className="flex flex-row   gap-x-6 items-center mt-4 flex-wrap ">
        <SearchBar
          searchText={"User ID or Email"}
          userId={allFilters.userId}
          handleFilterChange={handleFilterChange}
        />
        <div className="mb-7">
          <label
            htmlFor="search"
            className="block mb-2 text-base font-normal text-subTextColor"
          >
            Search by Country
          </label>
          <input
            name={"country"}
            value={allFilters.country}
            onChange={handleFilterChange("country")}
            type="text"
            className="bg-gray-50 border w-full max-w-[36rem] border-gray-300 text-textColor text-md  ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2 "
            placeholder={`Search by Country`}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="select_wallet"
            className="block mb-2.5 text-sm font-medium text-subTextColor "
          >
            Choose Status
          </label>

          <select
            className="bg-gray-50 border w-[24rem] border-gray-300 text-textColor text-md  ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2 "
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value !== "Select Status")
                setAllFilters({
                  ...allFilters,
                  status: e.target.value,
                });
            }}
          >
            <option disabled selected={allFilters.status === ""} hidden>
              Select Status
            </option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <DateRangePicker
          startDate={allFilters.startDate}
          endDate={allFilters.endDate}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className="flex gap-4 my-0">
        <SubmitButton handleFilterSubmit={handleFilterSubmit} />
        <ExportButton dataToExport={data} filename={headerText} />
        <ResetButton handleReset={handleReset} />
      </div>
      {/* {console.log(filteredData)} */}
      {/* {console.log(allFilters)} */}
      <UsersTable
        columns={columns}
        data={filteredData}
        renderFunction={renderFunc}
      />
    </div>
  );
};

export default UserlistComp;
