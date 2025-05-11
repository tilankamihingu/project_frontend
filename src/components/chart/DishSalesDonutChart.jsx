import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorSet = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

const DishSalesDonutChart = ({ selectedMonth }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selectedMonth || !selectedMonth.includes("-")) return;
  
    const monthNum = parseInt(selectedMonth.split("-")[1]);
  
    axios
      .post("http://localhost:5001/api/forecast/dish-wise", { month: monthNum })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch sales data:", err));
  }, [selectedMonth]); 

  const labels = data.map((d) => d.name);
  const values = data.map((d) => d.predicted_sales);
  const total = values.reduce((sum, val) => sum + val, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colorSet,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      padding: "1rem",
      maxWidth: "600px",
      width: "100%",
    }}>
      <h4>🍛 Dish-wise Sales</h4>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {labels.map((label, i) => {
            const pct = ((values[i] / total) * 100).toFixed(1);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
                <div style={{ width: 12, height: 12, backgroundColor: colorSet[i], marginRight: 8 }} />
                {label} — {pct}%
              </div>
            );
          })}
        </div>
        <div style={{ width: 200, height: 200 }}>
          <Doughnut data={chartData} options={{
            cutout: "70%",
            plugins: { legend: { display: false } }
          }} />
        </div>
      </div>
    </div>
  );
};

export default DishSalesDonutChart;
