import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import vouchersService from "../../../services/vouchersService";
import toast from "react-hot-toast";
import { RiTicketLine } from "react-icons/ri";
import { FaClock, FaBox } from "react-icons/fa";
import moment from "moment";

export default function AllVouchers({ vouchers = [], fetchVouchers }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    if (!vouchers || vouchers.length === 0) {
      fetchVouchers();
    }
  }, []);

  const getVoucherStatus = (voucher) => {
    if (voucher.is_used) return "Used";
    if (voucher.expires_on && new Date(voucher.expires_on) < new Date()) return "Expired";
    return "Active";
  };

  const getVoucherUsageInfo = (voucher) => {
    if (voucher.usage_limit) {
      return `${voucher.usage_count || 0}/${voucher.usage_limit} uses`;
    }
    return "Single use";
  };

  const activeVouchers = vouchers.filter(v => getVoucherStatus(v) !== "Used");
  const usedVouchers = vouchers.filter(v => getVoucherStatus(v) === "Used");

  return (
    <div>
      {/* Tabs for Active and Used Vouchers */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("active")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "active" 
                  ? "text-green-600 border-b-2 border-green-600 dark:text-green-500 dark:border-green-500" 
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Active Vouchers
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("used")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "used" 
                  ? "text-green-600 border-b-2 border-green-600 dark:text-green-500 dark:border-green-500" 
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Used Vouchers
            </button>
          </li>
        </ul>
      </div>

      {/* Active Vouchers */}
      {activeTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeVouchers.length > 0 ? (
            activeVouchers.map((voucher, index) => (
              <div key={index} className="bg-white dark:bg-[#2D3748] rounded-lg overflow-hidden shadow">
                <div className="p-4 flex justify-between items-center bg-green-500">
                  <div className="flex items-center">
                    <RiTicketLine className="text-white text-2xl mr-2" />
                    <span className="text-white font-bold">{voucher.voucher_id}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    getVoucherStatus(voucher) === "Active" ? "bg-white text-green-500" :
                    getVoucherStatus(voucher) === "Expired" ? "bg-yellow-100 text-yellow-600" :
                    "bg-gray-200 text-gray-600"
                  }`}>
                    {getVoucherStatus(voucher)}
                  </span>
                </div>

                <div className="p-4 text-gray-900 dark:text-white">
                  <div className="mb-3">
                    <div className="text-gray-500 dark:text-gray-400">Value</div>
                    <div className="text-xl font-bold">${voucher.amount}</div>
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-500 dark:text-gray-400">Created on</div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-gray-400" />
                      {moment(voucher.created_on || voucher.issued_on || voucher.created_at).format("MMM DD, YYYY")}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-500 dark:text-gray-400">Created From</div>
                    <div className="font-medium">
                      {voucher.from_wallet === "R&B" || voucher.from_wallet === "r&b"
                        ? "R&B Wallet"
                        : voucher.from_wallet === "ROI" || voucher.from_wallet === "roi"
                        ? "ROI Wallet"
                        : voucher.from_wallet === "Interest" || voucher.from_wallet === "interest"
                        ? "Extra Income Wallet"
                        : "Unknown"}
                    </div>
                  </div>
                   <div className="mb-3">
                    <div className="text-gray-500 dark:text-gray-400">Created By</div>
                    <div className="font-medium">
                      {voucher.created_by}
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <div className="text-gray-500 dark:text-gray-400">Usage</div>
                    <div>{getVoucherUsageInfo(voucher)}</div>
                  </div> */}

                  <button 
                    className="w-full py-2 text-center rounded-md transition bg-gray-100 dark:bg-[#374151] hover:bg-gray-200 dark:hover:bg-[#4B5563] text-gray-900 dark:text-white"
                  >
                    Use Voucher
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 dark:text-gray-400 py-10">
              No active vouchers found
            </div>
          )}
        </div>
      )}

      {/* Used Vouchers */}
      {activeTab === "used" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Voucher ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Used On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Package
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {usedVouchers.length > 0 ? (
                usedVouchers.map((voucher, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <RiTicketLine className="text-green-500 mr-2" />
                        <span className="text-gray-900 dark:text-white">{voucher.voucher_id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-white font-medium">${voucher.amount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-white">{moment(voucher.created_on || voucher.issued_on || voucher.created_at).format("MMM DD, YYYY")}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-white">{moment(voucher.used_at).format("MMM DD, YYYY")}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaBox className="text-green-500 mr-2" />
                        <span className="text-gray-900 dark:text-white">{voucher.package_name || "Unknown Package"}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No used vouchers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
