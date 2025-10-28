import React, { useEffect, useState } from "react";
import Header from "../../component/ReportsFilter/Header";
import { fetchUserKundli } from "../../services/userService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import { useParams } from "react-router-dom";
import { ReportsTable } from "../../component";

const Main = () => {
  const { userId } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataCallback = async () => {
      try {
        const response = await fetchUserKundli(userId);
        setData(response.data?.data);
        console.log(response.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchDataCallback();
  }, [userId]);

  const columns = [
    // { field: "txn_id", fieldName: "TXN ID" },
    { field: "user_id", fieldName: "User ID" },
    { field: "amount", fieldName: "Amount" },
    { field: "merchant", fieldName: "Merchant" },
    { field: "charges", fieldName: "Charges" },
    { field: "crypto_type", fieldName: "Crypto Type" },
    { field: "date", fieldName: "Date" },
    { field: "wallet_type", fieldName: "from_wallet" },

    { field: "final_amount", fieldName: "Final Amount" },
    { field: "status", fieldName: "Status" },
  ];
  const investmentolumns = [
    // { field: "txn_id", fieldName: "Transaction ID" },
    { field: "user_id", fieldName: "User ID", multipleValues: true },
    { field: "sponsor", fieldName: "Sponsor" },
    { field: "package_id", fieldName: "Package ID" },
    { field: "invested_amount", fieldName: "Invested Amount" },
    { field: "investment_date", fieldName: "Invested Date" },
    { field: "expires_on", fieldName: "Expires On" },
    { field: "deposit_amount", fieldName: "Deposit Amount" },
    { field: "token_amount", fieldName: "Voucher Amount" },
    { field: "type", fieldName: "Investmet Type" },
  ];
  const binaryColumns = [
    { field: "date", fieldName: "Date" },
    { field: "status", fieldName: "Status" },
    { field: "amount", fieldName: "Amount" },
  ];
  const referralColumns = [
    { field: "date", fieldName: "Date" },

    {
      field: "referral_user_id",
      fieldName: "Investment By",
      multipleValues: true,
    },

    { field: "amount", fieldName: "Referral Amount" },
  ];

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      <Header headerText={"User Information"} />
      {/* base div */}
      <div className="flex flex-row gap-8 mt-6">
        {/* div 1 */}
        <div className="w-1/3 ">
          {/* username div */}
          <div className="bg-white w-full px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
            <h3 className="text-2xl font-semibold text-blueColor">
              {data?.user_id}
            </h3>
            <p className="text-subTextColor text-base pt-1">
              {data?.user_name}
            </p>
          </div>
          {/* up down left right div */}
          <div className="bg-white w-full px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 flex flex-row justify-between text-center flex-wrap mb-5">
            <div className="p-2.5 ">
              <h4 className="text-xl font-semibold text-textColor">
                {data?.left_downlines || 0}
              </h4>
              <p className="text-subTextColor text-xs pt-1">Left Downline</p>
            </div>
            <div className="p-2.5 ">
              <h4 className="text-xl font-semibold text-textColor">
                {Number(data?.right_downlines || 0) +
                  Number(data?.left_downlines || 0)}
              </h4>
              <p className="text-subTextColor text-xs pt-1">Total Downline</p>
            </div>
            <div className="p-2.5 ">
              <h4 className="text-xl font-semibold text-textColor">
                {data?.right_downlines || 0}
              </h4>
              <p className="text-subTextColor text-xs pt-1">Right Downline</p>
            </div>
            <div className="p-2.5 ">
              <h4 className="text-xl font-semibold text-textColor">
                {data?.count_referrers || 0}
              </h4>
              <p className="text-subTextColor text-xs pt-1">Direct Downline</p>
            </div>
          </div>
          {/* personal information div */}
          <div className="bg-white w-full px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 ">
            <h3 className="text-lg font-semibold text-blueColor mb-2.5">
              Personal Information
            </h3>
            <div className="">
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                User ID{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.user_id}
                </span>
              </p>
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                Email{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.email}
                </span>
              </p>
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                Country{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.country}
                </span>
              </p>
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                Security Pin{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.security_pin}
                </span>
              </p>
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                Password
                <span className="font-normal text-subTextColor text-right">
                  {data?.new_password}
                </span>
              </p>
            </div>
            <hr className="bg-textColor my-4" />
            <h3 className="text-lg font-semibold text-blueColor mb-2.5">
              Sponsor Information
            </h3>
            <div className="">
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                Name{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.sponsor_name}
                </span>
              </p>
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                User ID{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.referrer_id}
                </span>
              </p>
              <p className="text-textColor font-semibold text-sm flex py-1.5  justify-between text-left">
                Email{" "}
                <span className="font-normal text-subTextColor text-right">
                  {data?.sponsor_email}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* div 2 */}
        <div className=" w-2/3 ">
          {/* Investment Cards */}
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-textColor mb-5 flex justify-between text-left">
              Investments{" "}
              <span className="text-right">${data?.total_investment}</span>
            </h3>
            <div className=" w-full grid grid-flow-row grid-rows-2 grid-cols-3 gap-5">
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.cash_investment || "$00.00"}
                </h3>
                <p className="text-subTextColor">Cash Investment</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.voucher_investment || "$00.00"}
                </h3>
                <p className="text-subTextColor">Voucher Investment</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.downline_investment || "$00.00"}
                </h3>
                <p className="text-subTextColor">Downline Investment</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.powerleg_investment || "$00.00"}
                </h3>
                <p className="text-subTextColor">Powerleg Investment</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.free_investment || "$00.00"}
                </h3>
                <p className="text-subTextColor">Free Investment</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.last_investment_date || "$00.00"}
                </h3>
                <p className="text-subTextColor">Last Investment Date</p>
              </div>
            </div>
          </div>
          {/* Wallet Balance */}
          <div className="">
            <h3 className="text-xl font-semibold text-textColor flex justify-between text-left">
              Wallet Balance
            </h3>
            <div className=" w-full grid grid-flow-row grid-rows-2 grid-cols-3 gap-5">
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.roi_wallet || "$00.00"}
                </h3>
                <p className="text-subTextColor">ROI Wallet</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.referral_binary_wallet || "$00.00"}
                </h3>
                <p className="text-subTextColor">R&B Wallet</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.interest_wallet || "$00.00"}
                </h3>
                <p className="text-subTextColor">Interest Wallet</p>
              </div>
            </div>
          </div>
          {/* Business */}
          <div className="w-full">
            <h3 className="text-xl font-semibold text-textColor mb-5 flex justify-between text-left">
              Business{" "}
              {/* <span className="text-right">${data?.total_bu}</span> */}
            </h3>
            <div className=" w-full flex gap-5">
              <div className=" w-1/2 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.direct_business || "$00.00"}
                </h3>
                <p className="text-subTextColor">Direct Referral business</p>
              </div>
              <div className="w-1/2 bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {parseFloat(data?.left_business) +
                    parseFloat(data?.right_business) || "$00.00"}
                </h3>
                <p className="text-subTextColor">Team Business</p>
              </div>
            </div>
          </div>
          {/* Earnings */}
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-textColor mb-5 flex justify-between text-left">
              Earnings{" "}
              <span className="text-right">${data?.total_earning}</span>
            </h3>
            <div className=" w-full grid grid-flow-row grid-rows-2 grid-cols-3 gap-5">
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.total_roi || "$00.00"}
                </h3>
                <p className="text-subTextColor">ROI</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.referral_wallet || "$00.00"}
                </h3>
                <p className="text-subTextColor">Referral Wallet</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.binary_wallet || "$00.00"}
                </h3>
                <p className="text-subTextColor">Binary Wallet</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.career_rewards || "$00.00"}
                </h3>
                <p className="text-subTextColor">Interest Wallet</p>
              </div>
            </div>
          </div>
          {/* Withdrawals */}
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-textColor mb-5 flex justify-between text-left">
              Withdrawals{" "}
              <span className="text-right">${data?.total_withdrawal}</span>
            </h3>
            <div className=" w-full grid grid-flow-row grid-rows-1 grid-cols-3 gap-5">
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.withdrawal_roi || "$00.00"}
                </h3>
                <p className="text-subTextColor">ROI Withdrawals</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.withdrawal_rnb || "$00.00"}
                </h3>
                <p className="text-subTextColor">R&B Withdrawals</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.withdrawal_interest || "$00.00"}
                </h3>
                <p className="text-subTextColor">Interest Withdrawal</p>
              </div>
            </div>
          </div>
          {/* Transfer-sent */}
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-textColor mb-5 flex justify-between text-left">
              Voucher Generated
              <span className="text-right">
                ${data?.toal_voucher_generated}
              </span>
            </h3>
            <div className=" w-full grid grid-flow-row grid-rows-2 grid-cols-2 gap-5">
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.roi_generated_voucher || "$00.00"}
                </h3>
                <p className="text-subTextColor">ROI</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.rnb_generated_voucher || "$00.00"}
                </h3>
                <p className="text-subTextColor">R&B</p>
              </div>
              <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
                <h3 className="text-textColor font-semibold text-xl mb-2">
                  {data?.interest_generated_voucher || "$00.00"}
                </h3>
                <p className="text-subTextColor">Interest</p>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>

      {/* table div */}
      <div className="">
        <h3 className="text-lg font-semibold text-blueColor mb-2.5">
          Withdrawals
        </h3>
        <ReportsTable columns={columns} data={data?.withdrawals} />
      </div>
      <div className="">
        <h3 className="text-lg font-semibold text-blueColor mb-2.5">
          Investments
        </h3>
        <ReportsTable columns={investmentolumns} data={data?.investments} />
      </div>
      <div className="">
        <h3 className="text-lg font-semibold text-blueColor mb-2.5">
          Referrals
        </h3>
        <ReportsTable
          columns={referralColumns}
          data={data?.referralTransactions}
        />
      </div>
      <div className="">
        <h3 className="text-lg font-semibold text-blueColor mb-2.5">Binary</h3>
        <ReportsTable columns={binaryColumns} data={data?.binaryTransactions} />
      </div>
    </div>
  );
};

export default Main;

const GridCards = ({ title, type, data }) => (
  <div className=" bg-white px-7 py-4 rounded-md shadow-md ring-1 ring-gray-200 mb-5">
    <h3 className="text-textColor font-semibold text-xl mb-2">
      {data[type] || "$00.00"}
    </h3>
    <p className="text-subTextColor">{title}</p>
  </div>
);
