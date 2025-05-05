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


const SalesLineChart = ({ breakdown }) => {
    const data = {
        labels: breakdown.map((d) => `Day ${d.day}`),
        datasets: [
            {
            label: "Predicted Sales (Rs)",
            data: breakdown.map((d) => d.predicted_sales),
            borderColor: "blue",
            fill: false,
            tension: 0.3
            }
        ]
    };
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📈 Daily Sales Forecast</h3>
      <Line data={data} />
    </div>
  )
}

export default SalesLineChart