import { useEffect, useState } from "react";
import {
  BIReport,
  ROIReport,
  RIReport,
  ExtraIncomeReport,
  WithdrawalReport,
} from "../../components";
import reportService from "../../services/reportService";
import { useAuth } from "../../hooks/useAuth";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaArrowUp,
} from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

export default function Reports() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("roi");

  const [allData, setAllData] = useState({
    allROIData: [],
    allBIData: [],
    allRIData: [],
    allExtraIncomeData: [],
    allWithdrawalData: [],
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [
          roiResponse,
          biResponse,
          riResponse,
          extraIncomeResponse,
          withdrawalResponse,
        ] = await Promise.all([
          reportService.getROIReport(user),
          reportService.getBIReport(user),
          reportService.getRIReport(user),
          reportService.getExtraIncomeReport(user),
          reportService.getWithdrawalReport(user),
        ]);

        if (roiResponse?.data?.success)
          handleDataChange("allROIData", roiResponse.data.data);
        if (biResponse?.data?.success)
          handleDataChange("allBIData", biResponse.data.data);
        if (riResponse?.data?.success)
          handleDataChange("allRIData", riResponse.data.data);
        if (extraIncomeResponse?.data?.success)
          handleDataChange("allExtraIncomeData", extraIncomeResponse.data.data);
        if (withdrawalResponse?.data?.success)
          handleDataChange("allWithdrawalData", withdrawalResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  // ========== FRAMER MOTION VARIANTS ==========
  const pageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { scale: 1.1, color: "#facc15", transition: { type: "spring", stiffness: 300 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const tabItems = [
    { key: "roi", label: "ROI Report", icon: <FaChartLine /> },
    { key: "bi", label: "BI Report", icon: <FaMoneyBillWave /> },
    { key: "ri", label: "RI Report", icon: <CgArrowsExchange /> },
    { key: "extra", label: "Extra Income", icon: <FaHandHoldingUsd /> },
    { key: "withdrawal", label: "Withdrawal", icon: <FaArrowUp /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "roi":
        return <ROIReport data={allData.allROIData} />;
      case "bi":
        return <BIReport data={allData.allBIData} />;
      case "ri":
        return <RIReport data={allData.allRIData} />;
      case "extra":
        return <ExtraIncomeReport data={allData.allExtraIncomeData} />;
      case "withdrawal":
        return (
          <WithdrawalReport data={allData.allWithdrawalData}>
            <motion.tbody
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              initial="hidden"
              animate="visible"
            >
              {allData.allWithdrawalData.map((item, index) => (
                <motion.tr
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-center"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.date}</td>
                  <td className="py-2 px-4 text-yellow-400">
                    ${parseFloat(item.amount).toFixed(2)}
                  </td>
                  <td className="py-2 px-4">
                    {(item.wallet_source === "R&B" ||
                      item.wallet_source === "Interest")
                      ? "0%"
                      : `${item.charges}%`}
                  </td>
                  <td className="py-2 px-4">{item.withdrawal_method}</td>
                  <td className="py-2 px-4">
                    {item.wallet_source === "R&B"
                      ? "R&B Wallet"
                      : item.wallet_source === "ROI"
                      ? "ROI Wallet"
                      : "Unknown Wallet"}
                  </td>
                  <td className="py-2 px-4">{item.crypto_type}</td>
                  <td className="py-2 px-4 text-yellow-400">
                    ${parseFloat(item.final_amount).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 font-semibold">
                    <span
                      className={`${
                        item.status === "APPROVED"
                          ? "text-yellow-400"
                          : item.status === "PENDING"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </WithdrawalReport>
        );
      default:
        return <ROIReport data={allData.allROIData} />;
    }
  };

  return (
    <motion.div
      className="w-full bg-black text-yellow-500 min-h-screen rounded-lg p-4"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div className="mb-6" variants={headerVariants}>
        <h1 className="text-2xl font-bold text-yellow-500">Reports</h1>
        <motion.p
          className="text-white opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Let’s check your update today
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="bg-black border-b border-yellow-500 rounded-t-lg overflow-x-auto shadow-inner"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-wrap">
          {tabItems.map((tab) => (
            <motion.button
              key={tab.key}
              variants={tabVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-4 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "border-b-2 border-yellow-500 text-yellow-500 font-semibold"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <motion.span
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-white"
              >
                {tab.icon}
              </motion.span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Tab Header */}
      <motion.div
        className="bg-black px-4 py-4 border-t border-yellow-500"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold text-white">
          {{
            roi: "Return on Investment Report",
            bi: "Binary Income Report",
            ri: "Referral Income Report",
            extra: "Extra Income Report",
            withdrawal: "Withdrawal Report",
          }[activeTab]}
        </h2>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        className="bg-black rounded-b-lg overflow-hidden p-4"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
