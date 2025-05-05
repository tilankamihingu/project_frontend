import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesLineChart from "../../components/chart/SalesLineChart";
import WasteLineChart from "../../components/chart/WasteLineChart";
import StaffBarChart from "../../components/chart/StaffBarChart";
import AITips from "../../components/AI/AITips";
import { exportForecastToPDF } from "../../utils/exportForecastToPDF";
import "./Home.css";

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-12");
  const [forecast, setForecast] = useState(null);

  const fetchForecast = async (monthNum) => {
    try {
      const response = await axios.post("http://localhost:5000/api/forecast/month", {
        month: monthNum,
      });
      setForecast(response.data);
    } catch (error) {
      console.error("❌ Forecast API error:", error.message);
    }
  };

  useEffect(() => {
    const monthNumber = parseInt(selectedMonth.split("-")[1]);
    fetchForecast(monthNumber);
  }, [selectedMonth]);

  return (
    <div className="home-container">
      <h1>🏪 AI-Powered Restaurant Forecast Dashboard</h1>
      <p>
        View smart AI predictions for the selected month. This includes forecasted sales,
        expected food waste, staffing suggestions, and dynamic planning tips.
      </p>

      <div className="top-controls">
        <label>
          📅 Select Forecast Month:{" "}
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </label>

        <button
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
          onClick={() => exportForecastToPDF(forecast)}
        >
          📥 Export Forecast as PDF
        </button>
      </div>

      {forecast ? (
        <>
          <div className="cards-container">
            <div className="card green">💰 Total Sales: Rs. {forecast.total_sales}</div>
            <div className="card blue">📊 Avg Daily Sales: Rs. {forecast.avg_daily_sales}</div>
            <div className="card red">🗑️ Total Waste: {forecast.total_food_waste} kg</div>
            <div className="card orange">📉 Avg Daily Waste: {forecast.avg_daily_waste} kg</div>
          </div>

          <SalesLineChart breakdown={forecast.breakdown} />
          <WasteLineChart breakdown={forecast.breakdown} />
          <StaffBarChart breakdown={forecast.breakdown} />
          <AITips forecast={forecast} />
        </>
      ) : (
        <p style={{ marginTop: "2rem" }}>Loading forecast data...</p>
      )}
    </div>
  );
};

export default Home;
