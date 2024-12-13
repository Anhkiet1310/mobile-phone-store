import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch users
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch orders by user ID
  const fetchOrdersByUserId = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7295/odata/Order/get-order-by-id-user/${id}`
      );
      setOrders(response.data);
      setSelectedUser(users.find((user) => user.userId === id));
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Unable to fetch orders for the selected user.");
    }
  };

  return (
    <div
      className="container mt-4 p-4 shadow-lg"
      style={{
        background: "linear-gradient(to bottom, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)",
        borderRadius: "15px",
        color: "#333",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: "bold",
          color: "#5e4ae3",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Manage Users
      </h2>

      <table
        className="table table-bordered table-hover"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <thead
          style={{
            backgroundColor: "#5e4ae3",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.userId}
              style={{
                textAlign: "center",
                backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#fff",
              }}
            >
              <td
                style={{
                  fontWeight: "bold",
                  color: "#4a47a3",
                }}
              >
                {user.userId}
              </td>
              <td>
                <img
                  src={user.image}
                  alt={user.fullName}
                  className="img-fluid rounded-circle shadow"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    border: "3px solid #5e4ae3",
                  }}
                />
              </td>
              <td style={{ fontStyle: "italic", color: "#5e4ae3" }}>{user.userName}</td>
              <td style={{ color: "#4a47a3" }}>{user.fullName}</td>
              <td style={{ color: "#ff6b6b" }}>{user.email}</td>
              <td style={{ color: "#1c7947" }}>{user.address}</td>
              <td style={{ color: "#ffa41b" }}>{user.phoneNumber}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => fetchOrdersByUserId(user.userId)}
                >
                  View Orders
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for User Orders */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Orders for {selectedUser?.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="p-3 mb-3 border rounded"
                style={{
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h5>Order ID: {order.orderId}</h5>
                <p>Total Amount: {order.totalAmount} VND</p>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Items:</p>
                {order.orderDetails.map((detail) => (
                  <div key={detail.orderDetailId} className="p-2 mb-2">
                    <img
                      src={detail.image}
                      alt="Phone"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <p>Phone ID: {detail.phoneId}</p>
                    <p>Unit Price: {detail.unitPrice} VND</p>
                    <p>Quantity: {detail.quantity}</p>
                    <p>Warranty: {detail.warrantyPeriod || "N/A"}</p>
                    <ul>
                      {detail.phoneItems.map((item) => (
                        <li key={item.phoneItemId}>
                          Serial: {item.serialNumber}, Status: {item.status}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No orders available for this user.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;
