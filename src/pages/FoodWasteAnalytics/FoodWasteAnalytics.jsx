import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const FoodWasteAnalytics = () => {
  const [forecast, setForecast] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    axios.post("http://localhost:5000/api/forecast/month", { month })
      .then(res => setForecast(res.data))
      .catch(err => console.error("Failed to fetch forecast", err));
  }, [month]);

  const wasteChartData = forecast ? {
    labels: forecast.breakdown.map(d => `Day ${d.day}`),
    datasets: [
      {
        label: "Predicted Food Waste (kg)",
        data: forecast.breakdown.map(d => d.predicted_food_waste ?? 0),
        borderWidth: 2,
        borderColor: "crimson",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        pointRadius: 4,
        tension: 0.3,
        fill: true,
      },
    ],
  } : null;

  return (
    <div className="waste-page">
      <h2>🗑️ Food Waste Analytics</h2>

      <p>
        View daily predicted food waste (in kilograms) for a selected month.
        This helps you plan smarter and reduce avoidable over-prep or spoilage.
      </p>

      <label>
        Select Month:{" "}
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
      </label>

      {forecast && (
        <>
          <div className="summary">
            <p><strong>Total Waste:</strong> {forecast.total_food_waste} kg</p>
            <p><strong>Average Daily Waste:</strong> {forecast.avg_daily_waste} kg</p>
          </div>

          <div className="chart-container" style={{ marginTop: "2rem" }}>
            <h4>📊 Daily Waste Trend</h4>
            <Line data={wasteChartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default FoodWasteAnalytics;
