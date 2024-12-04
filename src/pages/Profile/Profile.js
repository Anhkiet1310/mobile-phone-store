import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/signin"); // Redirect to signin if token does not exist
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      // Fetch user data from the API
      fetch(`https://localhost:7295/odata/Users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/signin"); // Redirect to signin on error
        });
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/signin"); // Redirect to signin if token is invalid
    }
  }, [navigate]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[400px]">
        <div className="flex items-center justify-center mb-6">
          <img
            className="w-24 h-24 rounded-full object-cover shadow-md"
            src={userData.image}
            alt="Profile"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          {userData.fullName}
        </h1>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="text-gray-800">Username:</strong> {userData.userName}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Email:</strong> {userData.email}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Phone Number:</strong>{" "}
            {userData.phoneNumber || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Address:</strong>{" "}
            {userData.address || "N/A"}
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/signin");
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
