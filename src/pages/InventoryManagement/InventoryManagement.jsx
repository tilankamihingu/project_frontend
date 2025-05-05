import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [forecast, setForecast] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    axios.post("http://localhost:5000/api/forecast/month", { month })
      .then(res => setForecast(res.data))
      .catch(err => console.error("Forecast fetch failed", err));
  }, [month]);

  return (
    <div className="inventory-page">
      <h2>📦 Inventory Management</h2>

      <label>Select Month:
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
      </label>

      {forecast && (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Predicted Sales</th>
              <th>Inventory Required</th>
              <th>Current Inventory (Simulated)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {forecast.breakdown.map((d, idx) => {
              const predictedSales = d.predicted_sales || 0;
              const requiredInventory = Math.ceil(predictedSales / 10); // rule: 10 units per Rs. 1,000
              const currentInventory = 300 + (idx % 5) * 20; // simulate

              const status = currentInventory < requiredInventory
                ? "⚠️ Low Stock"
                : "✅ OK";

              return (
                <tr key={idx}>
                  <td>Day {d.day}</td>
                  <td>{predictedSales}</td>
                  <td>{requiredInventory}</td>
                  <td>{currentInventory}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default InventoryManagement