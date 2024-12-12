import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any other session data
    localStorage.removeItem("accessToken");
    // Navigate to login or home page
    navigate("/signin");
  };

  return (
    <div
      className="d-flex flex-column p-3 shadow"
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #4e54c8, #8f94fb)",
        color: "#ffffff",
      }}
    >
      <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
        Admin Panel
      </h2>
      <ul className="nav nav-pills flex-column mb-auto">
        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "active text-dark bg-white shadow-sm" : "text-white"
              }`
            }
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            <FaTachometerAlt size={20} />
            Dashboard
          </NavLink>
        </li>

        {/* Manage Users */}
        <li>
          <NavLink
            to="/manage-users"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "active text-dark bg-white shadow-sm" : "text-white"
              }`
            }
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            <FaUsers size={20} />
            Manage Users
          </NavLink>
        </li>

        {/* Manage Products */}
        <li>
          <NavLink
            to="/manage-products"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "active text-dark bg-white shadow-sm" : "text-white"
              }`
            }
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            <FaBoxOpen size={20} />
            Manage Products
          </NavLink>
        </li>

        {/* Manage Orders */}
        <li>
          <NavLink
            to="/manage-orders"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "active text-dark bg-white shadow-sm" : "text-white"
              }`
            }
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            <FaClipboardList size={20} />
            Manage Orders
          </NavLink>
        </li>

        {/* Manage Payments */}
        <li>
          <NavLink
            to="/manage-payments"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "active text-dark bg-white shadow-sm" : "text-white"
              }`
            }
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            <FaMoneyCheckAlt size={20} />
            Manage Payments
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn d-flex align-items-center gap-2 w-100"
          style={{
            backgroundColor: "#ff6b6b",
            color: "#ffffff",
            borderRadius: "10px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          <FaSignOutAlt size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
