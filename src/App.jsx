import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import SalesPrediction from "./pages/SalesPrediction/SalesPrediction";
import InventoryManagement from "./pages/InventoryManagement/InventoryManagement";
import StaffManagement from "./pages/StaffManagement/StaffManagement";
import FoodWasteAnalytics from "./pages/FoodWasteAnalytics/FoodWasteAnalytics";
import AIInsights from "./pages/AIInsights/AIInsights";
import ReportsExport from "./pages/ReportExport/ReportExport";
import Settings from "./pages/Settings/Settings";
import FoodItemAnalytics from "./pages/FoodItemAnalytics/FoodItemAnalytics";
import Sidebar from "./components/Sidebar/Sidebar";
import Sales from "./pages/Sales/Sales";
import Waste from "./pages/Waste/Waste";

function App() {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:5001/api/forecast/month", { month: 8 }) // Or pass selected month
      .then((res) => setForecast(res.data))
      .catch((err) => console.error("Error loading forecast:", err));
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="main-container">
          <div className="side-panel">
            <Sidebar />
          </div>
          <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales forecast={forecast} />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/waste" element={<Waste forecast={forecast} />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/reports" element={<ReportsExport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/food-item" element={<FoodItemAnalytics />} />
          </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
