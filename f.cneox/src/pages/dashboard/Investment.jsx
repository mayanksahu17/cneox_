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
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {packageData.map((pkg, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-green-500 p-4 text-white text-center">
                  <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2">
                    <img src={pkg.image} alt={pkg.name} className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                </div>

                <div className="p-6 text-gray-700 dark:text-gray-200">
                  <div className="text-center text-2xl font-bold mb-4">
                    ${pkg.minAmount} - ${pkg.maxAmount}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Daily Energy Yield</span>
                      <span className="font-semibold">
                        {pkg.dailyReturns} - {parseFloat(pkg.dailyReturns) + 0.3}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-semibold">{pkg.durationInDays} days</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Energy Output</span>
                      <span className="font-semibold">
                        {Math.round(parseFloat(pkg.dailyReturns) * pkg.durationInDays * 1.5)}% -{" "}
                        {Math.round(parseFloat(pkg.dailyReturns) * pkg.durationInDays * 1.8)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Referral Boost</span>
                      <span className="font-semibold">{7 + index}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Binary Power Surge</span>
                      <span className="font-semibold">10%</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Power Capacity</span>
                      <span className="font-semibold">
                        ${index === 0 ? "1,000" : index === 1 ? "3,500" : "7,000"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Renewable Principle</span>
                      <span className="font-semibold">{50 + index * 10}%</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-green-500 hover:bg-green-600"
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
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black dark:text-white">Investment</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let's check your update today
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto">
  {[
    { id: "allPlans", label: "All Plans", icon: FaChartLine },
    { id: "packageActivation", label: "Package Activation", icon: FaDollarSign },
    { id: "downlineActivation", label: "Downline Activation", icon: FaUserFriends },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`py-3 px-4 flex items-center border-b-2 transition-colors duration-200 ${
        activeTab === tab.id
          ? 'border-green-500 text-gray-900 dark:text-white'
          : 'border-transparent text-gray-500 dark:text-gray-400'
      }`}
    >
      <tab.icon className="mr-2" />
      {tab.label}
    </button>
  ))}
</div>


      {/* Content */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-b-lg p-4" data-component="AllPlans">
        {renderTabContent()}
      </div>
    </div>
  );
}
