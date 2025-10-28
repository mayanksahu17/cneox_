import clsx from "clsx";
import moment from "moment";
import { FaRegClock } from "react-icons/fa6";

export default function VoucherCard({ amount, createdAt, wallet, voucher }) {
  return (
    <div
      className={clsx(
        "p-3 rounded-lg",
        "bg-white text-gray-900", // Light mode
        "dark:bg-black dark:text-white" // Dark mode
      )}
    >
      {/* Top Row */}
      <div className="flex w-full items-center justify-between">
        <p className="font-medium">{voucher}</p>
        <h3 className="font-semibold text-2xl">${amount}</h3>
      </div>

      {/* Divider */}
      <div className="mt-6 h-1 w-full rounded-lg bg-gray-300 dark:bg-white" />

      {/* Bottom Row */}
      <div className="mt-2 flex items-center justify-between w-full text-sm">
        <p className="uppercase">{wallet}</p>
        <div className="flex items-center space-x-2">
          <FaRegClock size="16" className="text-gray-500 dark:text-white" />
          <p>{moment(createdAt).format("D MMM YYYY")}</p>
        </div>
      </div>
    </div>
  );
}
