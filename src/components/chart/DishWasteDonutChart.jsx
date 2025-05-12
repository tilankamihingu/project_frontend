import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import './DishWasteDonutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const colorSet = ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#252529", "#808080","rgb(243, 19, 19)","#1a1a1a", "blue"];

const DishWasteDonutChart = ({ forecast }) => {
  if (!forecast || !forecast.breakdown) return null;

  // Aggregate waste by dish
  const wasteByDish = new Map();
  forecast.breakdown.forEach(entry => {
    if (!wasteByDish.has(entry.dish_name)) {
      wasteByDish.set(entry.dish_name, 0);
    }
    wasteByDish.set(entry.dish_name, wasteByDish.get(entry.dish_name) + (entry.predicted_waste ?? 0));
  });

  const labels = Array.from(wasteByDish.keys());
  const values = Array.from(wasteByDish.values());
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
        <Doughnut
          data={chartData}
          options={{
            cutout: "70%",
            plugins: { legend: { display: false } },
          }}
        />
      </div>
      <div className="labels-wrapper">
        {labels.map((label, i) => {
          const pct = ((values[i] / total) * 100).toFixed(1);
          return (
            <div className="label-wrapper" key={i}>
              <div
                className="label-inside-wrapper"
                style={{ backgroundColor: colorSet[i] }}
              />
              {label} — {pct}%
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishWasteDonutChart;
