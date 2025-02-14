import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/user/Home/HomePage";
import SignIn from "../pages/user/Auth/Login";
import UserHeader from "../components/header/UserHeader";
import SignUp from "../pages/user/Auth/Register";
import ForgotPassword from "../pages/user/Auth/ForgotPassword";
import MainFooter from "../components/Footer";

function AppRouter() {
  return (
    <Router>
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

    </Router>
  );
}

export default AppRouter;
