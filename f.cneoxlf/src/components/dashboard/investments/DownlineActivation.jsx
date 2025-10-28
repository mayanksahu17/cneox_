import { useState } from "react";
import moment from "moment";
import { FaUsers, FaBox, FaClock, FaDollarSign, FaSearch } from "react-icons/fa";
import { packageData } from "./data";

export default function DownlineActivation({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("investmentDate");
  const [sortDirection, setSortDirection] = useState("desc");

  const formattedData = data.map((el, index) => {
    // Get the package details from packageData
    const packageDetails = packageData.find(pkg => 
      pkg.name.toLowerCase() === el?.package_name?.toLowerCase()
    );
    
    // Calculate returns range based on package
    let returnsRange = "";
    if (packageDetails) {
      const dailyReturn = parseFloat(packageDetails.dailyReturns);
      const days = packageDetails.durationInDays;
      const minReturn = Math.round(dailyReturn * days * 1.5);
      const maxReturn = Math.round(dailyReturn * days * 1.8);
      returnsRange = `${minReturn}% to ${maxReturn}%`;
    } else {
      // Fallback values if package not found
      if (el?.package_name?.toLowerCase().includes("solar")) {
        returnsRange = "225% to 270%";
      } else if (el?.package_name?.toLowerCase().includes("power")) {
        returnsRange = "252% to 294%";
      } else if (el?.package_name?.toLowerCase().includes("elite")) {
        returnsRange = "273% to 312%";
      } else {
        returnsRange = "0%";
      }
    }
    
    return {
      ...el,
      id: index + 1,
      user: el?.user_id,
      package: el?.package_name,
      days: el?.duration,
      invested: parseFloat(el?.deposit_amount || 0).toFixed(2),
      investmentDate: el?.investment_date,
      expiry: el?.expires_on,
      token: parseFloat(el?.token_amount || 0)?.toFixed(2),
      returnsRange: returnsRange,
      progress: Math.min(
        100,
        Math.round((moment().diff(moment(el?.investment_date), "days") / el?.duration) * 100)
      ),
    };
  });

  const filteredData = formattedData.filter((item) =>
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.package.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === "invested" || sortField === "token") {
      return sortDirection === "asc"
        ? parseFloat(a[sortField]) - parseFloat(b[sortField])
        : parseFloat(b[sortField]) - parseFloat(a[sortField]);
    }
    return sortDirection === "asc"
      ? String(a[sortField])?.localeCompare(String(b[sortField]))
      : String(b[sortField])?.localeCompare(String(a[sortField]));
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-[#1E293B] rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Downlines</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{formattedData.length}</h3>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <FaUsers className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Investment</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${formattedData.reduce((sum, item) => sum + parseFloat(item.invested), 0).toFixed(2)}
              </h3>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <FaDollarSign className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Active Packages</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{formattedData.length}</h3>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <FaBox className="text-green-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-[#1E293B] rounded-lg p-4 mb-6 shadow">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user ID or package..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Downline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((item) => (
          <div key={item.id} className="bg-white dark:bg-[#1E293B] rounded-lg overflow-hidden shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.user}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.package}</p>
                </div>
                <div className="bg-green-500/20 px-3 py-1 rounded-full">
                  <span className="text-green-500 text-sm">${item.invested}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-white">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Duration</p>
                    <p className="text-gray-900 dark:text-white">{item.days} Days</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Returns</p>
                    <p className="text-green-500">{item.returnsRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Start Date</p>
                    <p className="text-gray-900 dark:text-white">
                      {moment(item.investmentDate).format("MMM DD, YYYY")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">End Date</p>
                    <p className="text-gray-900 dark:text-white">
                      {moment(item.expiry).format("MMM DD, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Data Messages */}
      {formattedData.length === 0 && (
        <div className="bg-white dark:bg-[#1E293B] rounded-lg p-8 text-center shadow mt-8">
          <FaUsers className="text-gray-400 dark:text-gray-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Downline Activations</h3>
          <p className="text-gray-500 dark:text-gray-400">
            There are no downline investment packages at the moment.
          </p>
        </div>
      )}

      {formattedData.length > 0 && filteredData.length === 0 && (
        <div className="bg-white dark:bg-[#1E293B] rounded-lg p-8 text-center shadow mt-8">
          <FaSearch className="text-gray-400 dark:text-gray-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Results Found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            No downline packages match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
