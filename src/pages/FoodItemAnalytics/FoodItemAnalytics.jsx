import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodItemAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-12");
  const [data, setData] = useState([]);

  useEffect(() => {
    const monthNum = parseInt(selectedMonth.split("-")[1]);

    axios
      .post("http://localhost:5001/api/forecast/dish-wise", { month: monthNum },)
      .then((res) => setData(res.data))
      .catch((err) =>
        console.error("Failed to fetch dish-wise predictions:", err)
      );
  }, [selectedMonth]);

  const getStatusLabel = (sales, wasteRatio) => {
    if (wasteRatio > 25) return "🔴 High Waste";
    if (sales < 100) return "🟡 Low Demand";
    return "✅ Excellent";
  };

  return (
    <div className="insights-page">
      <h2>🍽️ Food Item AI Forecast</h2>

      <label style={{ fontWeight: "bold", fontSize: "1rem" }}>
        Select Month:
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ marginLeft: "1rem" }}
        />
      </label>

      {data.length > 0 ? (
        <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
          {data.map((item, idx) => (
            <div key={idx} className="card" style={{
              background: "#f6f6f6",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 0 8px rgba(0,0,0,0.05)",
              minWidth: "200px"
            }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{item.name}</h4>
              <p>📈 <strong>Predicted Sales:</strong> {item.predicted_sales}</p>
              <p>🗑️ <strong>Predicted Waste:</strong> {item.predicted_waste}</p>
              <p>📊 <strong>Waste Ratio:</strong> {item.waste_ratio}%</p>
              <p><strong>Status:</strong> {getStatusLabel(item.predicted_sales, item.waste_ratio)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "2rem" }}>Loading AI predictions...</p>
      )}
    </div>
  );
};

export default FoodItemAnalytics;
