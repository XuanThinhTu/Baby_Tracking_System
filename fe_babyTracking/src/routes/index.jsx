import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import App from "../App";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage";
import HomePage from "../pages/user/Home/index";
import SignIn from "../pages/user/Auth/Login";
import UserHeader from "../components/header/UserHeader";
import SignUp from "../pages/user/Auth/Register";
import ForgotPassword from "../pages/user/Auth/ForgotPassword";
import MainFooter from "../components/Footer";
import MyFamily from "../pages/user/MyFamily";
import BabyOverview from "../pages/user/BabyDetails";
import AddBabyInfo from "../pages/user/BabyDetails/Info/AddBabyInfo";
import ConsultationRequest from "../pages/user/BabyDetails/Consultation/ConsultationRequest";
import BookingPage from "../pages/user/Calendar";
import DoctorPage from "../pages/user/Doctor";
import DoctorDetail from "../pages/user/Doctor/DoctorDetail";

function UserLayout() {
  const location = useLocation();

  const isContentPage =
    [
      "/login",
      "/register",
      "/forgot-password",
      "/my-family",
      "/add-baby-info",
      "/consultation-request",
      "/booking-meeting",
      "/doctor",
    ].some((path) => location.pathname.startsWith(path)) ||
    location.pathname.startsWith(
      "/baby-details/",
      "/add-baby-info/",
      "/doctor/"
    );

  return (
    <>
      <UserHeader />
      {isContentPage ? (
        <div className="container mx-auto px-2 py-4">
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/my-family" element={<MyFamily />} />
            <Route path="/baby-details/:babyId" element={<BabyOverview />} />
            <Route path="/add-baby-info/:babyId" element={<AddBabyInfo />} />
            <Route
              path="/consultation-request"
              element={<ConsultationRequest />}
            />
            <Route path="/booking-meeting" element={<BookingPage />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/doctor/:doctorId" element={<DoctorDetail />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      )}
      <MainFooter />
    </>
  );
}

function AdminLayout() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
      </Routes>
    </div>
  );
}
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
