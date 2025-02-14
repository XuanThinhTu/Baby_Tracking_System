import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import App from "../App";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage";
import HomePage from "../pages/user/Home/HomePage";
import SignIn from "../pages/user/Auth/Login";
import UserHeader from "../components/header/UserHeader";
import SignUp from "../pages/user/Auth/Register";
import ForgotPassword from "../pages/user/Auth/ForgotPassword";
import MainFooter from "../components/Footer";

function UserLayout() {
  return (
    <>
      <UserHeader />
      <div className="container mx-auto px-2 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
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
