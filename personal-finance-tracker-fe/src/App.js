import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
// import TransactionsPage from './pages/TransactionsPage';
// import BudgetsPage from './pages/BudgetsPage';
// import ReportsPage from './pages/ReportsPage';
// import SettingsPage from './pages/SettingsPage';
// import AIChatbotPage from './pages/AIChatbotPage';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const MainLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/login"]; // Routes where the sidebar should be hidden

  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <div style={{ marginLeft: showSidebar ? "300px" : "0", padding: "20px", width: "100%" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
