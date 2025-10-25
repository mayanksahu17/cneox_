import {
  FaHome,
  FaChartLine,
  FaComments,
  FaMoneyCheckAlt,
  FaFileAlt,
} from "react-icons/fa";

const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Investment",
    route: "/dashboard/investments/all-plans",
    icon: FaChartLine,
  },
  {
    name: "Vouchers",
    route: "/dashboard/vouchers/create",
    icon: FaComments,
  },
  {
    name: "Genealogy",
    route: "/dashboard/genealogy/binary",
    icon: FaMoneyCheckAlt,
  },
  {
    name: "Report",
    route: "/dashboard/reports/roi",
    icon: FaFileAlt,
  },
];
export default routes;
