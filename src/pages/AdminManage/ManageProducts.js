import React, { useState, useEffect } from "react";
import axios from "axios";
import PhonesTable from "./PhonesTable";
import BrandsTable from "./BrandsTable";
import ModelsTable from "./ModelsTable";
import PhoneItemsModal from "./PhoneItemsModal";

const ManageProducts = () => {
  const [activeTab, setActiveTab] = useState("phones");
  const [phones, setPhones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoneItems, setSelectedPhoneItems] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Phone");
        setPhones(response.data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axios.get("https://localhost:7295/odata/Model");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchPhones();
    fetchBrands();
    fetchModels();
  }, []);

  const handleViewPhoneItems = (phoneItems) => {
    setSelectedPhoneItems(phoneItems);
    setShowModal(true);
  };

  const addBrand = async (newBrand) => {
    try {
      const response = await axios.post("https://localhost:7295/odata/Brand", newBrand, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBrands((prevBrands) => [...prevBrands, response.data]);
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  const editBrand = async (updatedBrand) => {
    try {
      await axios.put(
        `https://localhost:7295/odata/Brand/${updatedBrand.brandId}`,
        updatedBrand,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.brandId === updatedBrand.brandId ? updatedBrand : brand
        )
      );
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  const addModel = async (newModel) => {
    try {
      const response = await axios.post("https://localhost:7295/odata/Model", newModel, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setModels((prevModels) => [...prevModels, response.data]);
    } catch (error) {
      console.error("Error adding model:", error);
    }
  };

  const deleteBrand = async (brandId) => {
    try {
      await axios.delete(`https://localhost:7295/odata/Brand/${brandId}`);
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand.brandId !== brandId)
      );
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const deleteModel = async (modelId) => {
    try {
      await axios.delete(`https://localhost:7295/odata/Model/${modelId}`);
      setModels((prevModels) => prevModels.filter((model) => model.modelId !== modelId));
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  const editModel = async (updatedModel) => {
    try {
      await axios.put(
        `https://localhost:7295/odata/Model/${updatedModel.modelId}`,
        updatedModel,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setModels((prevModels) =>
        prevModels.map((model) =>
          model.modelId === updatedModel.modelId ? updatedModel : model
        )
      );
    } catch (error) {
      console.error("Error editing model:", error);
    }
  };

  const addPhone = async (newPhone) => {
    try {
      const response = await axios.post("https://localhost:7295/odata/Phone", newPhone, {
        headers: { "Content-Type": "application/json" },
      });
      setPhones((prevPhones) => [...prevPhones, response.data]); // Add new phone to the state
    } catch (error) {
      console.error("Error adding phone:", error);
    }
  };

  const onAddPhoneItem = async (newItem) => {
    try {
      // Construct the payload
      const payload = {
        phoneId: Number(newItem.phoneId), // Ensure phoneId is a number
        serialNumber: newItem.serialNumber.trim(), // Ensure serialNumber is a trimmed string
      };

      // Make the POST request
      const response = await axios.post("https://localhost:7295/odata/PhoneItem/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Phone item added successfully:", response.data);
      alert("Phone item added successfully!");
    } catch (error) {
      console.error("Error adding phone item:", error.response?.data || error.message);
      alert("Failed to add phone item. Please check the input and try again.");
    }
  };

  const editPhone = async (updatedPhone) => {
    try {
      await axios.put(`https://localhost:7295/odata/Phone/${updatedPhone.phoneId}`, updatedPhone, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPhones((prevPhones) =>
        prevPhones.map((phone) =>
          phone.phoneId === updatedPhone.phoneId ? updatedPhone : phone
        )
      );
      alert("Phone updated successfully!");
    } catch (error) {
      console.error("Error updating phone:", error);
      alert("Failed to update phone. Please try again.");
    }
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
        <PhonesTable phones={phones} onViewPhoneItems={handleViewPhoneItems} onAddPhone={addPhone} onAddPhoneItem={onAddPhoneItem} onEditPhone={editPhone}/>
      )}
      {activeTab === "brands" && <BrandsTable brands={brands} onAddBrand={addBrand} onEditBrand={editBrand} onDeleteBrand={deleteBrand} />}
      {activeTab === "models" && <ModelsTable models={models} brands={brands} onDeleteModel={deleteModel} onEditModel={editModel} onAddModel={addModel}/>}

      {/* Modal for Phone Items */}
      {showModal && (
        <PhoneItemsModal
          phoneItems={selectedPhoneItems}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageProducts;
