import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage";
import HomePage from "../pages/user/HomePage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/test" element={<App />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
