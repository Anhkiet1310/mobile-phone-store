import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import PhoneItemsModal from "./PhoneItemsModal";

const ManageProducts = () => {
  const [activeTab, setActiveTab] = useState("phones");
  const [phones, setPhones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoneItems, setSelectedPhoneItems] = useState([]);

  // Fetch data for phones, brands, and models
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Phone");
        setPhones(response.data);
        console.log("Phones Response:", response.data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Brand");
        setBrands(response.data);
        console.log("Brands Response:", response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Model");
        setModels(response.data);
        console.log("Models Response:", response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchPhones();
    fetchBrands();
    fetchModels();
  }, []);

  const handleViewPhoneItems = (phoneItems) => {
    console.log("Selected Phone Items:", phoneItems);
    setSelectedPhoneItems(phoneItems);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Products</h2>

      {/* Tab Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-primary me-2 ${activeTab === "phones" ? "active" : ""}`}
          onClick={() => setActiveTab("phones")}
        >
          Manage Phones
        </button>
        <button
          className={`btn btn-success me-2 ${activeTab === "brands" ? "active" : ""}`}
          onClick={() => setActiveTab("brands")}
        >
          Manage Brands
        </button>
        <button
          className={`btn btn-warning ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
        >
          Manage Models
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "phones" && (
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Description</th>
              <th>Price (VND)</th>
              <th>Stock</th>
              <th>Chipset</th>
              <th>GPU</th>
              <th>Color</th>
              <th>Warranty (Months)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <tr key={phone.phoneId}>
                <td>
                  <img
                    src={phone.image}
                    alt={phone.description}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{phone.phoneId}</td>
                <td>{phone.description}</td>
                <td>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(phone.price)}
                </td>
                <td>{phone.stockQuantity}</td>
                <td>{phone.chipset}</td>
                <td>{phone.gpu}</td>
                <td>{phone.color}</td>
                <td>{phone.warrantyPeriod}</td>
                <td>
                  <i
                    id={`tooltip-${phone.phoneId}`}
                    className="fas fa-eye text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewPhoneItems(phone.phoneItems)}
                  ></i>
                  <Tooltip
                    anchorId={`tooltip-${phone.phoneId}`}
                    content="View Phone Items"
                    place="top"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "brands" && (
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Brand Name</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.brandId}>
                <td>{brand.brandId}</td>
                <td>{brand.brandName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "models" && (
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Model Name</th>
              <th>Brand</th>
              <th>Release Date</th>
              <th>Operating System</th>
              <th>RAM</th>
              <th>Storage</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => {
              const brand = brands.find((brand) => brand.brandId === model.brandId);
              return (
                <tr key={model.modelId}>
                  <td>{model.modelId}</td>
                  <td>{model.modelName}</td>
                  <td>{brand ? brand.brandName : "Unknown Brand"}</td>
                  <td>{model.releaseDate ? new Date(model.releaseDate).toLocaleDateString() : "N/A"}</td>
                  <td>{model.operatingSystem || "N/A"}</td>
                  <td>{model.ram ? `${model.ram} GB` : "N/A"}</td>
                  <td>{model.storage ? `${model.storage} GB` : "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal for Phone Items */}
      {showModal && (
        <PhoneItemsModal
          phoneItems={selectedPhoneItems}
          onClose={() => {
            console.log("Closing Modal");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ManageProducts;
