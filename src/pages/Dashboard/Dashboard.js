import React, { useState, useEffect } from "react";
import { FaUsers, FaMobileAlt, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    phones: 0,
    orders: 0,
    successfulPayments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse, phonesResponse, ordersResponse, paymentsResponse] = await Promise.all([
          axios.get("https://localhost:7295/odata/Users"),
          axios.get("https://localhost:7295/odata/Phone/details"),
          axios.get("https://localhost:7295/odata/Order"),
          axios.get("https://localhost:7295/api/VnPay"),
        ]);

        setStats({
          users: usersResponse.data.length,
          phones: phonesResponse.data.length,
          orders: ordersResponse.data.length,
          successfulPayments: paymentsResponse.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        background: "linear-gradient(to right, #1e3c72, #2a5298, #4b6cb7, #6190e8)",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Admin Dashboard</h1>
        <p className="lead">
          Welcome to the admin dashboard. <br /> Manage the system efficiently with real-time insights.
        </p>
      </div>
      <div className="container">
        <div className="row g-4">
          {/* Users Card */}
          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 shadow-sm text-center h-100"
              style={{ background: "#4e73df", color: "#fff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <FaUsers size={50} className="mb-3" />
                <h5 className="card-title">Users</h5>
                <p className="card-text display-6">{stats.users}</p>
              </div>
            </div>
          </div>

          {/* Phones Card */}
          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 shadow-sm text-center h-100"
              style={{ background: "#1cc88a", color: "#fff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <FaMobileAlt size={50} className="mb-3" />
                <h5 className="card-title">Phones</h5>
                <p className="card-text display-6">{stats.phones}</p>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 shadow-sm text-center h-100"
              style={{ background: "#f6c23e", color: "#fff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <FaShoppingCart size={50} className="mb-3" />
                <h5 className="card-title">Orders</h5>
                <p className="card-text display-6">{stats.orders}</p>
              </div>
            </div>
          </div>

          {/* Successful Payments Card */}
          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 shadow-sm text-center h-100"
              style={{ background: "#e74a3b", color: "#fff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <FaCheckCircle size={50} className="mb-3" />
                <h5 className="card-title">Successful Payments</h5>
                <p className="card-text display-6">{stats.successfulPayments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
