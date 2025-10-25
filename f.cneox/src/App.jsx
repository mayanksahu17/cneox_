import { Route, Routes } from "react-router-dom";
import About from "./pages/common/About";
import Home_02 from "./pages/home/Home_02";
import Home_03 from "./pages/home/Home_03";
import Home_04 from "./pages/home/Home_04";
import Home_05 from "./pages/home/Home_05";
import Blog_details from "./pages/common/Blog_details";
import Blog from "./pages/common/Blog";
import Contact from "./pages/common/Contact";
import TermsandCondition from "./pages/common/TermsandCondition";
import Faq_02 from "./pages/common/faq/faq_02/Faq_02";
import Login from "./pages/common/Login";
import Portfolio_details from "./pages/common/Portfolio_details";
import Portfolio from "./pages/common/Portfolio";
import Pricing from "./pages/common/Pricing";
import PrivacyPolicies from "./pages/common/PrivacyPolicies";
import Services_Details from "./pages/common/Service_Details";
import Services from "./pages/common/Services";
import Signup from "./pages/common/Signup";
import Team_details from "./pages/common/Team_details";
import Team from "./pages/common/team/Team";
import useJOSAnimation from "./hooks/useJOSAnimation";
import Layout from "./components/layout/Layout";
import Faq_01 from "./pages/common/faq/faq_01/Faq_01";
import BusinessPlan from "./pages/busines-plan/business-plan";
// Service Pages
import EvInvestments from "./pages/services/EvInvestments";
import WealthManagement from "./pages/services/WealthManagement";
import CryptoBlockchain from "./pages/services/CryptoBlockchain";
import SolarEnergy from "./pages/services/SolarEnergy";
import AiFinance from "./pages/services/AiFinance";
// Dashboard Pages
import {
  Home,
  Investment,
  Settings,
  SignUpAs,
  Genealogy,
  Reports,
  Tickets,
  Vouchers,
  ForgotPassword,
} from "./pages";
import { UserBinaryTree } from "./components";
import DashboardLayout from "./layouts/DashboardLayout";
import ResetPassword from "./pages/common/ResetPassword";
import Verify from "./pages/common/Verify";
import AboutNew from "./AboutNew";
import TeamPhotos from "./pages/common/team/TeamPhotos";
import Map from "./components/sections/inner-pages/contact/Map";
import LoginToUserDashboard from "./pages/common/LoginToUserDashboard";
import Calculator from "./components/dashboard/calculator/Calculator";
import NowPayment from "./components/dashboard/investments/NowPayment";
import Dashboard from "./components/dashboard/home/Dashboard";
import TradeView from "./components/tradeview/TradeView";
import TradingReport from "./components/dashboard/reports/TradingReport";
import SolarDoc from "./components/sections/home_01/SolarDoc";
import Smoothscrolls from "./components/Smoothscrolls";
import PDFDownloads from "./pages/common/PDFDownloads";
import Deposit from "./pages/dashboard/Deposit";

function App() {
  // Init JOS Animation
  useJOSAnimation();

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset-password" element={<ResetPassword />} />

        <Route exact path="signup/:sponsorId/:position" element={<Signup />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Smoothscrolls>
                <Home_05 />
              </Smoothscrolls>
            }
          />
          <Route
            exact
            path="login-to-user-dashboard/:userid"
            element={<LoginToUserDashboard />}
          />
          <Route path="reports/trade-view" element={<TradeView />} />
          <Route path="reports/trade-report" element={<TradingReport />} />
          <Route
            path="reports/solar-report"
            element={
              <Smoothscrolls>
                <SolarDoc />
              </Smoothscrolls>
            }
          />

          <Route
            path="contact"
            element={
              <Smoothscrolls>
                <Contact />
              </Smoothscrolls>
            }
          />
          <Route path="/pdf-downloads" element={<PDFDownloads />} />

          {/* <Route path="about" element={<About />} /> */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog-details" element={<Blog_details />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio-details" element={<Portfolio_details />} />
          <Route path="faq" element={<Faq_01 />} />
          <Route path="faq-2" element={<Faq_02 />} />
          <Route
            path="pages/team"
            element={
              <Smoothscrolls>
                <Team />
              </Smoothscrolls>
            }
          />
          {/* <Route path="media" element={<TeamPhotos />} /> */}
          <Route path="pages/legal" element={<Map />} />

          <Route path="team-details" element={<Team_details />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="PrivacyPolicies" element={<PrivacyPolicies />} />
          <Route
            path="services"
            element={
              <Smoothscrolls>
                <Services />
              </Smoothscrolls>
            }
          />
          {/* Services sub-pages */}
          <Route
            path="services/ev-investments"
            element={
              <Smoothscrolls>
                <EvInvestments />
              </Smoothscrolls>
            }
          />
          <Route
            path="services/wealth-management"
            element={
              <Smoothscrolls>
                <WealthManagement />
              </Smoothscrolls>
            }
          />
          <Route
            path="services/crypto-blockchain"
            element={
              <Smoothscrolls>
                <CryptoBlockchain />
              </Smoothscrolls>
            }
          />
          <Route
            path="services/solar-energy"
            element={
              <Smoothscrolls>
                <SolarEnergy />
              </Smoothscrolls>
            }
          />
          <Route
            path="services/ai-finance"
            element={
              <Smoothscrolls>
                <AiFinance />
              </Smoothscrolls>
            }
          />
          
          <Route path="service-details" element={<Services_Details />} />
          <Route path="/TermsandCondition" element={<TermsandCondition />} />
          <Route path="verify/:token" element={<Verify />} />
          <Route path="pages/business-plan" element={<BusinessPlan />} />
          {/* <Route path="home-4" element={<Home_04 />} /> */}
        </Route>
        <Route path="home-2" element={<Home_02 />} />
        {/* <Route path="new" element={<AboutNew />} /> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="investments/:selectedRoute" element={<Investment />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="nowtry" element={<NowPayment />} />
          <Route path="one" element={<Dashboard />} />
          <Route path="settings/:selectedRoute" element={<Settings />} />
          <Route path="genealogy/:selectedRoute" element={<Genealogy />} />
          <Route path="genealogy/binary/:userId" element={<UserBinaryTree />} />
          <Route path="vouchers/:selectedRoute" element={<Vouchers />} />
          <Route path="reports/:selectedRoute" element={<Reports />} />
          <Route path="tickets/:selectedRoute" element={<Tickets />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
