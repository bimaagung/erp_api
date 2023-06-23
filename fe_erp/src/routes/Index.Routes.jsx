import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../pages/auth/signin/SigninPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import HomePage from "../pages/Home/HomePage";
import OfficePage from "../pages/office/OfficePage";
import EmployeePage from "../pages/employee/EmployeePage";
import SalaryPage from "../pages/Salary/SalaryPage";
import OfficeAddPage from "../pages/office/OfficeAddPage";
import OfficeUpdatePage from "../pages/office/OfficeUpdatePage";
import EmployeeAddPage from "../pages/employee/EmployeeAddPage";
import EmployeeUpdatePage from "../pages/employee/EmployeeUpdatePage";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/home" element={<HomePage />} />
        <Route path="/admin/karyawan" element={<EmployeePage />} />
        <Route path="/admin/add/karyawan" element={<EmployeeAddPage />} />
        <Route path="/admin/karyawan/:id" element={<EmployeeUpdatePage />} />
        <Route path="/admin/gaji" element={<SalaryPage />} />
        <Route path="/admin/kantor-cabang" element={<OfficePage />} />
        <Route path="/admin/add/kantor-cabang" element={<OfficeAddPage />} />
        <Route path="/admin/update/kantor-cabang/:id" element={<OfficeUpdatePage />} />
      </Routes>
    </Router>
  );
};

export default IndexRoutes;
