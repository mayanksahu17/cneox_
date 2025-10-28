import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "./theme-provider";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get page title based on current path
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/investment":
        return "Investment";
      case "/dashboard/voucher":
        return "Voucher";
      case "/dashboard/genealogy":
        return "Genealogy";
      case "/dashboard/report":
        return "Report";
      case "/dashboard/support":
        return "Support";
      case "/dashboard/myprofile":
        return "My Profile";
      default:
        if (location.pathname.includes("/dashboard/settings")) return "Settings";
        if (location.pathname.includes("/dashboard/tickets")) return "Tickets";
        return "Dashboard";
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar pageTitle={getPageTitle()} toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout; 