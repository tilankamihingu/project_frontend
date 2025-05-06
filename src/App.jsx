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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<SalesPrediction />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/waste" element={<FoodWasteAnalytics />} />
          <Route path="/insights" element={<AIInsights />} />
          <Route path="/reports" element={<ReportsExport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/food-item" element={<FoodItemAnalytics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
