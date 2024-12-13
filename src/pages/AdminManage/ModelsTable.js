import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ModelsTable = ({ models, brands, onAddModel, onEditModel, onDeleteModel }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentModel, setCurrentModel] = useState({});
    const [newModel, setNewModel] = useState({
        modelName: "",
        brandId: "",
        operatingSystem: "",
        ram: "",
        storage: "",
    });

    // Handle Edit button click
    const handleEditClick = (model) => {
        setCurrentModel(model);
        setShowEditModal(true);
    };

    // Handle Save Changes for editing a model
    const handleSaveChanges = () => {
        onEditModel(currentModel);
        setShowEditModal(false);
    };

    // Handle Save New Model
    const handleSaveNewModel = () => {
        onAddModel(newModel);
        setShowAddModal(false);
        setNewModel({
            modelName: "",
            brandId: "",
            operatingSystem: "",
            ram: "",
            storage: "",
        });
    };

    // Handle Delete button click
    const handleDeleteClick = (modelId) => {
        if (window.confirm("Are you sure you want to delete this model?")) {
            onDeleteModel(modelId);
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
            {/* Add New Models Button */}
            <div className="d-flex justify-content-end mb-3">
                <Button variant="light" onClick={() => setShowAddModal(true)} style={{ fontWeight: "bold", border: "2px solid #fff" }}>
                    Add New Model
                </Button>
            </div>

            <table
                className="table table-hover table-striped"
                style={{
                    border: "3px solid black", // Thicker border
                    backgroundColor: "transparent", // Ensure background gradient is visible
                    color: "#000",
                }}
            >
                <thead style={{ backgroundColor: "#4a6fa5", color: "#fff", borderBottom: "3px solid black" }}>
                    <tr>
                        <th style={{ border: "3px solid black" }}>ID</th>
                        <th style={{ border: "3px solid black" }}>Model Name</th>
                        <th style={{ border: "3px solid black" }}>Brand</th>
                        <th style={{ border: "3px solid black" }}>Release Date</th>
                        <th style={{ border: "3px solid black" }}>Operating System</th>
                        <th style={{ border: "3px solid black" }}>RAM</th>
                        <th style={{ border: "3px solid black" }}>Storage</th>
                        <th style={{ border: "3px solid black" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model, index) => {
                        const brand = brands.find((brand) => brand.brandId === model.brandId);
                        return (
                            <tr
                                key={model.modelId}
                                style={{ backgroundColor: index % 2 === 0 ? "#2a5298" : "#1e3c72", color: "#fff" }}
                            >
                                <td style={{ border: "3px solid black" }}>{model.modelId}</td>
                                <td style={{ border: "3px solid black" }}>{model.modelName}</td>
                                <td style={{ border: "3px solid black" }}>{brand ? brand.brandName : "Unknown Brand"}</td>
                                <td style={{ border: "3px solid black" }}>
                                    {model.releaseDate
                                        ? new Date(model.releaseDate).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td style={{ border: "3px solid black" }}>{model.operatingSystem || "N/A"}</td>
                                <td style={{ border: "3px solid black" }}>{model.ram ? `${model.ram} GB` : "N/A"}</td>
                                <td style={{ border: "3px solid black" }}>{model.storage ? `${model.storage} GB` : "N/A"}</td>
                                <td style={{ border: "3px solid black" }}>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEditClick(model)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(model.modelId)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal for Adding New Model */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#2a5298", color: "#fff" }}>
                    <Modal.Title>Add New Model</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#4e4376", color: "#fff" }}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Model Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter model name"
                                value={newModel.modelName}
                                onChange={(e) =>
                                    setNewModel({ ...newModel, modelName: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Operating System</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter operating system"
                                value={newModel.operatingSystem}
                                onChange={(e) =>
                                    setNewModel({ ...newModel, operatingSystem: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>RAM (GB)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter RAM size"
                                value={newModel.ram}
                                onChange={(e) =>
                                    setNewModel({ ...newModel, ram: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Storage (GB)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter storage size"
                                value={newModel.storage}
                                onChange={(e) =>
                                    setNewModel({ ...newModel, storage: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Select
                                value={newModel.brandId}
                                onChange={(e) =>
                                    setNewModel({ ...newModel, brandId: Number(e.target.value) })
                                }
                            >
                                <option value="" disabled>
                                    Select a Brand
                                </option>
                                {brands.map((brand) => (
                                    <option key={brand.brandId} value={brand.brandId}>
                                        {brand.brandName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#2a5298" }}>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveNewModel}
                        disabled={
                            !newModel.modelName.trim() ||
                            !newModel.brandId ||
                            !newModel.ram ||
                            !newModel.storage
                        }
                    >
                        Add Model
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Editing Model */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#2a5298", color: "#fff" }}>
                    <Modal.Title>Edit Model</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#4e4376", color: "#fff" }}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Model Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentModel.modelName || ""}
                                onChange={(e) =>
                                    setCurrentModel({ ...currentModel, modelName: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Operating System</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentModel.operatingSystem || ""}
                                onChange={(e) =>
                                    setCurrentModel({ ...currentModel, operatingSystem: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>RAM (GB)</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentModel.ram || ""}
                                onChange={(e) =>
                                    setCurrentModel({ ...currentModel, ram: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Storage (GB)</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentModel.storage || ""}
                                onChange={(e) =>
                                    setCurrentModel({ ...currentModel, storage: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Select
                                value={currentModel.brandId || ""}
                                onChange={(e) =>
                                    setCurrentModel({ ...currentModel, brandId: Number(e.target.value) })
                                }
                            >
                                <option value="" disabled>
                                    Select a Brand
                                </option>
                                {brands.map((brand) => (
                                    <option key={brand.brandId} value={brand.brandId}>
                                        {brand.brandName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#2a5298" }}>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveChanges}
                        disabled={!currentModel.modelName?.trim()}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModelsTable;