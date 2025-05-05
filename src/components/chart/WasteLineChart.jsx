import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WasteLineChart = ({ breakdown = [] }) => {
  const data = {
    labels: breakdown.map((d) => `Day ${d.day}`),
    datasets: [
      {
        label: "Predicted Food Waste (kg)",
        data: breakdown.map((d) => d.predicted_food_waste ?? 0),
        borderColor: "crimson",
        backgroundColor: "rgba(220, 20, 60, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🗑️ Daily Food Waste Forecast</h3>
      <Line data={data} />
    </div>
  );
};

export default WasteLineChart;
