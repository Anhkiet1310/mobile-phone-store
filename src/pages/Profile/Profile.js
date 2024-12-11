import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    image: "",
    address: "",
    phoneNumber: "",
  });
  const [uploading, setUploading] = useState(false);
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
          setEditForm({
            fullName: data.fullName,
            image: data.image,
            address: data.address,
            phoneNumber: data.phoneNumber,
          });
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

  const handleEditProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !userData) return;

    try {
      const response = await fetch(
        `https://localhost:7295/odata/Users/edit-profile/${userData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        window.location.reload(); // Reload the page on successful update
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://localhost:7295/api/UploadFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setEditForm({ ...editForm, image: data.downloadUrl }); // Set the uploaded image URL
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

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
            src={userData.image || "https://via.placeholder.com/150?text=Anonymous"}
            alt="Profile"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Anonymous";
            }}
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
          onClick={() => setIsEditing(true)}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Edit Profile
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[400px] h-auto mt-20">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Profile</h2>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  placeholder="Enter your full name"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Profile Image
                </label>
                <input
                  className="w-full p-2 border rounded"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  placeholder="Enter your address"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  placeholder="Enter your phone number"
                  value={editForm.phoneNumber}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
