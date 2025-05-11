import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesLineChart from "../../components/chart/SalesLineChart";
import WasteLineChart from "../../components/chart/WasteLineChart";
import StaffBarChart from "../../components/chart/StaffBarChart";
import AITips from "../../components/AI/AITips";
import { exportForecastToPDF } from "../../utils/exportForecastToPDF";
import Cicon from '../../assets/sales.png'
import "./Home.css";
import DishSalesDonutChart from "../../components/chart/DishSalesDonutChart";
import DishWasteDonutChart from "../../components/chart/DishWasteDonutChart";

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
        <button className="export-button"
          onClick={() => exportForecastToPDF(forecast)}
        >
          Export as pdf
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
                    <div className="detail-wrapper">Rs. {forecast.total_sales}.00</div>
                  </div>
                </div>
                <div className="card-right-wrapper"><img src={Cicon} alt="card-image" /></div>
              </div>
              <div className="card-wrapper">
                <div className="card-left-wrapper">
                  <div className="card-content-wrapper">
                    <div className="card-title">Avg Daily Sales</div>
                    <div className="detail-wrapper">Rs. {forecast.avg_daily_sales}.00</div>
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
            </div>
            <div className="second-section">
              <div className="second-section-heading">Sales chart</div>
              <div className="second-section-chart-wrapper">
                <SalesLineChart breakdown={forecast.breakdown} />
              </div>
            </div>
            <div className="third-section">
              <div className="third-section-heading">Dish by dish sales</div>
              <div className="third-section-content-wrapper">
                <div className="third-section-content-left">
                  <DishWasteDonutChart selectedMonth={selectedMonth} />
                </div>
                <div className="third-section-content-right">
                  <WasteLineChart breakdown={forecast.breakdown} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: "2rem" }}>Loading forecast data...</p>
        )}
      </div>
    </div>
    // <div className="home-container">
    //   <div className="top-wrapper">
    //     <div className="heading">AI-Powered Restaurant Forecast Dashboard</div>
    //     <div className="top-right-section">
    //       <input
    //         type="month"
    //         value={selectedMonth}
    //         onChange={(e) => setSelectedMonth(e.target.value)}
    //       />

    //       <button
    //         style={{
    //           padding: "0.6rem 1.2rem",
    //           backgroundColor: "#007bff",
    //           color: "#fff",
    //           border: "none",
    //           borderRadius: "6px",
    //           cursor: "pointer",
    //           marginLeft: "1rem",
    //         }}
    //         onClick={() => exportForecastToPDF(forecast)}
    //       >
    //         📥 Export Forecast as PDF
    //       </button>
    //     </div>
    //   </div>
    //   {forecast ? (
    //     <div className="home-content-container">
          // <div className="cards-wrapper">
          //   <div className="card-wrapper">
          //     <div className="card-left-wrapper">
          //       <div className="card-content-wrapper">
          //         <div className="card-title">Total Sale</div>
          //         <div className="detail-wrapper">Rs. {forecast.total_sales}.00</div>
          //       </div>
          //     </div>
          //     <div className="next-btn-wrapper"><img src={Cicon} alt="card-image" /></div>
          //   </div>
          //   <div className="card-wrapper">
          //     <div className="card-left-wrapper">
          //       <div className="img-wrapper">
          //         <img src={Cicon} alt="card-image" />
          //       </div>
          //       <div className="card-content-wrapper">
          //         <div className="card-title">Avg Daily Sales</div>
          //         <div className="detail-wrapper">Rs. {forecast.avg_daily_sales}.00</div>
          //       </div>
          //     </div>
          //     <div className="next-btn-wrapper">=</div>
          //   </div>
          //   <div className="card-wrapper">
          //     <div className="card-left-wrapper">
          //       <div className="img-wrapper">
          //         <img src={Cicon} alt="card-image" />
          //       </div>
          //       <div className="card-content-wrapper">
          //         <div className="card-title">Total Waste</div>
          //         <div className="detail-wrapper">{forecast.total_food_waste} kg</div>
          //       </div>
          //     </div>
          //     <div className="next-btn-wrapper">=</div>
          //   </div>
          //   <div className="card-wrapper">
          //     <div className="card-left-wrapper">
          //       <div className="img-wrapper">
          //         <img src={Cicon} alt="card-image" />
          //       </div>
          //       <div className="card-content-wrapper">
          //         <div className="card-title">Avg Daily Waste</div>
          //         <div className="detail-wrapper">{forecast.avg_daily_waste} kg</div>
          //       </div>
          //     </div>
          //     <div className="next-btn-wrapper">=</div>
          //   </div>
          // </div>
    //       <div className="second-section">
    //         <div className="chart-full-wrapper">
    //           <SalesLineChart breakdown={forecast.breakdown} />
    //         </div>
    //       </div>
    //       <div className="third-section">
    //         <div className="donut-chart-wrapper">
    //           <DishSalesDonutChart selectedMonth={selectedMonth} />
    //         </div>
    //         <div className="alerts-wrapper">
    //           <AITips forecast={forecast} />
    //         </div>
    //       </div>
    //       <div className="fourth-section">
    //         <div className="chart-full-wrapper">
    //           <WasteLineChart breakdown={forecast.breakdown} />
    //         </div>
    //       </div>
    //       <div className="fourth-section">
    //         <div className="donut-chart-wrapper">
    //           <DishWasteDonutChart selectedMonth={selectedMonth} />
    //         </div>
    //         <div className="alerts-wrapper">
    //           <AITips forecast={forecast} />
    //         </div>
    //       </div>
    //       <StaffBarChart breakdown={forecast.breakdown} />
    //     </div>
    //   ) : (
    //     <p style={{ marginTop: "2rem" }}>Loading forecast data...</p>
    //   )}
    // </div>
  );
};

export default Home;
