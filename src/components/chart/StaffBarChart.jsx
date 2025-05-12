import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StaffBarChart = ({ breakdown = [] }) => {
  const data = {
    labels: breakdown.map((d) => `Day ${d.day}`),
    datasets: [
      {
        label: "Recommended Staff",
        data: breakdown.map((d) => d.predicted_staff ?? 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 16,
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
          label: (context) => `${context.parsed.y} staff members`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Staff",
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>👨‍🍳 Daily Recommended Staff</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StaffBarChart;
