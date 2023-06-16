import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  SigninPage  from "../pages/auth/signin/SigninPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Test from "../pages/dashboard/Test";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>


  );
};

export default IndexRoutes;
