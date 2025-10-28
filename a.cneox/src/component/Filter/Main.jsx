import React, { useCallback, useEffect, useState } from "react";
import Header from "../ReportsFilter/Header";
import ExportButton from "../ReportsFilter/ExportButton";
import SubmitButton from "../ReportsFilter/SubmitButton";
import ResetButton from "../ReportsFilter/ResetButton";
import { ReportsTable } from "..";
import SearchBar from "../ReportsFilter/SearchBar";
import DateRangePicker from "../ReportsFilter/DateRangePicker";
import PowerLegAccountForm from "../../pages/Influencers/PowerLegAccountForm";
import FreeAccountForm from "../../pages/Influencers/FreeAccountForm";
import useKeyboardFilterSubmit from "../../hooks/useKeyboardFilterSubmit";
import CreateInvestmentForm from "../../pages/Influencers/CreateInvestmentForm";

const Main = ({
  data,
  columns,
  createInvestmentForm = false,
  headerText,
  ticketsTable = false,
  showSearchField = true,
  powerLegForm = false,
  freeAccountForm = false,
  renderFunc,
  searchByCountry = false,
  removeDateFilter = true,
  hidePagination,
  withdrawal,
}) => {
  const [allFilters, setAllFilters] = useState({
    userId: "",
    startDate: "",
    endDate: "",
    country: "",
    merchant: "",
  });
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (name) => (event) => {
    setAllFilters((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleFilterSubmit = useCallback(() => {
    console.log(allFilters);
    if (data) {
      const tempFilteredData = data?.filter((entry) => {
        const entryDate =
          entry.date ||
          entry.created_at ||
          entry.investment_date ||
          entry.txn_date ||
          entry.created_date ||
          entry.createdAt ||
          entry?.date;

        const entryUserId =
          entry.user_Id ||
          entry.userId ||
          entry.Id ||
          entry.user_id ||
          entry.user?.id ||
          entry.userid;

        const entryCountry = entry.country;
        const entryMerchant = entry.merchant;
        // console.log(
        //   entryCountry
        //  ?.toLowerCase()
        //     .split("")
        //     .filter((ele) => ele !== "\t")
        //     .join("")
        // );

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
            )) &&
          (!allFilters.merchant ||
            entryMerchant === allFilters.merchant.trim()) &&
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
              ))
        );
      });
      setFilteredData(tempFilteredData);
    }
  }, [
    allFilters.endDate,
    allFilters.startDate,
    allFilters.userId,
    allFilters.country,
    allFilters.merchant,
    data,
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
      merchant: "",
    });
    setFilteredData(data);
  };

  // useEffect(() => {
  //   const keyboardHandler = (e) => {
  //     // console.log(e.key);
  //     if (e.key === "Enter") {
  //       handleFilterSubmit();
  //       // console.log(e.key);
  //     }
  //   };

  //   document.addEventListener("keydown", keyboardHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyboardHandler);
  //   };
  // }, [handleFilterSubmit]);

  useKeyboardFilterSubmit(handleFilterSubmit);

  return (
    <div className="flex flex-col gap-3 justify-center p-3">
      {!hidePagination && <Header headerText={headerText} />}
      {ticketsTable && (
        <div className="w-full grid md:grid-flow-row grid-flow-col grid-rows-3 md:grid-rows-1  md:grid-cols-3 gap-5  mt-5">
          <div className="w-full bg-white rounded-md shadow-md ring-1 ring-gray-200">
            <h3 className="text-2xl font-medium text-textColor flex flex-row justify-between pt-3 px-5">
              <span className="">Total</span>
              <span className="">0</span>
            </h3>
            <p className="text-sm font-normal text-subTextColor flex flex-row justify-between pt-1 pb-3 px-[1.35rem]">
              <span className="">Total Tickets</span>
              <span className="">Total</span>
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md ring-1 ring-gray-200">
            <h3 className="text-2xl font-medium text-textColor flex flex-row justify-between pt-3 px-5">
              <span className="">Open Tickets</span>
              <span className="">0</span>
            </h3>
            <p className="text-sm font-normal text-subTextColor flex flex-row justify-between pt-1 pb-3 px-[1.35rem]">
              <span className="">In the Order</span>
              <span className="">Total</span>
            </p>
          </div>
          <div className="bg-white rounded-md shadow-md ring-1 ring-gray-200">
            <h3 className="text-2xl font-medium text-textColor flex flex-row justify-between pt-3 px-5">
              <span className="">Closed Tickets</span>
              <span className="">0</span>
            </h3>
            <p className="text-sm font-normal text-subTextColor flex flex-row justify-between pt-1 pb-3 px-[1.35rem]">
              <span className="">Answered</span>
              <span className="">Total</span>
            </p>
          </div>
        </div>
      )}
      {powerLegForm && (
        <div className="mt-4">
          <PowerLegAccountForm renderFunc={renderFunc} />
        </div>
      )}
      {freeAccountForm && (
        <div className="mt-4">
          <FreeAccountForm renderFunc={renderFunc} />
        </div>
      )}
      {createInvestmentForm && (
        <div className="mt-4">
          <CreateInvestmentForm renderFunc={renderFunc} />
        </div>
      )}
      {!hidePagination && (
        <div className="flex flex-row  gap-4 items-center mt-4 flex-wrap ">
          {!ticketsTable && showSearchField && (
            <SearchBar
              searchText={"User ID"}
              userId={allFilters.userId}
              handleFilterChange={handleFilterChange}
            />
          )}

          {searchByCountry && (
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
          )}
          {withdrawal && (
            <div className="mb-7">
              <label
                htmlFor="search"
                className="block mb-2 text-base font-normal text-subTextColor"
              >
                Search by Merhant
              </label>
              <input
                name={"merchant"}
                value={allFilters.merchant}
                onChange={handleFilterChange("merchant")}
                type="text"
                className="bg-gray-50 border w-full max-w-[36rem] border-gray-300 text-textColor text-md  ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2 "
                placeholder={`Search by Merchant`}
              />
            </div>
          )}

          {removeDateFilter && (
            <DateRangePicker
              startDate={allFilters.startDate}
              endDate={allFilters.endDate}
              handleFilterChange={handleFilterChange}
            />
          )}
        </div>
      )}
      {!hidePagination && (
        <div className="flex gap-4 my-0">
          <SubmitButton handleFilterSubmit={handleFilterSubmit} />
          <ExportButton dataToExport={data} filename={headerText} />
          <ResetButton handleReset={handleReset} />
        </div>
      )}
      <ReportsTable
        columns={columns}
        data={filteredData}
        changeRowColor={headerText === "Coin Payment Report"}
        renderFunction={renderFunc}
        hidePagination={hidePagination}
      />
    </div>
  );
};

export default Main;
