import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeRoutes from "./routes/HomeRoutes";
import LandingPage from "./Esther/LandingPage";
import Howitworks from "./Adio/Howitworks";
import AboutUs from "./Davidson/AboutUs";
import Hospitalsignup from "./Esther/auth/Hospitalsignup";
import Hospitallogin from "./Esther/auth/Hospitallogin";
import Donorslogin from "./Esther/auth/Donorslogin";
import Donorssignup from "./Esther/auth/Donorssignup";
import KYC from "./Esther/auth/KYC";
import Resetpassword from "./Esther/auth/Resetpassword";

import ProfilePage from "./Adio/pages/ProfilePage";
import SettingsPage from "./Adio/pages/SettingsPage";
import DashboardLayout from "./Adio/DashboardLayout";
import HistoryPage from "./Adio/pages/HistoryPage";
import Appointment from "./Davidson/pages/Appointment";
import RecordPage from "./Davidson/pages/RecordPage";
import RequstPage from "./Davidson/pages/RequstPage";
import Subscrib from "./Davidson/pages/Subscribe";
import HospitalDetailsPage from "./Adio/pages/HospitalDetailsPage";

import Hospitalterms from "./Esther/terms/Hospitalterms";
import Donorterms from "./Esther/terms/Donorterms";
import Authentry from "./Esther/auth/Authentry";

import Scrolltop from "./components/scroll/Scrolltop";
import Verification from "./Esther/pages/Verification";
import Settings from "./Esther/pages/Settings";
import Blacklist from "./Esther/pages/Blacklist";
import Adminsignin from "./Esther/pages/Adminsignin";
import Adminlogin from "./Esther/pages/Adminlogin";
import Adminreset from "./Esther/pages/Adminreset";
import PrivateRoutes from "./routes/PrivateRoutes";
import FindHospitalPage from "./Adio/pages/FindHospitalPage";
import HospitalSettingsPage from "./Davidson/pages/HospitalSettingsPage";
import RequestHistory from "./Davidson/pages/RequestHistory";
import ForgotPassword from "./Esther/auth/ForgotPassword";
import VerifyMail from "./Esther/auth/VerifyMail";
import NotFound from "./components/404/404";
import PaymentStatus from "./Esther/pages/PaymentStatus";
import CheckMail from "./Esther/auth/CheckMail";
import ResendMailVerification from "./Esther/auth/ResendMailVerification.jsx";
import UsersPage from "./Esther/pages/UsersPage.jsx";
import AdminForgotPassword from "./Esther/pages/AdminForgotPassword.jsx";
import HospitalRequestsPage from "./Davidson/pages/HospitalRequestsPage.jsx";
import HospitalRequestDetails from "./Davidson/pages/HospitalRequestDetails.jsx";
import { toast } from "sonner";
import ResetOtp from "./Esther/auth/ResetOtp.jsx";

const App = () => {
  useEffect(() => {
    const handleOffline = () => toast.error("You are offline");

    if (!navigator.onLine) {
      toast.error("You are offline");
    }

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Scrolltop />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <HomeRoutes />,
          children: [
            { path: "/", element: <LandingPage /> },
            { path: "/about", element: <AboutUs /> },
            { path: "/howitworks", element: <Howitworks /> },
          ],
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoutes>
              <DashboardLayout />
            </PrivateRoutes>
          ),
          children: [
            { path: "", element: <ProfilePage /> },
            { path: "findhospital", element: <FindHospitalPage /> },
            { path: "history", element: <HistoryPage /> },
            { path: "requesthistory", element: <RequestHistory /> },
            { path: "settings", element: <SettingsPage /> },
            { path: "hospitalsettings", element: <HospitalSettingsPage /> },
            { path: "appointment", element: <Appointment /> },
            { path: "records", element: <RecordPage /> },
            { path: "request", element: <RequstPage /> },
            { path: "hospitalsrequest", element: <HospitalRequestsPage /> },
            {
              path: "hospitalsrequestdetails/:bloodRequestId",
              element: <HospitalRequestDetails />,
            },
            {
              path: "hospitaldetails/:hospitalId",
              element: <HospitalDetailsPage />,
            },
            { path: "subscribe", element: <Subscrib /> },
            { path: "adminverification", element: <Verification /> },
            { path: "allusers", element: <UsersPage /> },
            { path: "adminsettings", element: <Settings /> },
            { path: "adminblacklist", element: <Blacklist /> },
          ],
        },
        { path: "/authentry", element: <Authentry /> },
        { path: "/signup", element: <Authentry type="signup" /> },
        { path: "/login", element: <Authentry type="login" /> },
        { path: "/hospitalsignup", element: <Hospitalsignup /> },
        { path: "/hospitallogin", element: <Hospitallogin /> },
        { path: "/verifymail/:token", element: <VerifyMail /> },
        {
          path: "/resendVerificationMail",
          element: <ResendMailVerification />,
        },
        { path: "/checkmail", element: <CheckMail /> },
        { path: "/paymentcheck", element: <PaymentStatus /> },
        { path: "/donorslogin", element: <Donorslogin /> },
        { path: "/donorssignup", element: <Donorssignup /> },
        { path: "/resetpassword/:token", element: <Resetpassword /> },
        { path: "/forgotpassword", element: <ForgotPassword /> },
        { path: "/kyc", element: <KYC /> },
        { path: "/hospiterms", element: <Hospitalterms /> },
        { path: "/donorterms", element: <Donorterms /> },
        { path: "/adminsignin", element: <Adminsignin /> },
        { path: "/adminlogin", element: <Adminlogin /> },
        { path: "/adminreset/:token", element: <Adminreset /> },
        { path: "/adminforgotpassword", element: <AdminForgotPassword /> },
        { path: "/reset-password-otp/:email", element: <ResetOtp /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
