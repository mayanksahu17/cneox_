import clsx from "clsx";
import moment from "moment/moment";

export const genealogyColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "User",
    accessor: "user",
    Cell: ({ value }) => (
      <div className="flex flex-col w-full">
        <p>{value?.userId}</p>
        <p>{value?.name}</p>
        <p>{value?.email}</p>
      </div>
    ),
  },
  {
    Header: "Country / Phone",
    accessor: "countryAndPhone",
    Cell: ({ value }) => (
      <div className="flex flex-col ">
        <p>{value?.country}</p>
        <p>{value?.phone}</p>
      </div>
    ),
  },
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Registered On",
    accessor: "registeredOn",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={clsx(
          "px-3 py-2 uppercase rounded-md text-sm text-black lg:text-base ",
          value === 1 ? "bg-teal-200" : "bg-red-200"
        )}
      >
        {value === 1 ? "Verified" : "Unverified"}
      </span>
    ),
  },
  {
    Header: "Investment",
    accessor: "investment",
    Cell: ({ value }) => <span>${value}</span>,
  },
];

export const reportsROIColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Package",
    accessor: "package",
  },
  {
    Header: "Invested Amount",
    accessor: "investedAmount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Expiry Date",
    accessor: "expiryDate",
  },
  {
    Header: "ROI",
    accessor: "roi",
    Cell: ({ value }) => <span>${value}</span>,
  },
];

export const reportsBIColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Percentage",
    accessor: "percentage",
    Cell: ({ value }) => <span>{value}%</span>,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={clsx(
          "text-sm px-3 py-1.5 rounded-md text-white",
          value?.toLowerCase() === "completed"
            ? "bg-green-300 "
            : value?.toLowerCase() == "pending"
            ? "bg-blue-300"
            : "bg-red-300"
        )}
      >
        {value}
      </span>
    ),
  },
];

export const reportsRIColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Referral User",
    accessor: "referralUser",
  },
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Package",
    accessor: "package",
  },
  {
    Header: "Referral Amount",
    accessor: "referralAmount",
    Cell: ({ value }) => <span>${value}</span>,
  },
];

export const reportDepositColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Transaction ID",
    accessor: "transactionId",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Crypto Type",
    accessor: "cryptoType",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

export const reportsExtraIncomeColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Achievement",
    accessor: "achievement",
  },
  {
    Header: "Reward Amount($)",
    accessor: "rewardAmount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Date",
    accessor: "date",
  },
];

export const reportsTokenColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Transaction ID",
    accessor: "transactionId",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Token Type",
    accessor: "tokenType",
  },
];

export const reportWithdrawalColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Charges",
    accessor: "charges",
    Cell: ({ value }) => <span>{value}%</span>,
  },
  {
    Header: "Withdrawal Method",
    accessor: "withdrawalMethod",
  },
  {
    Header: "Merchant",
    accessor: "merchant",
  },
  {
    Header: "Crypto Type",
    accessor: "cryptoType",
  },
  {
    Header: "Wallet Type",
    accessor: "walletType",
  },
  {
    Header: "Final Amount",
    accessor: "finalAmount",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={clsx(
          "text-sm px-3 py-1.5 rounded-md text-white",
          value?.toLowerCase() === "approved"
            ? "bg-green-300 "
            : value?.toLowerCase() == "pending"
            ? "bg-blue-300"
            : "bg-red-300"
        )}
      >
        {value}
      </span>
    ),
  },
];

export const ticketColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Service",
    accessor: "service",
  },
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={clsx(
          "text-xs py-2 px-4 rounded-md",
          value === "Open" ? "bg-teal-200" : "bg-red-200"
        )}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Last Updated Date",
    accessor: "updated_date",
    Cell: ({ value }) => <span> {moment(value).format("D MMM YYYY ")}</span>,
  },
  {
    Header: "Document",
    accessor: "document",
    Cell: ({ value }) => <span>{value ? value : "-"}</span>,
  },
];

export const packageActivationColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "Package",
    accessor: "package",
  },
  {
    Header: "Days",
    accessor: "days",
  },
  {
    Header: "Invested",
    accessor: "invested",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Investment Date",
    accessor: "investmentDate",
  },
  {
    Header: "Expiry",
    accessor: "expiry",
  },

  {
    Header: "Token",
    accessor: "token",
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    Header: "Type",
    accessor: "type",
  },
];

export const downlineActivationColumns = [
  {
    Header: "SI No",
    accessor: "id",
  },
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Package",
    accessor: "package",
  },
  {
    Header: "Days",
    accessor: "days",
  },
  {
    Header: "Invested",
    accessor: "invested",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Investment Date",
    accessor: "investmentDate",
  },
  {
    Header: "Expiry",
    accessor: "expiry",
  },
  {
    Header: "Token",
    accessor: "token",
    Cell: ({ value }) => <span>${value}</span>,
  },
  {
    Header: "Type",
    accessor: "type",
  },
];
