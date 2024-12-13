import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For showing order details
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const handleViewDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `https://localhost:7295/odata/Order/${orderId}`
      );
      setSelectedOrder(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

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
            <th>Total Amount (VND)</th>
            <th>Details</th>
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
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalAmount)}
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewDetails(order.orderId)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing order details */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>User ID:</strong> {selectedOrder.userId}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total Amount:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(selectedOrder.totalAmount)}
              </p>

              <h5>Order Items:</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Phone Image</th>
                    <th>Phone ID</th>
                    <th>Quantity</th>
                    <th>Unit Price (VND)</th>
                    <th>Warranty (Months)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderDetails.map((detail) => (
                    <tr key={detail.orderDetailId}>
                      <td>
                        <img
                          src={detail.image}
                          alt={`Phone ${detail.phoneId}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{detail.phoneId}</td>
                      <td>{detail.quantity}</td>
                      <td>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(detail.unitPrice)}
                      </td>
                      <td>{detail.warrantyPeriod || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageOrders;
