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
import './WasteLineChart.css';

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

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()} kg`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Waste in kg",
        },
        ticks: {
          callback: (value) => `${value} kg`,
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
    <div className="waste-chart-wrapper" style={{ height: "350px", width:"100%", position:"relative"}}>
      <Line data={data} options={options}/>
    </div>
  );
};

export default WasteLineChart;
