import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const StaffBarChart = ({ breakdown }) => {
    const data = {
        labels: breakdown.map((d) => `Day ${d.day}`),
        datasets: [
            {
            label: "Recommended Staff",
            data: breakdown.map((d) => d.recommended_staff || 0),
            backgroundColor: "green"
            }
        ]
    };
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>👨‍🍳 Daily Recommended Staff</h3>
      <Bar data={data} />
    </div>
  )
}

export default StaffBarChart