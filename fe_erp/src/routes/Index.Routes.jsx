import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  SigninPage  from "../pages/auth/signin/SigninPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default IndexRoutes;
