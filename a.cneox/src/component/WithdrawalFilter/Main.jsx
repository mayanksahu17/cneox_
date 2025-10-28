import React, { useEffect, useState } from "react";
import Header from "../ReportsFilter/Header";
import ExportButton from "../ReportsFilter/ExportButton";
import SubmitButton from "../ReportsFilter/SubmitButton";
import ResetButton from "../ReportsFilter/ResetButton";
import SearchBar from "../ReportsFilter/SearchBar";
import DateRangePicker from "../ReportsFilter/DateRangePicker";
import { CheckBoxTable } from "..";
import { approveOrRejectWithdrawal } from "../../services/withdrawalService";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import {
  changeNotificationStatus,
  getAllUnReadNotification,
} from "../../services/notificationServices";

const gatewayOption = [
  "Bitcoin",
  "Cronos",
  "Ethereum",
  "Tether",
  "USD Coin",
  "Dai",
  "Pax Dollar",
  "Algorand",
  "Avalanche",
  "Binance Coin",
  "Cardano",
  "Celer Network",
  "COSMOS",
  "Elrond",
  "Fantom",
  "NEAR Protocol",
  "Polkadot",
  "Polygon",
  "Solana",
  "VeChain",
  "Zillika",
  "LTCT",
];

const Main = ({ data, columns, headerText, renderFunc }) => {
  const { notifications, updateNotifications } = useAuth();

  const markAllNotifications = async ({ type }) => {
    const roiNotifications = notifications.filter(
      (notification) => notification.type === type && notification.is_seen === 0
    );
    const roiNotificationIds = roiNotifications.map(
      (notification) => notification.id
    );

    if (roiNotificationIds.length > 0) {
      try {
        const response = await changeNotificationStatus({
          ids: roiNotificationIds,
          status: 1,
        });
      } catch (error) {
        console.log(error);
      }
      updateNotifications([]);
      try {
        const response = await getAllUnReadNotification();
        updateNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [allFilters, setAllFilters] = useState({
    userId: "",
    startDate: "",
    endDate: "",
    cryptoType: "",
    merchant: "",
  });
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (name) => (event) => {
    setAllFilters((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleFilterSubmit = () => {
    if (data) {
      const tempFilteredData = data?.filter((entry) => {
        const entryDate =
          entry.date ||
          entry.created_at ||
          entry.investment_date ||
          entry.txn_date ||
          entry.created_date;
        const entryUserId =
          entry.user_Id || entry.userId || entry.Id || entry.user_id;

        const entryCryptoType = entry.crypto_type;

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
          (!allFilters.cryptoType ||
            entryCryptoType?.includes(allFilters.cryptoType))
        );
      });
      setFilteredData(tempFilteredData);
    }
  };

  useEffect(() => {
    setFilteredData(filteredData);
    // Calculate the total of all "Final amounts"
    const sum = filteredData.reduce(
      (acc, entry) => acc + parseFloat(entry.final_amount),
      0
    );
    setTotalFinalAmount(sum);
  }, [filteredData]);

  const handleWithdrawalClick = async (merchant) => {
    console.log("merchant in mac withdrawal");
    console.log(merchant);
    const tempFilteredData = data?.filter((entry) => {
      return entry?.merchant === merchant;
    });

    setFilteredData(tempFilteredData);
  };
  const [totalFinalAmount, setTotalFinalAmount] = useState(0); // State variable to store the total of all "Final amounts"

  const handleReset = () => {
    setAllFilters({
      userId: "",
      startDate: "",
      endDate: "",
      cryptoType: "",
      merchant: "",
    });
    setFilteredData(data);
  };

  const [selectedDataIds, setSelectedDataIds] = useState([]);

  const [approvedloading, setApprovedLoading] = useState(false);

  const [rejectedloading, setRejectedLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedDataIds !== 0) {
      setApprovedLoading(true);
      const data = {
        txn_ids: selectedDataIds,
        status: "approved",
        charges: +charges,
      };

      try {
        const response = await approveOrRejectWithdrawal(data);
        let type;
        if (headerText === "R&B Withdrawal") {
          type = "rb_withdrawal";
        } else if (headerText === "Interest Withdrawal") {
          type = "interest_withdrawal";
        } else if (headerText === "ROI Withdrawal") {
          type = "roi_withdrawal";
        }
        markAllNotifications({ type });
        toast.success("Withdrawal Approved Successfully");
        renderFunc((prev) => !prev);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      } finally {
        setAllFilters({
          userId: "",
          startDate: "",
          endDate: "",
          cryptoType: "",
          merchant: "",
        });
      }
    }
  };
  const handleReject = async () => {
    if (selectedDataIds !== 0) {
      setRejectedLoading(true);
      const data = {
        txn_ids: selectedDataIds,
        status: "rejected",
        charges: charges,
      };

      try {
        const response = await approveOrRejectWithdrawal(data);

        toast.success("Withdrawal Rejected Successfully");
        renderFunc((prev) => !prev);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      } finally {
        setAllFilters({
          userId: "",
          startDate: "",
          endDate: "",
          cryptoType: "",
          merchant: "",
        });
      }
    }
  };

  const [charges, setCharges] = useState("");

  return (
    <div>
      {" "}
      <div className="flex flex-col gap-3 justify-center p-3">
        <div className="flex flex-row justify-between">
          <Header headerText={headerText} />
          <div className="font-bold text-lg">
            ${totalFinalAmount.toFixed(2)}{" "}
          </div>
        </div>
        {/* Display total of all "Final amounts" */}
        <div className=""></div>

        <div className="flex flex-row gap-x-5 items-end mb-5 flex-wrap">
          <div>
            <label
              htmlFor="search"
              className="block mb-2 text-base font-normal text-subTextColor"
            >
              Search
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="search"
              className="bg-gray-50 border w-full max-w-[36rem] border-gray-300 text-textColor text-md  ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2 "
              placeholder={`Enter Amount`}
              value={charges}
              onChange={(e) => {
                setCharges(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-row gap-x-5 h-fit">
            <button
              className="bg-primaryColor  text-white font-medium py-2 px-4 mt-4  rounded-md relative bottom-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={approvedloading}
            >
              {approvedloading ? (
                <FiLoader className="animate-spin ease-in" />
              ) : (
                "Approve Selected"
              )}
            </button>
            <button
              className="bg-redColor text-white font-medium py-2 px-4 mt-4  rounded-md relative bottom-0.5  disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleReject}
              disabled={rejectedloading}
            >
              {rejectedloading ? (
                <FiLoader className="animate-spin ease-in" />
              ) : (
                "Reject Selected"
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <SearchBar
            searchText={"User ID"}
            userId={allFilters.userId}
            handleFilterChange={handleFilterChange}
          />
          <select
            id="select_wallet"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full max-w-[36rem]
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            onChange={(e) => {
              if (e.target.value !== "Select Crypto Type") {
                setAllFilters((prev) => ({
                  ...prev,
                  cryptoType: e.target.value,
                }));
              }
            }}
          >
            <option disabled selected={allFilters.cryptoType === ""} hidden>
              Select Crypto Type
            </option>
            {gatewayOption.map((ele, i) => (
              <option key={i} value={ele}>
                {ele.split("")[0].toUpperCase().concat(ele.slice(1))}
              </option>
            ))}
          </select>
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
        <CheckBoxTable
          columns={columns}
          data={filteredData}
          setSelectedDataIds={setSelectedDataIds}
          filteringParameter={"txn_id"}
          headerText={headerText}
          handleWithdrawalClick={handleWithdrawalClick}
        />
      </div>
    </div>
  );
};

export default Main;
