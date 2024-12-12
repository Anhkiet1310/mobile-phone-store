import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("https://localhost:7295/api/VnPay");
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div
      className="container mt-4 p-4 shadow-sm"
      style={{
        background: "linear-gradient(to bottom, #cfd9df, #e2ebf0, #f0f7fc, #ffffff)",
        borderRadius: "15px",
        color: "#333",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: "bold",
          color: "#2a9d8f",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Manage Payments
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
            backgroundColor: "#2a9d8f",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={payment.paymentId}
              style={{
                textAlign: "center",
                backgroundColor: index % 2 === 0 ? "#fff" : "#f7f7f7",
              }}
            >
              <td
                style={{
                  fontWeight: "bold",
                  color: "#2c3e50",
                }}
              >
                {payment.paymentId}
              </td>
              <td style={{ color: "#2980b9" }}>{payment.orderId}</td>
              <td style={{ color: "#27ae60" }}>
                {new Date(payment.paymentDate).toLocaleDateString()}
              </td>
              <td style={{ color: "#d35400", fontStyle: "italic" }}>
                {payment.paymentMethod}
              </td>
              <td
                style={{
                  color: "#f39c12",
                  fontWeight: "bold",
                }}
              >
                ${((payment.amountPaid || 0) / 1000).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayments;
