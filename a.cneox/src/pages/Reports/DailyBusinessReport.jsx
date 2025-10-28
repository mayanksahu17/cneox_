import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import reportService from "../../services/reportService";
import toast from "react-hot-toast";
import ReportFilter from "../../component/Filter/Main";
import Loader from "../../component/Loader/Main";

const DailyBusinessReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [totalData, setTotalData] = useState([]);
  const [last7Days, setLast7Days] = useState(null);
  const [last30Days, setLast30Days] = useState(null);
  const getTotalData = (response) => {
    const formattedTotalReports = {
      cash_investment: 0,
      investment: 0,
      deposit: 0,
      free_investment: 0,
      interest_withdrawal: 0,
      powerleg_investment: 0,
      rnb_withdrawal: 0,
      roi_withdrawal: 0,
      self_investment: 0,
      token_investment: 0,
      users_registered: 0,
    };

    response.forEach((item) => {
      formattedTotalReports.cash_investment += parseFloat(item.cash_investment);
      formattedTotalReports.investment += parseFloat(item.investment);
      formattedTotalReports.free_investment += parseFloat(item.free_investment);
      formattedTotalReports.interest_withdrawal += parseFloat(
        item.interest_withdrawal
      );
      formattedTotalReports.powerleg_investment += parseFloat(
        item.powerleg_investment
      );
      formattedTotalReports.rnb_withdrawal += parseFloat(item.rnb_withdrawal);
      formattedTotalReports.roi_withdrawal += parseFloat(item.roi_withdrawal);
      formattedTotalReports.self_investment += parseFloat(item.investment);
      formattedTotalReports.token_investment += parseFloat(
        item.token_investment
      );
      formattedTotalReports.users_registered += item.total_signups;
    });
    for (let key in formattedTotalReports) {
      formattedTotalReports[key] = parseFloat(
        formattedTotalReports[key]
      ).toFixed(2);
    }
    const formattedDataArray = [formattedTotalReports]; // Wrap the formatted data in an array
    return formattedDataArray;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportService.getDailyReport(user);
        // console.log(response.data.data);

        const dataArray = response.data.data;

        // Separate the last 7 and 30 days data
        const last7DaysData = dataArray.find(
          (item) => item.period === "last_7_days"
        );
        const last30DaysData = dataArray.find(
          (item) => item.period === "last_30_days"
        );

        setLast7Days(last7DaysData);
        setLast30Days(last30DaysData);
        // Filter out period-specific entries for the general report data
        const mainData = dataArray.filter((item) => !item.period);

        setData(mainData);
        const formattedDataArray = getTotalData(mainData);
        setTotalData(formattedDataArray);
        setTotalData(formattedDataArray);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [user]);

  const columns = [
    { field: "date", fieldName: "Date" },
    { field: "total_signups", fieldName: "Total Sign-ups" },
    { field: "investment", fieldName: "Investment" },
    { field: "cash_investment", fieldName: "Cash Investment" },
    { field: "token_investment", fieldName: "Voucher Investment" },
    { field: "powerleg_investment", fieldName: "Powerleg Investment" },
    { field: "free_investment", fieldName: "Free Investment" },
    { field: "roi_withdrawal", fieldName: "ROI Withdrawal" },
    { field: "interest_withdrawal", fieldName: "Interest Withdrawal" },
    { field: "rnb_withdrawal", fieldName: "R&B Investment" },
  ];
  const columnsDataTotalDailyReport = [
    { field: "users_registered", fieldName: "Total Sign-ups" },
    { field: "investment", fieldName: "Investment" },
    { field: "cash_investment", fieldName: "Cash Investment" },
    { field: "token_investment", fieldName: "Voucher Investment" },
    { field: "powerleg_investment", fieldName: "Powerleg Investment" },
    { field: "free_investment", fieldName: "Free Investment" },
    { field: "roi_withdrawal", fieldName: "ROI Withdrawal" },
    { field: "interest_withdrawal", fieldName: "Interest Withdrawal" },
    { field: "rnb_withdrawal", fieldName: "R&B Investment" },
  ];
  // Render the component structure
  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full">
            <h3 className="text-xl font-semibold text-textColor mb-5">
              Last 7 Days
            </h3>
            <div className="w-full flex gap-5">
              <div className="w-1/3 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(last7Days?.total_cash_deposit).toFixed(2) ||
                    "$00.00"}
                </h3>
                <p className="text-subTextColor">Total Cash Investment</p>
              </div>
              <div className="w-1/3 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(last7Days?.total_roi_withdrawal).toFixed(2) ||
                    "$00.00"}
                </h3>
                <p className="text-subTextColor">Total ROI Withdrawal</p>
              </div>
              <div className="w-1/3 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(last7Days?.total_rnb_withdrawal).toFixed(2) ||
                    "$00.00"}
                </h3>
                <p className="text-subTextColor">Total R&B Withdrawal</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-xl font-semibold text-textColor mb-5">
              Last 30 Days
            </h3>
            <div className="w-full flex gap-5">
              <div className="w-1/3 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(last30Days?.total_cash_deposit).toFixed(2) ||
                    "$00.00"}
                </h3>
                <p className="text-subTextColor">Total Cash Investment</p>
              </div>
              <div className="w-1/3 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(last30Days?.total_roi_withdrawal).toFixed(2) ||
                    "$00.00"}
                </h3>
                <p className="text-subTextColor">Total ROI Withdrawal</p>
              </div>
              <div className="w-1/3 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(last30Days?.total_rnb_withdrawal).toFixed(2) ||
                    "$00.00"}
                </h3>
                <p className="text-subTextColor">Total R&B Withdrawal</p>
              </div>
            </div>
          </div>
          <ReportFilter
            data={totalData}
            columns={columnsDataTotalDailyReport}
            showSearchField={false}
            hidePagination={true}
          />
          <ReportFilter
            data={data}
            columns={columns}
            headerText={"Daily Business Report"}
            showSearchField={false}
          />
        </>
      )}
    </div>
  );
};

export default DailyBusinessReport;
