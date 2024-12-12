import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Order");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      className="container mt-4 p-4 shadow-sm"
      style={{
        background: "linear-gradient(to bottom, #ffecd2, #fcb69f, #ff9a9e, #fad0c4)",
        borderRadius: "15px",
        color: "#333",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: "bold",
          color: "#d65d0e",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Manage Orders
      </h2>
      <table
        className="table table-hover table-bordered"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <thead
          style={{
            backgroundColor: "#d65d0e",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.orderId}
              style={{
                textAlign: "center",
                backgroundColor: index % 2 === 0 ? "#fff" : "#f7f7f7",
              }}
            >
              <td
                style={{
                  fontWeight: "bold",
                  color: "#e74c3c",
                }}
              >
                {order.orderId}
              </td>
              <td style={{ color: "#3498db" }}>{order.userId}</td>
              <td style={{ color: "#27ae60" }}>
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td
                style={{
                  color: order.status === "Completed" ? "#27ae60" : "#e74c3c",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </td>
              <td style={{ color: "#f39c12" }}>
                ${((order.totalAmount || 0) / 1000).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
