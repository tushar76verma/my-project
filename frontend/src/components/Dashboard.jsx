import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ token }) {
  const [summary, setSummary] = useState(null);
  const [chart, setChart] = useState([]);
  const [table, setTable] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/summary/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSummary(res.data))
      .catch(() => setError("Error fetching summary"));

    axios
      .get("http://127.0.0.1:8000/api/chart/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChart(res.data))
      .catch(() => setError("Error fetching chart"));
 
    axios
      .get("http://127.0.0.1:8000/api/table/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTable(res.data))
      .catch(() => setError("Error fetching table"));

    setLastUpdated(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!summary) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        style={{
          float: "right",
          background: "#e74c3c",
          color: "white",
          padding: "10px 14px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>Colorful Dashboard</h1>

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ {error}
        </p>
      )}

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            color: "white",
            padding: "20px",
            flex: 1,
            borderRadius: "12px",
            boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Total Sales</h3>
          <h2>{summary.total_sales}</h2>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1dd1a1, #10ac84)",
            color: "white",
            padding: "20px",
            flex: 1,
            borderRadius: "12px",
            boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Total Orders</h3>
          <h2>{summary.total_orders}</h2>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "white",
            padding: "20px",
            flex: 1,
            borderRadius: "12px",
            boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Inventory</h3>
          <h2>152</h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "15px",
            border: "2px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px" }}
        >
          <option>All</option>
          <option>Cat1</option>
          <option>Cat2</option>
          <option>Cat3</option>
        </select>
      </div>

      {/* Chart */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Sales Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chart}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ff4b2b"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

        <p style={{ marginTop: "10px", color: "gray" }}>
          🔄 Last Updated: <b>{lastUpdated}</b>
        </p>
      </div>

      {/* Table */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Sales Details</h3>

        <table width="100%" cellPadding="8" style={{ marginTop: "10px" }}>
          <thead>
            <tr
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                color: "white",
              }}
            >
              <th>Date</th>
              <th>Product</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {table
              .filter(
                (row) =>
                  (filter === "All" || row.category === filter) &&
                  row.product.toLowerCase().includes(search.toLowerCase())
              )
              .map((row, index) => (
                <tr key={index} style={{ background: index % 2 ? "#f9f9f9" : "#fff" }}>
                  <td>{row.date}</td>
                  <td>{row.product}</td>
                  <td>{row.category}</td>
                  <td style={{ color: "#10ac84", fontWeight: "bold" }}>
                    {row.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
