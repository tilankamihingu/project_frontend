import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesLineChart from "../../components/chart/SalesLineChart";
import WasteLineChart from "../../components/chart/WasteLineChart";
import "./Home.css";
import StaffBarChart from "../../components/chart/StaffBarChart";
import AITips from "../../components/AI/AITips";
import { exportForecastToPDF } from "../../utils/exportForecastToPDF";

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
      <button
        style={{ marginTop: "1rem", padding: "0.6rem 1.2rem", cursor: "pointer" }}
        onClick={() => exportForecastToPDF(forecast)}
      >
        📥 Export as PDF
      </button>
      <h2>📅 Select Month to Forecast</h2>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      {forecast ? (
        <>
          <div className="cards-container">
            <div className="card">Total Sales: Rs. {forecast.total_sales}</div>
            <div className="card">Avg Daily Sales: Rs. {forecast.avg_daily_sales}</div>
            <div className="card">Total Waste: {forecast.total_food_waste} kg</div>
            <div className="card">Avg Daily Waste: {forecast.avg_daily_waste} kg</div>
          </div>

          <SalesLineChart breakdown={forecast.breakdown} />
          <WasteLineChart breakdown={forecast.breakdown} />
          <StaffBarChart breakdown={forecast.breakdown} />
          <AITips forecast={forecast} />
        </>
      ) : (
        <p>Loading forecast...</p>
      )}
    </div>
  )
}

export default Home