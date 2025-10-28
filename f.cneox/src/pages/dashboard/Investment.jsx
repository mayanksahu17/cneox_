import { useEffect, useState } from "react";
import { FaChartLine, FaDollarSign, FaUserFriends } from "react-icons/fa";
import {
  AllPlans,
  DownlineActivation,
  PackageActivation,
} from "../../components";
import investmentService from "../../services/investmentService";
import { useAuth } from "../../hooks/useAuth";
import { packageData } from "../../components/dashboard/investments/data";
import Button from "../../components/dashboard/global/Button";
import { motion } from "framer-motion";

export default function Investment() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("allPlans");
  const [investmentStats, setInvestmentStats] = useState({
    totalInvestments: 124500.0,
    monthlyReturns: 2340.0,
    portfolioGrowth: 18.7,
  });

  const [allData, setAllData] = useState({
    allDownlineData: [],
    allPackageData: [],
    totalTokenAmount: 0,
    depositWalletAmount: 0,
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [downlineResponse, packageResponse] = await Promise.all([
          investmentService.getDownlineReport(user),
          investmentService.getPackageReport(user),
        ]);

        if (downlineResponse?.data?.success)
          handleDataChange("allDownlineData", downlineResponse?.data?.data);

        if (packageResponse?.data?.success)
          handleDataChange("allPackageData", packageResponse?.data?.data);

        if (packageResponse?.data?.data?.length > 0) {
          const totalInvested = packageResponse.data.data.reduce(
            (total, pkg) => total + parseFloat(pkg.invested_amount || 0),
            0
          );
          if (totalInvested > 0) {
            setInvestmentStats((prev) => ({
              ...prev,
              totalInvestments: totalInvested,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "allPlans":
        return (
          <AllPlans
            data={{
              totalTokenAmount: allData.totalTokenAmount,
              depositWalletAmount: allData.depositWalletAmount,
            }}
          />
        );
      case "packageActivation":
        return <PackageActivation data={allData.allPackageData} />;
      case "downlineActivation":
        return <DownlineActivation data={allData.allDownlineData} />;
      default:
        return (
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4"
          >
            {packageData.map((pkg, index) => (
              <motion.div
                key={index}
                className="bg-[#000000] border border-[#151515] rounded-lg shadow-lg overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <div
                  className="p-4 text-center"
                  style={{ background: "linear-gradient(180deg,#070707,#000000)" }}
                >
                  <div className="mx-auto mb-3 h-12 w-12 rounded-full flex items-center justify-center bg-black border border-[#2b2b2b]">
                    <img src={pkg.image} alt={pkg.name} className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                </div>

                <div className="p-6 text-yellow-400">
                  <div className="text-center text-2xl font-bold mb-4 text-white">
                    ${pkg.minAmount} - ${pkg.maxAmount}
                  </div>

                  <div className="space-y-3 text-white">
                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Daily Energy Yield</span>
                      <span className="font-semibold text-white">
                        {pkg.dailyReturns} - {parseFloat(pkg.dailyReturns) + 0.3}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Duration</span>
                      <span className="font-semibold text-white">{pkg.durationInDays} days</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Total Energy Output</span>
                      <span className="font-semibold text-white">
                        {Math.round(parseFloat(pkg.dailyReturns) * pkg.durationInDays * 1.5)}% -{" "}
                        {Math.round(parseFloat(pkg.dailyReturns) * pkg.durationInDays * 1.8)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Referral Boost</span>
                      <span className="font-semibold text-white">{7 + index}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Binary Power Surge</span>
                      <span className="font-semibold text-white">10%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Power Capacity</span>
                      <span className="font-semibold text-white">
                        ${index === 0 ? "1,000" : index === 1 ? "3,500" : "7,000"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-300">Renewable Principle</span>
                      <span className="font-semibold text-white">{50 + index * 10}%</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-yellow-500 text-black hover:bg-yellow-600"
                    onClick={() => {
                      setActiveTab("allPlans");
                      setTimeout(() => {
                        const allPlansComponent = document.querySelector(
                          '[data-component="AllPlans"]'
                        );
                        if (allPlansComponent) {
                          allPlansComponent
                            .querySelector(`[data-package-id="${pkg.id}"]`)
                            ?.click();
                        }
                      }, 100);
                    }}
                  >
                    Purchase
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full bg-black"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Investment</h1>
        <p className="text-yellow-300">Let's check your update today</p>
      </div>

      {/* Tabs */}
      <motion.div
        className="flex overflow-x-auto gap-3 mb-4"
        initial="hidden"
        animate="visible"
        variants={tabsContainer}
      >
        {[
          { id: "allPlans", label: "All Plans", icon: FaChartLine },
          { id: "packageActivation", label: "Package Activation", icon: FaDollarSign },
          { id: "downlineActivation", label: "Downline Activation", icon: FaUserFriends },
        ].map((tab, idx) => {
          const active = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variants={tabItem}
              whileHover={{ scale: 1.03 }}
              className={`flex items-center gap-2 py-3 px-4 rounded-md transition-colors duration-200 ring-offset-2 ${
                active
                  ? "bg-black border border-yellow-500 text-yellow-500 shadow-md"
                  : "bg-transparent border border-transparent text-yellow-300 hover:text-yellow-500"
              }`}
            >
              <tab.icon className={active ? "text-yellow-500" : "text-yellow-300"} />
              <span className={`${active ? "text-yellow-500 font-medium" : "text-yellow-300"}`}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Content */}
      <div className="bg-black border border-[#111111] rounded-b-lg p-4" data-component="AllPlans">
        {renderTabContent()}
      </div>
    </motion.div>
  );
}

/* ----------------- Framer Motion Variants ----------------- */

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const tabsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const tabItem = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
