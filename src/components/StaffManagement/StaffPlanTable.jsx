import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffPlanTable = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaffData = async (month) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/staff");
      const filtered = response.data.filter((entry) => {
        const entryMonth = new Date(entry.date).getMonth() + 1;
        return entryMonth === month;
      });
      setStaffData(filtered);
    } catch (err) {
      console.error("Failed to load staff data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData(month);
  }, [month]);

  const handleActualChange = (index, value) => {
    const updated = [...staffData];
    updated[index].actualStaff = Number(value);
    setStaffData(updated);
  };

  const handleSave = async (index) => {
    const record = staffData[index];
    try {
      await axios.put(`http://localhost:5000/api/staff/${record._id}`, {
        actualStaff: record.actualStaff
      });
      alert("✅ Actual staff saved successfully");
    } catch (err) {
      console.error("Failed to update actual staff:", err);
      alert("❌ Failed to save actual staff");
    }
  };

  return (
    <div className="staff-plan-table" style={{ padding: "1rem" }}>
      <p>
        📅 This page shows AI-predicted staff requirements for each day in the
        selected month. You can also enter the actual staff count you used.
      </p>

      <label htmlFor="month" style={{ fontWeight: "bold" }}>
        Select Month:
      </label>
      <select
        id="month"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        style={{ marginLeft: "0.5rem" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading staff plan...</p>
      ) : staffData.length === 0 ? (
        <p>No staff records found for this month.</p>
      ) : (
        <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Required Staff</th>
              <th>Actual Staff</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((entry, index) => {
              const status =
                entry.actualStaff == null
                  ? "Pending"
                  : entry.actualStaff < entry.requiredStaff
                  ? "🔺 Understaffed"
                  : "✅ OK";
              return (
                <tr key={entry._id}>
                  <td>{entry.date}</td>
                  <td>{entry.requiredStaff}</td>
                  <td>
                    <input
                      type="number"
                      value={entry.actualStaff ?? ""}
                      onChange={(e) => handleActualChange(index, e.target.value)}
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td>{status}</td>
                  <td>
                    <button onClick={() => handleSave(index)}>Save</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffPlanTable;
