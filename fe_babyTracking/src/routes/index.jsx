import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/user/HomePage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<App />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
