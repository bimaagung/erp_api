import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  SigninPage  from "../pages/auth/signin/SigninPage";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
      </Routes>
    </Router>
  );
};

export default IndexRoutes;
