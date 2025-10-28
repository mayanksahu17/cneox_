import React, { useEffect, useState } from "react";
import { FiBarChart, FiDollarSign, FiUser } from "react-icons/fi";
import {
  MdBarChart,
  MdOutlineAttachMoney,
  MdOutlineVerified,
} from "react-icons/md";
import {
  AreaGraph,
  BarChart,
  LineGraph,
  Piechart,
  ReportsTable,
} from "../../component";
import { dummyInvestmentReportData } from "../../dummydata";
import { getDashboardData } from "../../services/dashboardServieces";
import Loader from "../../component/Loader/Main";
import { PiMedalLight } from "react-icons/pi";
import BasicBarChart from "../../component/Charts/BasicBarChart";
// Dashboard

const tabsData = [
  {
    title: "Total User",
    field: "total_users",
    addDollar: false,
    icon: (
      <FiUser className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Verified User",
    field: "total_verified_users",
    addDollar: false,
    icon: (
      <MdOutlineVerified className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Unverified User",
    field: "total_unverified_users",
    addDollar: false,
    icon: (
      <FiUser className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Deposits",
    field: "sum_of_total_deposits",
    addDollar: true,
    icon: (
      <MdOutlineAttachMoney className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Withdrawals",
    field: "sum_of_total_withdrawals",
    addDollar: true,
    icon: (
      <MdBarChart className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Investment",
    field: "total_investment",
    addDollar: true,
    icon: (
      <MdBarChart className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Voucher Investment",
    field: "total_voucher_investment",
    addDollar: true,
    icon: (
      <MdBarChart className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Free Investment",
    field: "total_free_amount",
    addDollar: true,
    icon: (
      <MdBarChart className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Powerleg Investment",
    field: "total_powerleg_amount",
    addDollar: true,
    icon: (
      <MdBarChart className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total ROI",
    field: "total_roi_given",
    addDollar: true,
    icon: (
      <MdBarChart className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Referral Bonus",
    field: "total_referral_given",
    addDollar: true,
    icon: (
      <PiMedalLight className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
  {
    title: "Total Binary Bonus",
    field: "total_binary_given",
    addDollar: true,
    icon: (
      <PiMedalLight className="text-3xl font-bold text-center text-primaryColor" />
    ),
  },
];

const Main = () => {
  const columns = [
    { field: "txn_id", fieldName: "Transaction ID" },
    { field: "user_id", fieldName: "User", multipleValues: true },
    { field: "sponsor", fieldName: "Sponsor" },
    { field: "package_name", fieldName: "Package Name" },
    { field: "invested_amount", fieldName: "Invested Amount" },
    { field: "investment_date", fieldName: "Invested Date" },
    { field: "expires_on", fieldName: "Expires On" },
    { field: "deposit_amount", fieldName: "Deposit Amount" },
    { field: "token_amount", fieldName: "Token Amount" },
    { field: "type", fieldName: "Investmet Type" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDashboardData();
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  console.log(data);

  return true ? (
    <Loader />
  ) : ( 
    <div>
      {/* Dashboard */}
      {/* tab component to show data */}
      <div className="flex flex-row flex-wrap justify-start w-full mb-10 gap-x-8 gap-y-6">
        {tabsData.map((ele, k) => (
          <TabComponent
            key={k}
            title={ele.title}
            field={ele.field}
            addDollar={ele.addDollar}
            icon={ele.icon}
            data={data?.stats}
          />
        ))}
      </div>
      {/* charts :- line graph, bar chart, area graph, pie chart */}
      {/* <div className="grid w-full grid-cols-1 grid-rows-4 gap-12 lg:grid-rows-2 lg:grid-cols-2">
        <div>
          <LineGraph data={data?.dailyInvestmentsAndWithdrawal} />
        </div>
        <div>
          <BarChart data={data?.returnsGiven} />
        </div>
        <div>
          <AreaGraph data={data?.dailyUsers} />
        </div>
        <div>
          <Piechart data={data?.investmentsByPackage} />
        </div>
      </div> */}
      {/* table of 5 latest investments */}
      {/* <div className="mt-10">
        <h4 className="mb-8 text-2xl font-semibold text-textColor">
          Recent Investments
        </h4>
        <ReportsTable
          columns={columns}
          data={data?.investments}
          hidePagination={true}
        />
      </div> */}
    </div>
  );
};

const TabComponent = ({ title, field, addDollar, icon, data }) => (
  <div className="w-64 h-[4.5rem] scale-90 sm:scale-100  flex flex-row  items-center  ring-gray-300 ring-[1px] px-3 py-1 rounded-md shadow-md gap-4">
    <div className="p-2 rounded-full bg-primaryColor bg-opacity-30">{icon}</div>
    <div className="">
      <p className="text-xs font-medium text-subTextColor">{title}</p>
      <h3 className="text-xl font-semibold text-textColor ">
        {addDollar && "$"}
        {data[field] || (addDollar ? "00.00" : "0")}
      </h3>
    </div>
  </div>
);

export default Main;
