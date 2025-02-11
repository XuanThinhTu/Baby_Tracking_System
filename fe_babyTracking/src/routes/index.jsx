import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
