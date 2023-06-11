import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigInPage from "../pages/client/auth/signin/SigInPage";
import HomePage from "../pages/client/home/HomePage";

export const IndexRoutes = () => {
  return (
    <Router>
    <Routes>
        <Route path="/signin" element={<SigInPage />} />
        <Route path="/home" element={<HomePage />} />
    </Routes>
</Router>
  )
}
