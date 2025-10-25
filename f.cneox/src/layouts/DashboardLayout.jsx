import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Whatsapp from "../pages/Whatsapp";
import { ThemeProvider } from "../components/dashboard/theme-provider";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { useState } from "react";

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get page title based on current path
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/investments/all-plans":
        return "Investments";
      case "/dashboard/investments/downline-activation":
        return "Downline Activation";
      case "/dashboard/investments/package-activation":
        return "Package Activation";
      case "/dashboard/vouchers/create":
        return "Create Voucher";
      case "/dashboard/vouchers/all":
        return "All Vouchers";
      case "/dashboard/genealogy/binary":
        return "Binary Tree";
      case "/dashboard/genealogy/referral":
        return "Referral";
      case "/dashboard/reports/roi":
        return "ROI Report";
      case "/dashboard/reports/bi":
        return "BI Report";
      case "/dashboard/reports/ri":
        return "RI Report";
      case "/dashboard/reports/deposit":
        return "Deposit Report";
      case "/dashboard/reports/tokens":
        return "Tokens Report";
      case "/dashboard/reports/extra-income":
        return "Extra Income Report";
      case "/dashboard/reports/withdrawal":
        return "Withdrawal Report";
      case "/dashboard/tickets/submit-ticket":
        return "Submit Ticket";
      case "/dashboard/tickets/all":
        return "All Tickets";
      case "/dashboard/settings/profile":
        return "Profile Settings";
      case "/dashboard/settings/notification":
        return "Notification Settings";
      case "/dashboard/settings/security":
        return "Security Settings";
      case "/dashboard/settings/kyc":
        return "KYC Settings";
      default:
        if (location.pathname.includes("/dashboard/genealogy/binary/"))
          return "User Binary Tree";
        if (location.pathname.includes("/dashboard/settings"))
          return "Settings";
        if (location.pathname.includes("/dashboard/investments"))
          return "Investments";
        if (location.pathname.includes("/dashboard/vouchers"))
          return "Vouchers";
        if (location.pathname.includes("/dashboard/reports"))
          return "Reports";
        if (location.pathname.includes("/dashboard/tickets"))
          return "Tickets";
        return "Dashboard";
    }
  };

  if (!user) {
    return <Navigate to="/login" state={{ location }} />;
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar pageTitle={getPageTitle()} toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <Outlet />
            <Whatsapp />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
