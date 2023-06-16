import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/signin/SigninPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Test from "../pages/dashboard/Test";
import Sidebar from "../components/layouts/Sidebar";
import HomePage from "../pages/Home/HomePage";
import OfficePage from "../pages/office/OfficePage";
import EmployeePage from "../pages/employee/EmployeePage";
import SalaryPage from "../pages/Salary/SalaryPage";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/home" element={<HomePage />} />
        <Route path="/admin/karyawan" element={<EmployeePage />} />
        <Route path="/admin/gaji" element={<SalaryPage />} />
        <Route path="/admin/kantor-cabang" element={<OfficePage />} />
      </Routes>
    </Router>
  );
};

export default IndexRoutes;
