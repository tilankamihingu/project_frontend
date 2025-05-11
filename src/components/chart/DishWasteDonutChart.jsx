import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import './DishWasteDonutChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const colorSet = ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f"];

const DishWasteDonutChart = ({ selectedMonth }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const monthNum = parseInt(selectedMonth.split("-")[1]);
    axios
      .post("http://localhost:5001/api/forecast/dish-wise", { month: monthNum })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch waste data:", err));
  }, [selectedMonth]);

  const labels = data.map((d) => d.name);
  const values = data.map((d) => d.predicted_waste);
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
    <div className="dish-wise-waste-main-wrapper">
      <div className="donut-wrapper">
      <Doughnut data={chartData} options={{
        cutout: "70%",
        plugins: { legend: { display: false } }
      }} />
      </div>
      <div className="labels-wrapper">
      {labels.map((label, i) => {
            const pct = ((values[i] / total) * 100).toFixed(1);
            return (
              <div className="label-wrapper" key={i}>
                <div className="label-inside-wrapper" style={{ backgroundColor: colorSet[i]}} />
                {label} — {pct}%
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DishWasteDonutChart;
