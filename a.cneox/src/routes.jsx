import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
  useNavigate,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import {
  BulkEmail,
  Dashboard,
  Genealogy,
  KYCReports,
  Packages,
  Tickets,
  UserActivation,
  UserList,
  UserVerification,
  ROIWithdrawal,
  RBWithdrawal,
  InterestWithdrawal,
  AddRemoveFund,
  Report,
  PowerlegAccount,
  FreeAccount,
  UserCashBusiness,
  DailyBusinessReport,
  CoinPaymentReport,
  NowPaymentReport,
  CountryBusinessReport,
  Deposits,
  Investments,
  WithdrawalReport,
  WalletTransfer,
  BinaryReport,
  ReferralReport,
  InterestRewards,
  TokenWallet,
  UserBio,
  NotificationPage,
} from "./pages/index";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Auth/Login";
import EditUser from "./pages/Users/EditUser";
import AdminRoutes from "./utils/AdminRoutes";
import CreateInvestment from "./pages/Influencers/CreateInvestment";
import ROIReport from "./pages/Reports/ROIReport";
import AddVoucher from "./pages/Vouchers/AddRemoveVoucher";
import AddVouchersReport from "./pages/Vouchers/Report";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      {/* {console.log("heloo")} */}
      <Route element={<PrivateRoutes />}>
        <Route element={<AdminRoutes />}>
          <Route path="admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users">
              <Route path="user-list" element={<UserList />}></Route>
              <Route path="user-activation" element={<UserActivation />} />
              <Route path="user-verification" element={<UserVerification />} />
              <Route path="kyc-reports" element={<KYCReports />} />
            </Route>
            <Route path={"genealogy"} element={<Genealogy />} />
            <Route path="withdrawal">
              <Route path="roi-withdrawal" element={<ROIWithdrawal />} />
              <Route path="r&b-withdrawal" element={<RBWithdrawal />} />
              <Route
                path="interest-withdrawal"
                element={<InterestWithdrawal />}
              />
            </Route>

            <Route path="edit-user/:userId" element={<EditUser />} />
            <Route path="bio/:userId" element={<UserBio />} />
            <Route path="notification" element={<NotificationPage />} />

            {/* genealogy Binary */}
            <Route path="genealogy/binary/:id" element={<Genealogy />} />
            <Route
              path="genealogy/binary"
              element={<Navigate to={"/admin/genealogy"} />}
            />

            <Route path="vouchers/add-vouchers" element={<AddVoucher />} />
            <Route
              path="vouchers/add-vouchers-report"
              element={<AddVouchersReport />}
            />

            <Route path="manage-funds">
              <Route path="add-remove-funds" element={<AddRemoveFund />} />
              <Route path="report" element={<Report />} />
            </Route>
            <Route path="tickets" element={<Tickets />} />
            <Route path="influencers">
              <Route path="powerleg-account" element={<PowerlegAccount />} />
              <Route path="free-account" element={<FreeAccount />} />
              <Route path="create-investment" element={<CreateInvestment />} />

              <Route path="user-cash-business" element={<UserCashBusiness />} />
            </Route>
            <Route path="reports">
              <Route
                path="daily-business-report"
                element={<DailyBusinessReport />}
              />
              <Route
                path="coin-payment-report"
                element={<CoinPaymentReport />}
              />
              <Route path="nowpayment-report" element={<NowPaymentReport />} />
              <Route
                path="country-business-report"
                element={<CountryBusinessReport />}
              />
              <Route path="deposits" element={<Deposits />} />
              <Route path="investments" element={<Investments />} />
              <Route path="withdrawal-report" element={<WithdrawalReport />} />
              {/* <Route path="wallet-transfer" element={<WalletTransfer />} /> */}
              <Route path="binary-report" element={<BinaryReport />} />
              <Route path="roi-report" element={<ROIReport />} />
              <Route path="referral-report" element={<ReferralReport />} />
              <Route path="interest-rewards" element={<InterestRewards />} />
              <Route path="vouchers" element={<TokenWallet />} />
            </Route>
            <Route path="packages" element={<Packages />} />
            <Route path="bulk-email" element={<BulkEmail />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
