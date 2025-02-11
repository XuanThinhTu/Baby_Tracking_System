import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
