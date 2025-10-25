import {
  BarChart,
  LineChart,
  PieChart,
  Wallet,
  DollarSign,
  TrendingUp,
  Link,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/dashboard/Loader";
import UpdateWalletAddressModal from "../../components/dashboard/home/UpdateWalletAddressModal";
import WithdrawalModal from "../../components/dashboard/home/WithdrawalModal";
import dashboardService from "../../services/dashboardService";
import userService from "../../services/userService";
import TransferModal from "../../components/dashboard/home/TransferSection";
import { allowedTransferId, disbledUserIds } from "../../constants/tokens";
import CryptoPrice from "../../components/dashboard/home/CryptoPrice";

import bgOfcard from "../../assets/imgs/bgOfcard.jpeg";
import bgOfcard2 from "../../assets/imgs/bgOfcard2.jpeg";
import bgOfcard3 from "../../assets/imgs/bgOfcard3.jpg";


export default function Home() {
  const { user, updateUserDetails } = useAuth();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("roi");
  const [allData, setAllData] = useState({
    totalReturns: 0,
    totalInvestment: 0,
    totalWithdrawal: 0,
    totalEarning: 0,
    totalDeposit: 0,
    totalROI: 0,
    totalRNB: 0,
    latestTransactions: [],
    latestROI: [],
    latestRnB: [],
    latestExtraIncome: [],
    toal_voucher_generated: 0,
    isWithdrawalWalletUpdated:
      JSON.parse(localStorage.getItem("isWithdrawalWalletUpdated")) || false,
    leftBusiness: 0.0,
    rightBusiness: 0.0,
    leftWidth: 0.0,
    rightWidth: 0.0,
    target: 0.0,
    interest_wallet: 0.0,
    binary_career_level: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const updatedUserResponse = await userService.getUserData(user);
        console.log(updatedUserResponse);
        
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsDataLoaded(false);
        const response = await dashboardService.getDashboardData(user);
        const { success, data } = response?.data;
        
        if (success) {
          if (data) {
            // Calculate the width for progress bars (showing current level progress)
            // According to new approach, each level starts from 0 to target amount
            let lWidth = (parseFloat(data?.left_level_business || 0) / parseFloat(data?.binary_next_level_business || 1)) * 100;
            let rWidth = (parseFloat(data?.right_level_business || 0) / parseFloat(data?.binary_next_level_business || 1)) * 100;
            
            setAllData((prev) => ({
              ...prev,
              totalInvestment: data?.total_investment,
              totalReturns:
                parseFloat(data?.total_earning) -
                parseFloat(data?.total_deposit),
              totalWithdrawal: data?.total_withdrawal,
              totalEarning: data?.total_earning,
              totalDeposit: data?.total_deposit,
              roi_wallet: data?.roi_wallet,
              referral_binary_wallet: data?.referral_binary_wallet,
              interest_wallet: data?.interest_wallet,
              deposit_wallet: data?.total_deposit || 0,
              toal_voucher_generated: data?.toal_voucher_generated,
              isWithdrawalWalletUpdated: data?.isWithdrawalWalletUpdated,
              binary_current_level_name: getLevelName(data?.binary_career_level || 0),
              binary_next_level_name: getLevelName((data?.binary_career_level || 0) + 1),
              // Total business values
              totalLeftBusiness: parseFloat(data?.left_business || 0)?.toFixed(2),
              totalRightBusiness: parseFloat(data?.right_business || 0)?.toFixed(2),
              // Current level progress values
              leftBusiness: parseFloat(data?.left_level_business || 0)?.toFixed(2),
              rightBusiness: parseFloat(data?.right_level_business || 0)?.toFixed(2),
              leftWidth: lWidth,
              rightWidth: rWidth,
              target: data?.binary_next_level_business,
              binary_career_level: data?.binary_career_level || 0,
              sponsor_email: data?.sponsor_email,
              sponsor_name: data?.sponsor_name,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoaded(true);
      }
    })();
  }, [render]);

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    setIsWithdrawalModalOpen(false);
  };

  if (!isDataLoaded) {
    return <Loader />;
  }

  // Format user data for UI
  const userData = {
    userId: user?.user?.userId,
    name: user?.user?.name,
    balance: 
      `$${parseFloat(allData?.totalInvestment || 0)}`
    ,
    sponsorEmail: allData?.sponsor_email || "No sponsor",
    sponsorName: allData?.sponsor_name || "No sponsor",
    currency: "US Dollar",
    status: "Active",
    referralLinks: {
      left: `https://crownbankers.com/signup?sponsorId=${user?.user?.userId}&position=left`,
      right: `https://crownbankers.com/signup?sponsorId=${user?.user?.userId}&position=right`,
    },
    wallets: {
      deposit: `$${parseFloat(allData?.deposit_wallet || 0).toFixed(2)}`,
      roi: `$${parseFloat(allData?.roi_wallet || 0).toFixed(2)}`,
      rb: `$${parseFloat(allData?.referral_binary_wallet || 0).toFixed(2)}`,
      extraIncome: `$${parseFloat(allData?.interest_wallet || 0).toFixed(2)}`,
      coupons: `$${parseFloat(allData?.toal_voucher_generated || 0).toFixed(2)}`,
    },
    totals: {
      investment: `$${parseFloat(allData?.totalInvestment || 0).toFixed(2)}`,
      withdrawal: `$${parseFloat(allData?.totalWithdrawal || 0).toFixed(2)}`,
    },
    career: {
      currentLevel: allData?.binary_career_level || 0,
      nextLevel: allData?.binary_career_level + 1 || 1,
      // Total business across all levels
      totalLeftBusiness: `$${parseFloat(allData?.totalLeftBusiness || 0).toFixed(2)}`,
      totalRightBusiness: `$${parseFloat(allData?.totalRightBusiness || 0).toFixed(2)}`,
      // Current level progress
      leftBusiness: { 
        current: `$${parseFloat(allData?.leftBusiness || 0).toFixed(2)}`, 
        target: `$${parseFloat(allData?.target || 0).toFixed(2)}` 
      },
      rightBusiness: { 
        current: `$${parseFloat(allData?.rightBusiness || 0).toFixed(2)}`, 
        target: `$${parseFloat(allData?.target || 0).toFixed(2)}` 
      },
    },
  };

  return (
    <div className="space-y-6 relative">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500 opacity-5"></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-green-500 opacity-5"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 rounded-full bg-yellow-500 opacity-5"></div>
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple-500 opacity-5"></div>
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gray-400 transform rotate-45"></div>
          <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gray-400 transform -rotate-45"></div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <div className="md:col-span-1">
          <CryptoPrice />
        </div>
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 text-4xl">
          {/* <StatCard
            title="Your Balance"
            value={userData.balance}
            // change="0%"
            // period="Current"
            
            icon={<BarChart className="text-green-500" />}
          /> */}
           
          <StatCard
            title="Total Investment"
            value={userData.totals.investment}
            // change="0%"
            // period="All time"
            icon={<Wallet className="text-green-500" />}
          />
          <StatCard
            title="Total Withdrawal"
            value={userData.totals.withdrawal}
            // change="0%"
            // period="All time"
            icon={<TrendingUp className="text-green-500" />}
          />
        </div>
      </div>
      
      {/* Wallets section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <h3 className=" font-semibold tracking-wide text-gray-800 dark:text-white mb-4 text-2xl">
            Wallet Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                ROI Wallet
              </p>
              <p className="text-2xl font-semibold">{userData.wallets.roi}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                R&B Wallet
              </p>
              <p className="text-2xl font-semibold">{userData.wallets.rb}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Extra Income Wallet
              </p>
              <p className="text-2xl font-semibold">
                {userData.wallets.extraIncome}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Voucher
              </p>
              <p className="text-2xl font-semibold">
                {userData.wallets.coupons}
              </p>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center items-center mt-4 gap-4">
              {/* <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md text-lg font-semibold"
                onClick={() => navigate("/dashboard/deposit")}
              >
                Deposit
              </button> */}
              
              {!disbledUserIds?.includes(user?.user?.userId) && (
               <button
                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-semibold"
                 onClick={() => navigate("/dashboard/investments/all-plans")}
               >
                 Invest
               </button>
              )}
              
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md text-lg font-semibold"
                onClick={() => setIsWithdrawalModalOpen(true)}
              >
                Withdraw
              </button>

              {allowedTransferId === user?.user?.userId && (
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-md text-lg font-semibold"
                  onClick={() => setIsTransferModalOpen(true)}
                >
                  Transfer
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <h3 className="text-2xl font-semibold text-gray-800 tracking-wide dark:text-white mb-4 ml-6">
            Wallet Settings
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xl text-gray-600 dark:text-gray-400 ml-6 ">
                User ID: {userData.userId}
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-400 ml-6">
                Name: {userData.name}
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-400 ml-6">
                Status: {userData.status}
              </p>
            </div>
            <UpdateWalletAddressModal  />
          </div>
        </div>
      </div>

      {/* Referral Links and Career Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <Award className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white">
              Career Progress
            </h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Level
                </p>
                <p className="text-lg font-semibold">
                  {getLevelName(userData.career.currentLevel)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Next Level
                </p>
                <p className="text-lg font-semibold">
                  {getLevelName(userData.career.currentLevel + 1)}
                </p>
              </div>
            </div>
            
            {/* Total Business Summary */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Total Business</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Left Total
                  </p>
                  <p className="text-base font-semibold">
                    {userData.career.totalLeftBusiness}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Right Total
                  </p>
                  <p className="text-base font-semibold">
                    {userData.career.totalRightBusiness}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Current Level Progress */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Left Business (Current Level)
                </p>
                <p className="text-lg font-semibold">
                  {userData.career.leftBusiness.current} /{" "}
                  {userData.career.leftBusiness.target}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(allData?.leftWidth || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Right Business (Current Level)
                </p>
                <p className="text-lg font-semibold">
                  {userData.career.rightBusiness.current} /{" "}
                  {userData.career.rightBusiness.target}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(allData?.rightWidth || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Links Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <Link className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide dark:text-white">
              Referral Links
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Left Link
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 break-all border border-gray-200 dark:border-gray-700 rounded-xl p-4 ">
                  {userData.referralLinks.left}
                </p>
              </div>
              <button
                className="w-32 mr-14 bg-primary h-12 p-2 rounded-lg font-normal text-white hover:bg-colorBlue relative cursor-pointer rounded-xl  disabled:cursor-not-allowed"
                onClick={() =>
                  navigator.clipboard.writeText(userData.referralLinks.left)
                }
              >
                Copy
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Right Link
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 break-all border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  {userData.referralLinks.right}
                </p>
              </div>
              <button
                className="w-32 mr-14 bg-primary h-12 p-2 rounded-lg font-normal text-white hover:bg-colorBlue relative cursor-pointer rounded-xl  disabled:cursor-not-allowed"
                onClick={() =>
                  navigator.clipboard.writeText(userData.referralLinks.right)
                }
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isWithdrawalModalOpen && (
        <WithdrawalModal
          isWithdrawalModalOpen={isWithdrawalModalOpen}
          setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
          selectedWallet={selectedWallet}
          allData={allData}
          setRender={setRender}
        />
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <TransferModal
          isTransferModalOpen={isTransferModalOpen}
          setIsTransferModalOpen={setIsTransferModalOpen}
          setRender={setRender}
        />
      )}
    </div>
  );
}


const StatCard = ({ title, value, change, period, icon }) => {
  let backgroundImage = '';

  if (title === 'Your Balance') {
    backgroundImage = bgOfcard;
  } else if (title === 'Total Investment') {
    backgroundImage = bgOfcard2;
  } else if (title === 'Total Withdrawal') {
    backgroundImage = bgOfcard3;
  }

  return (
    <div
      className="rounded-lg shadow p-6 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="text-2xl font-medium text-gray-700 tracking-wide dark:text-gray-500">
          {title}
        </h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-6xl font-bold text-gray-800 dark:text-gray-500">
            {value}
          </div>
          <div className="flex items-center mt-1">
            <span className="text-green-500 text-sm font-medium">{change}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
              {period}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



// Helper function to get level name from level number
const getLevelName = (level) => {
  const levelNames = [
    "0",
    "Sunstone",
    "Solar Flare",
    "Radiant",
    "Luminous",
    "Photon",
    "Helios",
    "Aurora",
    "Eclipse",
    "Nova",
    "Solaris",
    "Celestial",
  ];

  return level >= 0 && level < levelNames.length
    ? levelNames[level]
    : `Level ${level}`;
};