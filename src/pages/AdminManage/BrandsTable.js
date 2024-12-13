import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const BrandsTable = ({ brands, onAddBrand, onEditBrand, onDeleteBrand }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState({});
  const [newBrandName, setNewBrandName] = useState("");

  const handleEditClick = (brand) => {
    setCurrentBrand(brand);
    setShowEditModal(true);
  };

  const handleEditBrand = () => {
    onEditBrand(currentBrand);
    setShowEditModal(false);
  };

  const handleAddBrand = () => {
    onAddBrand({ brandName: newBrandName });
    setShowAddModal(false);
    setNewBrandName("");
  };

  const handleDeleteClick = (brandId) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      onDeleteBrand(brandId);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(45deg, #1e3c72, #2a5298, #2b5876, #4e4376)",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h4 className="mb-3 text-center">Manage Brands</h4>

      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="light"
          onClick={() => setShowAddModal(true)}
          style={{ fontWeight: "bold", border: "2px solid #fff" }}
        >
          Add New Brand
        </Button>
      </div>

      <table
        className="table table-hover table-striped table-bordered text-center"
        style={{
          border: "3px solid black",
          backgroundColor: "transparent",
          color: "#fff",
        }}
      >
        <thead style={{ backgroundColor: "#4a6fa5", color: "#fff", borderBottom: "3px solid black" }}>
          <tr>
            <th style={{ border: "3px solid black" }}>ID</th>
            <th style={{ border: "3px solid black" }}>Brand Name</th>
            <th style={{ border: "3px solid black" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr
              key={brand.brandId}
              style={{ backgroundColor: index % 2 === 0 ? "#2a5298" : "#1e3c72", color: "#fff" }}
            >
              <td style={{ border: "3px solid black" }}>{brand.brandId}</td>
              <td style={{ border: "3px solid black" }}>{brand.brandName}</td>
              <td style={{ border: "3px solid black" }}>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(brand)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(brand.brandId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2a5298", color: "#fff" }}>
          <Modal.Title>Add New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#4e4376", color: "#fff" }}>
          <Form>
            <Form.Group>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2a5298" }}>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddBrand}
            disabled={!newBrandName.trim()}
          >
            Add Brand
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2a5298", color: "#fff" }}>
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#4e4376", color: "#fff" }}>
          <Form>
            <Form.Group>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                value={currentBrand.brandName || ""}
                onChange={(e) =>
                  setCurrentBrand({ ...currentBrand, brandName: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2a5298" }}>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleEditBrand}
            disabled={!currentBrand.brandName?.trim()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BrandsTable;
