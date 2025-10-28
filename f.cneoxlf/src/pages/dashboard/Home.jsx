// src/pages/dashboard/Home.jsx
import {
  BarChart,
  LineChart,
  PieChart,
  Wallet,
  DollarSign,
  TrendingUp,
  Link as LucideLink,
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
import TradeButton from "../../components/TradeButton";

import { motion } from "framer-motion";

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

  // fetch fresh user details once
  useEffect(() => {
    (async () => {
      try {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // dashboard data
  useEffect(() => {
    (async () => {
      try {
        setIsDataLoaded(false);
        const response = await dashboardService.getDashboardData(user);
        const { success, data } = response?.data || {};
        if (success && data) {
          const lWidth =
            (parseFloat(data?.left_level_business || 0) /
              parseFloat(data?.binary_next_level_business || 1)) *
            100;
          const rWidth =
            (parseFloat(data?.right_level_business || 0) /
              parseFloat(data?.binary_next_level_business || 1)) *
            100;

          setAllData((prev) => ({
            ...prev,
            totalInvestment: data?.total_investment,
            totalReturns:
              parseFloat(data?.total_earning || 0) -
              parseFloat(data?.total_deposit || 0),
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
            totalLeftBusiness: parseFloat(data?.left_business || 0)?.toFixed(2),
            totalRightBusiness: parseFloat(data?.right_business || 0)?.toFixed(2),
            leftBusiness: parseFloat(data?.left_level_business || 0)?.toFixed(2),
            rightBusiness: parseFloat(data?.right_level_business || 0)?.toFixed(2),
            leftWidth: lWidth,
            rightWidth: rWidth,
            target: data?.binary_next_level_business,
            binary_career_level: data?.binary_career_level || 0,
            sponsor_email: data?.sponsor_email,
            sponsor_name: data?.sponsor_name,
            latestTransactions: data?.latest_transactions || [],
          }));
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

  // Prepare userData object for UI usage
  const userData = {
    userId: user?.user?.userId,
    name: user?.user?.name,
    balance: `$${parseFloat(allData?.totalInvestment || 0).toFixed(2)}`,
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
      totalLeftBusiness: `$${parseFloat(allData?.totalLeftBusiness || 0).toFixed(2)}`,
      totalRightBusiness: `$${parseFloat(allData?.totalRightBusiness || 0).toFixed(2)}`,
      leftBusiness: {
        current: `$${parseFloat(allData?.leftBusiness || 0).toFixed(2)}`,
        target: `$${parseFloat(allData?.target || 0).toFixed(2)}`,
      },
      rightBusiness: {
        current: `$${parseFloat(allData?.rightBusiness || 0).toFixed(2)}`,
        target: `$${parseFloat(allData?.target || 0).toFixed(2)}`,
      },
    },
  };

  /* ------------------ Framer motion variants ------------------ */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const hoverCard = { scale: 1.02 };

  return (
    <div className="relative min-h-screen px-6 py-8">
      {/* faint decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-10 top-24 w-64 h-64 rounded-full bg-yellow-400 opacity-6 blur-3xl" />
        <div className="absolute right-20 top-40 w-96 h-96 rounded-full bg-yellow-400 opacity-6 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Top row: Crypto price widget + stat cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div variants={itemVariants} whileHover={hoverCard}>
              <StatCard
                title="Total Investment"
                value={userData.totals.investment}
                icon={<Wallet className="text-yellow-400" />}
                // bg={bgOfcard}
              />
            </motion.div>

            <motion.div variants={itemVariants} whileHover={hoverCard}>
              <StatCard
                title="Total Withdrawal"
                value={userData.totals.withdrawal}
                icon={<TrendingUp className="text-yellow-400" />}
                // bg={bgOfcard2}
              />
            </motion.div>

            <motion.div variants={itemVariants} whileHover={hoverCard}>
              <StatCard
                title="Your Balance"
                value={userData.balance}
                icon={<DollarSign className="text-yellow-400" />}
                // bg={bgOfcard3}
              />
            </motion.div>

            <motion.div variants={itemVariants} whileHover={hoverCard}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <CryptoPrice />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wallet Overview + Wallet Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} whileHover={hoverCard}>
            <div
              className="rounded-lg shadow-lg p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-[rgba(0,0,0,0.06)] h-full"
              style={{ minHeight: 220 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">Account information</h3>
              </div>

              <div className="space-y-3 mt-2 text-white">
                <div>
                  <p className="text-xs text-yellow-400">User ID</p>
                  <p className="font-medium">{userData.userId}</p>
                </div>

                <div>
                  <p className="text-xs text-yellow-400">Name</p>
                  <p className="font-medium">{userData.name}</p>
                </div>

                <div>
                  <p className="text-xs text-yellow-400">Status</p>
                  <p className="font-medium">{userData.status}</p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      navigate("/dashboard/settings/profile");
                    }}
                    className="text-black bg-yellow-500 rounded px-3 py-1"
                  >
                    Update Information
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-2" variants={itemVariants} whileHover={hoverCard}>
            <div
              className="rounded-lg shadow-lg p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-[rgba(0,0,0,0.06)] h-full"
              style={{ minHeight: 220 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-white leading-tight">Wallet Overview</h3>
                  <p className="text-xs text-yellow-400 mt-1">Quick access to your wallets and actions</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/dashboard/investments/all-plans")}
                    className="px-3 py-1.5 rounded-md bg-[black] hover:bg-[rgba(0,0,0,0.8)] text-white text-sm font-semibold shadow"
                  >
                    Invest
                  </button>

                  <button
                    onClick={() => setIsWithdrawalModalOpen(true)}
                    className="px-3 py-1.5 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold shadow"
                  >
                    Withdraw
                  </button>

                  {allowedTransferId === user?.user?.userId && (
                    <button
                      onClick={() => setIsTransferModalOpen(true)}
                      className="px-3 py-1.5 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold shadow"
                    >
                      Transfer
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <WalletCard title="ROI Wallet" value={userData.wallets.roi} />
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <WalletCard title="R&B Wallet" value={userData.wallets.rb} />
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <WalletCard title="Extra Income Wallet" value={userData.wallets.extraIncome} />
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                  <WalletCard title="Voucher" value={userData.wallets.coupons} />
                </motion.div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => navigate("/dashboard/deposit")}
                  className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black text-sm"
                >
                  Deposit
                </button>
                <button
                  onClick={() => navigate("/dashboard/transactions")}
                  className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black text-sm"
                >
                  Transactions
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Career Progress + Referral Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} whileHover={hoverCard}>
            <div
              className="rounded-lg shadow-lg p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-[rgba(0,0,0,0.06)]"
              style={{ minHeight: 220 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Award className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white leading-tight">Career Progress</h3>
                  <p className="text-xs text-yellow-400 mt-0.5">Track your current career level & targets</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-white">
                <div>
                  <p className="text-xs text-yellow-400">Current Level</p>
                  <p className="text-base font-semibold mt-1">{getLevelName(userData.career.currentLevel)}</p>
                </div>
                <div>
                  <p className="text-xs text-yellow-400">Next Level</p>
                  <p className="text-base font-semibold mt-1">{getLevelName(userData.career.currentLevel + 1)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded bg-[rgba(255,255,255,0.02)]">
                  <p className="text-xs text-yellow-400">Total Business</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-[11px] text-yellow-400">Left Total</p>
                      <p className="text-sm text-white font-semibold mt-1">{userData.career.totalLeftBusiness}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-yellow-400">Right Total</p>
                      <p className="text-sm text-white font-semibold mt-1">{userData.career.totalRightBusiness}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm text-yellow-400">Left Business (Level)</p>
                      <p className="text-xs text-yellow-300">
                        {Math.min(allData?.leftWidth || 0, 100).toFixed(0)}%
                      </p>
                    </div>
                    <p className="text-sm text-white font-semibold">
                      {userData.career.leftBusiness.current} / {userData.career.leftBusiness.target}
                    </p>

                    <div className="w-full bg-black rounded-full h-2 mt-3 border border-yellow-500">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-800"
                        style={{ width: `${Math.min(allData?.leftWidth || 0, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm text-yellow-400">Right Business (Level)</p>
                      <p className="text-xs text-yellow-300">
                        {Math.min(allData?.rightWidth || 0, 100).toFixed(0)}%
                      </p>
                    </div>
                    <p className="text-sm text-white font-semibold">
                      {userData.career.rightBusiness.current} / {userData.career.rightBusiness.target}
                    </p>

                    <div className="w-full bg-black rounded-full h-2 mt-3 border border-yellow-500">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-800"
                        style={{ width: `${Math.min(allData?.rightWidth || 0, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={hoverCard}>
            <div
              className="rounded-lg shadow-lg p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-[rgba(0,0,0,0.06)]"
              style={{ minHeight: 220 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <LucideLink className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white leading-tight">Referral Links</h3>
                  <p className="text-xs text-yellow-400 mt-0.5">Share your links to grow your network</p>
                </div>
              </div>

              <div className="space-y-3 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-yellow-400 mb-1">Left Link</p>
                    <div className="break-all bg-[rgba(255,255,255,0.02)] p-3 rounded text-white text-sm border border-[rgba(255,255,255,0.03)]">
                      {userData.referralLinks.left}
                    </div>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(userData.referralLinks.left)}
                    className="min-w-[80px] px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-medium rounded-md transition-colors shadow"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-yellow-400 mb-1">Right Link</p>
                    <div className="break-all bg-[rgba(255,255,255,0.02)] p-3 rounded text-white text-sm border border-[rgba(255,255,255,0.03)]">
                      {userData.referralLinks.right}
                    </div>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(userData.referralLinks.right)}
                    className="min-w-[80px] px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-medium rounded-md transition-colors shadow"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <UpdateWalletAddressModal />
      </motion.div>

      {/* Modals */}
      {isWithdrawalModalOpen && (
        <WithdrawalModal
          isWithdrawalModalOpen={isWithdrawalModalOpen}
          setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
          selectedWallet={selectedWallet}
          allData={allData}
          setRender={setRender}
        />
      )}

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

/* ---------- StatCard & WalletCard components (motion-ready) ---------- */

const StatCard = ({ title, value, change, period, icon, bg }) => {
  return (
    <motion.div
      className="rounded-lg shadow-lg overflow-hidden relative bg-black"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.02 }}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h4 className="text-lg font-medium text-yellow-400">{title}</h4>
              {period && <div className="text-sm text-yellow-300">{period}</div>}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
            {change && (
              <div className="mt-2 text-sm text-yellow-400 font-medium">{change}</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WalletCard = ({ title, value }) => {
  return (
    <motion.div
      className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-sm text-yellow-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </motion.div>
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
