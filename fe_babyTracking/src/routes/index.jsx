import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/user/Home/HomePage";
import SignIn from "../pages/user/Auth/Login";
import UserHeader from "../components/header/UserHeader";

function AppRouter() {
  return (
    <Router>
      <UserHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
