import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import HomeOne from "../components/static/HomeOne/Main";
import Footer from "../components/static/Footer/Main";

import About from "../components/static/About/Main";
import Contact from "../components/static/Contact/Main";
import NFTCompnies from "../components/static/NFTCompnies/Main";
import FAQ from "../components/static/FAQ/Main";
import Cryptocurrency from "../components/static/Cryptocurrency/Main";
import ForbesTop500Companies from "../components/static/ForbesTop500Companies/Main";

import NewsDetails from "../components/static/NewsDetails/Main";
import News from "../components/static/News/Main";
import PortfolioDetails from "../components/static/PortfolioDetails/Main";
import AIPlateforms from "../components/static/AIPlateforms/Main";
import Portfolio from "../components/static/Portfolio/Main";

import InvestmentJS from "../components/static/InvestmentJS/Main";

import Affiliate from "../components/static/Affiliate/Main";
import Services from "../components/static/Services/Main";
import TermsAndConditions from "../components/static/TermsAndConditions/Main";
import PrivacyPolicies from "../components/static/PrivacyPolicies/Main";
import Team from "../components/static/Team/Main";
import PDFs from "../components/static/PDFs/Main";
import Photos from "../components/static/Photos/Main";
import Videos from "../components/static/Videos/Main";
import Banners from "../components/static/Banners/Main";
import Login from "../pages/Login";
import Legal from "../components/static/Legal/Main";
import { DashboardLayout } from "../layouts";

// Dashboard Pages
import {
  Home,
  Investment,
  Settings,
  SignUp,
  Genealogy,
  Reports,
  Tickets,
  Vouchers,
  VerifyEmail,
  ForgotPassword,
} from "../pages";
import { UserBinaryTree } from "../components";
import LoginToUserDashboard from "../pages/common/LoginToUserDashboard";

function Index() {
  return (
    <>
      <div className="page_wrapper">
        <Routes>
          <Route path="/" element={<OutletLayout />}>
            <Route index element={<HomeOne />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/NFTCompnies" element={<NFTCompnies />} />
            <Route path="/InvestmentJS" element={<InvestmentJS />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/Cryptocurrency" element={<Cryptocurrency />} />
            <Route
              path="/ForbesTop500Companies"
              element={<ForbesTop500Companies />}
            />
            <Route
              path="/TermsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route path="/PrivacyPolicies" element={<PrivacyPolicies />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />

            <Route path="/news-details" element={<NewsDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="/portfolio-details" element={<PortfolioDetails />} />
            <Route path="/AIPlateforms" element={<AIPlateforms />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Affiliate" element={<Affiliate />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/PDFs" element={<PDFs />} />
            <Route path="/Photos" element={<Photos />} />
            <Route path="/Videos" element={<Videos />} />
            <Route path="/Banners" element={<Banners />} />
            <Route path="/Legal" element={<Legal />} />
          </Route>
          <Route exact path="user" element={<LoginToUserDashboard />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/forgotpassword" element={<Forgotpassword />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            exact
            path="signup/:sponsorId/:position"
            element={<SignUp />}
          />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="investments/:selectedRoute" element={<Investment />} />
            <Route path="settings/:selectedRoute" element={<Settings />} />
            <Route path="genealogy/:selectedRoute" element={<Genealogy />} />
            <Route
              path="genealogy/binary/:userId"
              element={<UserBinaryTree />}
            />
            <Route path="vouchers/:selectedRoute" element={<Vouchers />} />
            <Route path="reports/:selectedRoute" element={<Reports />} />
            <Route path="tickets/:selectedRoute" element={<Tickets />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default Index;

function OutletLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}
