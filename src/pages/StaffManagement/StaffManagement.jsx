import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffPlanTable from "../../components/StaffManagement/StaffPlanTable";

const StaffManagement = () => {
//   const [forecast, setForecast] = useState(null);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);

//   useEffect(() => {
//     axios.post("http://localhost:5000/api/forecast/month", { month })
//       .then(res => setForecast(res.data))
//       .catch(err => console.error("Failed to fetch forecast", err));
//   }, [month]);
  return (
    <div className="page-container">
      <h1>👨‍🍳 Staff Management</h1>
      <StaffPlanTable />
    </div>
    // <div className="staff-management-page">
    //   <h2>👥 Staff Management & Optimization</h2>

    //   <label>Select Month:
    //     <input
    //       type="number"
    //       min="1"
    //       max="12"
    //       value={month}
    //       onChange={(e) => setMonth(Number(e.target.value))}
    //     />
    //   </label>

    //   {forecast && (
    //     <table className="staff-table">
    //       <thead>
    //         <tr>
    //           <th>Day</th>
    //           <th>Predicted Sales</th>
    //           <th>Recommended Staff</th>
    //           <th>Actual Staff (Simulated)</th>
    //           <th>Status</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {forecast.breakdown.map((d, idx) => {
    //           const actualStaff = 10 + (idx % 5); // Simulate current plan
    //           const recommended = d.recommended_staff || 0;
    //           const status = actualStaff < recommended ? "🔺 Understaffed" : "✅ OK";

    //           return (
    //             <tr key={idx}>
    //               <td>Day {d.day}</td>
    //               <td>{d.predicted_sales}</td>
    //               <td>{recommended}</td>
    //               <td>{actualStaff}</td>
    //               <td>{status}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  )
}

export default StaffManagement