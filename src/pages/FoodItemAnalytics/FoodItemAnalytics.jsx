// src/pages/FoodItemAnalytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodItemAnalytics = () => {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/analytics/food")
//       .then(res => setData(res.data))
//       .catch(err => console.error("Failed to fetch analytics:", err));
//   }, []);

  const [selectedMonth, setSelectedMonth] = useState("2025-12");

    useEffect(() => {
    const monthNum = parseInt(selectedMonth.split("-")[1]);
    axios.post("http://localhost:5000/api/analytics/food", { month: monthNum })
        .then(res => setData(res.data))
        .catch(err => console.error("Failed to fetch analytics:", err));
    }, [selectedMonth]);

  return (
    <div className="page-container">
        <h3>Select Month:</h3>
        <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{ marginBottom: "1rem" }}
        />

      <h2>🍽️ Food Item Performance</h2>
      <p>This table shows sales and waste per dish. Use it to find high-waste or low-performance items and optimize your menu.</p>

      {data.length > 0 ? (
        <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Total Sold</th>
              <th>Total Waste</th>
              <th>Cost Ratio (%)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              let status = "✅ Good";
              if (item.cost_ratio > 25) status = "🔴 High Waste";
              else if (item.total_sold < 100) status = "🟡 Low Sales";

              return (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.total_sold}</td>
                  <td>{item.total_waste}</td>
                  <td>{item.cost_ratio}%</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Loading food analytics...</p>
      )}
    </div>
  );
};

export default FoodItemAnalytics;
