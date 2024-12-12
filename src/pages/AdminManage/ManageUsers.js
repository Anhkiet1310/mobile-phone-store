import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

  return (
    <div
      className="container mt-4 p-4 shadow-sm"
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
