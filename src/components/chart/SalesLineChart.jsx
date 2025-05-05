import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SalesLineChart = ({ breakdown = [] }) => {
  const data = {
    labels: breakdown.map((d) => `Day ${d.day}`),
    datasets: [
      {
        label: "Predicted Sales (Rs)",
        data: breakdown.map((d) => d.predicted_sales ?? 0),
        borderColor: "royalblue",
        backgroundColor: "rgba(65, 105, 225, 0.1)",
        pointRadius: 4,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Rs. ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales in LKR",
        },
        ticks: {
          callback: (value) => `Rs. ${value}`,
        },
      },
      x: {
        title: {
          display: true,
          text: "Day of Month",
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📈 Daily Sales Forecast</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesLineChart;
