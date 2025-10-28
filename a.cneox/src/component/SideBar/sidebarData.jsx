import { FiGrid, FiUser } from "react-icons/fi";

export const sideBarSuperData = [
  {
    id: 0,
    field: "Dashboard",
    path: "dashboard",
    icon: <FiGrid />,
    haveSubField: false,
  },
  {
    id: 1,
    field: "Users",
    path: "users",
    icon: <FiUser />,
    haveSubField: true,
    subField: [
      { subFieldName: "User List", path: "user-list" },
      { subFieldName: "User Activation", path: "user-activation" },
      { subFieldName: "User Verification", path: "user-verification" },
      { subFieldName: "KYC Reports", path: "kyc-reports" },
    ],
  },
  {
    id: 2,
    field: "Genealogy",
    path: "genealogy",
    icon: <FiGrid />,
    haveSubField: false,
  },
  {
    id: 3,
    field: "Withdrawal",
    path: "withdrawal",
    showNotificationCount: true,
    countField: "withdrawal",
    icon: <FiUser />,
    haveSubField: true,
    subField: [
      {
        subFieldName: "ROI Withdrawal",
        path: "roi-withdrawal",
        showNotificationCount: true,
        countField: "roi_withdrawal",
      },
      {
        subFieldName: "R&B Withdrawal",
        path: "r&b-withdrawal",
        showNotificationCount: true,
        countField: "rb_withdrawal",
      },
      { subFieldName: "Interest Withdrawal", path: "interest-withdrawal" },
    ],
  },
  {
    id: 4,
    field: "Add/Remove Funds",
    path: "manage-funds",
    showNotificationCount: true,
    countField: "fund_management",
    icon: <FiUser />,
    haveSubField: true,
    subField: [
      { subFieldName: "Add/Remove Funds", path: "add-remove-funds" },
      {
        subFieldName: "Report",
        path: "report",
        showNotificationCount: true,
        countField: "fund_management",
      },
    ],
  },
  {
    id: 5,
    field: "Add Vouchers",
    path: "vouchers",

    icon: <FiUser />,
    haveSubField: true,
    subField: [
      { subFieldName: "Add Voucher", path: "add-vouchers" },
      {
        subFieldName: "Report",
        path: "add-vouchers-report",
      },
    ],
  },

  {
    id: 6,
    field: "Tickets",
    path: "tickets",
    countField: "ticket",
    showNotificationCount: true,
    icon: <FiGrid />,
    haveSubField: false,
  },
  {
    id: 7,
    field: "Influencers",
    path: "influencers",
    countField: "influencers",
    showNotificationCount: true,
    icon: <FiUser />,
    haveSubField: true,
    subField: [
      {
        subFieldName: "Powerleg Account",
        path: "powerleg-account",
        showNotificationCount: true,
        countField: "powerleg",
      },
      {
        subFieldName: "Free Account",
        path: "free-account",
        showNotificationCount: true,
        countField: "free",
      },
      {
        subFieldName: "Create Investment",
        path: "create-investment",
      },
      { subFieldName: "User Cash business", path: "user-cash-business" },
    ],
  },
  {
    id: 8,
    field: "Reports",
    path: "reports",
    showNotificationCount: true,
    icon: <FiUser />,
    haveSubField: true,
    subField: [
      { subFieldName: "Daily Business Report", path: "daily-business-report" },
      { subFieldName: "Coinpayment Report", path: "coin-payment-report" },
      { subFieldName: "NowPayments Report", path: "nowpayment-report" },
      {
        subFieldName: "Country Business Report",
        path: "country-business-report",
      },
      // { subFieldName: "Deposits", path: "deposits" },
      { subFieldName: "Investments", path: "investments" },
      { subFieldName: "Withdrawal Report", path: "withdrawal-report" },
      // { subFieldName: "Wallet Transfer", path: "wallet-transfer" },
      { subFieldName: "Binary Report", path: "binary-report" },
      { subFieldName: "Referral Report", path: "referral-report" },
      { subFieldName: "ROI Report", path: "roi-report" },
      { subFieldName: "Interest Rewards", path: "interest-rewards" },
      { subFieldName: "Voucher", path: "vouchers" },
    ],
  },
  {
    id: 9,
    field: "Packages",
    path: "packages",
    icon: <FiGrid />,
    haveSubField: false,
  },

  // {
  //   id: 9,
  //   field: "Bulk Email",
  //   path: "bulk-email",
  //   icon: <FiGrid />,
  //   haveSubField: false,
  // },
];

export const sideBarAllowedData = [
  {
    id: 0,
    field: "Dashboard",
    path: "dashboard",
    icon: <FiGrid />,
    haveSubField: false,
  },
  {
    id: 7,
    field: "Reports",
    path: "reports",
    icon: <FiUser />,
    haveSubField: true,
    subField: [
      { subFieldName: "Daily Business Report", path: "daily-business-report" },
      { subFieldName: "Coinpayment Report", path: "coin-payment-report" },
      { subFieldName: "NowPayments Report", path: "nowpayment-report" },

      {
        subFieldName: "Country Business Report",
        path: "country-business-report",
      },
      { subFieldName: "Investments", path: "investments" },
      { subFieldName: "ROI Report", path: "roi-report" },
    ],
  },
];
