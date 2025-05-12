import React, { useState, useEffect } from "react";
import axios from "axios";
import { exportForecastToPDF } from "../../utils/exportForecastToPDF";
import './Waste.css'; 

const Waste = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-08");
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const monthNumber = parseInt(selectedMonth.split("-")[1]);
    axios
      .post("http://localhost:5001/api/forecast/month", { month: monthNumber })
      .then((res) => setForecast(res.data))
      .catch((err) => console.error("Error fetching forecast:", err));
  }, [selectedMonth]);

  if (!forecast || !forecast.breakdown) return <p>No forecast data available.</p>;

  const rows = forecast.breakdown.map(entry => ({
    date: entry.date,
    dish: entry.dish_name,
    waste: parseFloat(entry.predicted_waste.toFixed(2)),
    sales: Math.round(entry.predicted_sales),
    price: parseFloat(entry.predicted_price.toFixed(2)),
  }));

  return (
    <div className="sales-page-main-wrapper">
      <div className="top-wrapper">
        <div className="left-side">
          <div className="top-heading-wrapper">Waste Overview</div>
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

      <div className="table-page-wrapper">
        <h2>Dish-wise Waste Details</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Dish Name</th>
              <th>Predicted Waste (kg)</th>
              <th>Predicted Sales</th>
              <th>Predicted Price</th>
              <th>Predicted Loss (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.dish}</td>
                <td>{row.waste} kg</td>
                <td>{row.sales}</td>
                <td>Rs. {row.price.toFixed(2)}</td>
                <td>Rs. {(row.waste * row.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Waste;
