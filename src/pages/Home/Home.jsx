import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesLineChart from "../../components/chart/SalesLineChart";
import WasteLineChart from "../../components/chart/WasteLineChart";
import StaffBarChart from "../../components/chart/StaffBarChart";
import DishWasteDonutChart from "../../components/chart/DishWasteDonutChart";
import AITips from "../../components/AI/AITips";
import { exportForecastToPDF } from "../../utils/exportForecastToPDF";
import Cicon from '../../assets/sales.png';
import "./Home.css";

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-12");
  const [forecast, setForecast] = useState(null);

  const fetchForecast = async (monthNum) => {
    try {
      const response = await axios.post("http://localhost:5001/api/forecast/month", {
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

  const getAverage = (key) => {
    if (!forecast || !forecast.breakdown || forecast.breakdown.length === 0) return "-";
    const sum = forecast.breakdown.reduce((acc, item) => acc + (item[key] ?? 0), 0);
    return Math.round(sum / forecast.breakdown.length);
  };

  const getDailySalesBreakdown = () => {
    const dayMap = new Map();
  
    forecast.breakdown.forEach((entry) => {
      const day = new Date(entry.date).getDate();
      const revenue = entry.predicted_sales * entry.predicted_price;
  
      if (!dayMap.has(day)) {
        dayMap.set(day, 0);
      }
      dayMap.set(day, dayMap.get(day) + revenue);
    });
  
    return Array.from(dayMap.entries()).map(([day, predicted_sales]) => ({
      day,
      predicted_sales: parseFloat(predicted_sales.toFixed(2))
    })).sort((a, b) => a.day - b.day);
  };
  

  const getDailyWasteBreakdown = () => {
    const dayMap = new Map();
  
    forecast.breakdown.forEach((entry) => {
      const day = new Date(entry.date).getDate();
      const waste = entry.predicted_waste ?? 0;
  
      if (!dayMap.has(day)) {
        dayMap.set(day, 0);
      }
  
      dayMap.set(day, dayMap.get(day) + waste);
    });
  
    return Array.from(dayMap.entries()).map(([day, predicted_waste]) => ({
      day,
      predicted_waste: parseFloat(predicted_waste.toFixed(2))
    })).sort((a, b) => a.day - b.day);
  };
  
  const getDailyStaffBreakdown = () => {
    const dayMap = new Map();
  
    forecast.breakdown.forEach((entry) => {
      const day = new Date(entry.date).getDate();
      const staff = entry.predicted_staff ?? 0;
  
      if (!dayMap.has(day)) {
        dayMap.set(day, []);
      }
  
      dayMap.get(day).push(staff);
    });
  
    return Array.from(dayMap.entries()).map(([day, staffList]) => ({
      day,
      predicted_staff: Math.round(
        staffList.reduce((a, b) => a + b, 0) / staffList.length
      ),
    })).sort((a, b) => a.day - b.day);
  };  

  return (
    <div className="home-container">
      <div className="top-wrapper">
        <div className="left-side">
          <div className="top-heading-wrapper">Dashboard</div>
        </div>
        <div className="right-side">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <button className="export-button" onClick={() => exportForecastToPDF(forecast)}>
            Export as PDF
          </button>
        </div>
      </div>

      <div className="home-content-main-container">
        <div className="home-content-heading">Sales and Waste</div>
        {forecast ? (
          <div className="home-content-container">
            <div className="cards-wrapper">
              <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Total Sale</div>
                    <div className="detail-wrapper">Rs. {forecast.total_sales}</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div>

              <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Avg Daily Sales</div>
                    <div className="detail-wrapper">Rs. {forecast.avg_daily_sales}</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div>

              <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Total Waste</div>
                    <div className="detail-wrapper">{forecast.total_food_waste} kg</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div>

              <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Avg Daily Waste</div>
                    <div className="detail-wrapper">{forecast.avg_daily_waste} kg</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div>

              <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Avg Predicted Staff</div>
                    <div className="detail-wrapper">{getAverage("predicted_staff")}</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div>

              {/* <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Avg Predicted Price</div>
                    <div className="detail-wrapper">Rs. {getAverage("predicted_price")}</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div> */}
            </div>

            <div className="second-section">
              <div className="second-section-heading">Sales Chart (Total Daily)</div>
              <div className="second-section-chart-wrapper">
                <SalesLineChart breakdown={getDailySalesBreakdown()} />
              </div>
            </div>

            <div className="third-section">
              <div className="third-section-heading">Waste Chart (Total Daily)</div>
              <div className="third-section-content-wrapper">
                <div className="third-section-content-left">
                  <WasteLineChart breakdown={getDailyWasteBreakdown()} />
                </div>
                <div className="third-section-content-right">
                  <DishWasteDonutChart forecast={forecast} />
                </div>
              </div>
            </div>

            <StaffBarChart breakdown={getDailyStaffBreakdown()} />
          </div>
        ) : (
          <p style={{ marginTop: "2rem" }}>Loading forecast data...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
