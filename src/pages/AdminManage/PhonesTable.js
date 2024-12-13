import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const PhonesTable = ({ phones = [], onViewPhoneItems, onAddPhone, onAddPhoneItem, onEditPhone }) => {
    const [showAddPhoneModal, setShowAddPhoneModal] = useState(false);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [showEditPhoneModal, setShowEditPhoneModal] = useState(false);
    const [editPhone, setEditPhone] = useState(null);

    const [newPhone, setNewPhone] = useState({
        modelId: "",
        description: "",
        price: "",
        stockQuantity: "",
        image: "",
        chipset: "",
        gpu: "",
        color: "",
        warrantyPeriod: "",
    });
    const [newPhoneItem, setNewPhoneItem] = useState({
        phoneId: "",
        serialNumber: "",
    });

    const [selectedPhoneId, setSelectedPhoneId] = useState(null);

    // Handle Add Phone
    const handleAddPhone = () => {
        onAddPhone(newPhone);
        setShowAddPhoneModal(false);
        setNewPhone({
            modelId: "",
            description: "",
            price: "",
            stockQuantity: "",
            image: "",
            chipset: "",
            gpu: "",
            color: "",
            warrantyPeriod: "",
        });
    };

    // Handle Add Phone Item
    const handleAddPhoneItem = () => {
        onAddPhoneItem({ phoneId: selectedPhoneId, ...newPhoneItem });
        setShowAddItemModal(false);
        setNewPhoneItem({ phoneId: "", serialNumber: "" });
    };

    const handleEditPhone = (phone) => {
        setEditPhone({ ...phone }); // Clone the selected phone
        setShowEditPhoneModal(true);
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
            {/* Add New Phone Button */}
            <div className="d-flex justify-content-end mb-3">
                <Button
                    variant="light"
                    onClick={() => setShowAddPhoneModal(true)}
                    style={{ fontWeight: "bold", border: "2px solid #fff" }}
                >
                    Add New Phone
                </Button>
            </div>

            <table
                className="table table-hover table-striped"
                style={{
                    border: "3px solid black",
                    backgroundColor: "transparent",
                    color: "#fff",
                }}
            >
                <thead style={{ backgroundColor: "#4a6fa5", color: "#fff", borderBottom: "3px solid black" }}>
                    <tr>
                        <th style={{ border: "3px solid black" }}>Image</th>
                        <th style={{ border: "3px solid black" }}>ID</th>
                        <th style={{ border: "3px solid black" }}>Description</th>
                        <th style={{ border: "3px solid black" }}>Price (VND)</th>
                        <th style={{ border: "3px solid black" }}>Stock</th>
                        <th style={{ border: "3px solid black" }}>Chipset</th>
                        <th style={{ border: "3px solid black" }}>GPU</th>
                        <th style={{ border: "3px solid black" }}>Color</th>
                        <th style={{ border: "3px solid black" }}>Warranty (Months)</th>
                        <th style={{ border: "3px solid black" }}>Details</th>
                        <th style={{ border: "3px solid black" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.length > 0 ? (
                        phones.map((phone, index) => (
                            <tr
                                key={phone.phoneId}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#2a5298" : "#1e3c72",
                                    color: "#fff",
                                }}
                            >
                                <td style={{ border: "3px solid black" }}>
                                    <img
                                        src={phone.image}
                                        alt={phone.description}
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                </td>
                                <td style={{ border: "3px solid black" }}>{phone.phoneId}</td>
                                <td style={{ border: "3px solid black" }}>{phone.description}</td>
                                <td style={{ border: "3px solid black" }}>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(phone.price)}
                                </td>
                                <td style={{ border: "3px solid black" }}>{phone.stockQuantity}</td>
                                <td style={{ border: "3px solid black" }}>{phone.chipset}</td>
                                <td style={{ border: "3px solid black" }}>{phone.gpu}</td>
                                <td style={{ border: "3px solid black" }}>{phone.color}</td>
                                <td style={{ border: "3px solid black" }}>{phone.warrantyPeriod}</td>
                                <td style={{ border: "3px solid black" }}>
                                    <i
                                        className="fas fa-eye text-primary me-2"
                                        size="sm"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => onViewPhoneItems(phone.phoneItems)}
                                    ></i>
                                    <Tooltip content="View Phone Items" place="top" />
                                </td>
                                <td style={{ border: "3px solid black" }}>   
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => {
                                            setSelectedPhoneId(phone.phoneId);
                                            setShowAddItemModal(true);
                                        }}
                                    >
                                        <IoIosAddCircle />
                                    </Button>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => handleEditPhone(phone)}
                                    >
                                        <FaEdit />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No phones available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Adding New Phone */}
            <Modal show={showAddPhoneModal} onHide={() => setShowAddPhoneModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Phone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Model ID</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter model ID"
                                value={newPhone.modelId}
                                onChange={(e) =>
                                    setNewPhone({ ...newPhone, modelId: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={newPhone.description}
                                onChange={(e) =>
                                    setNewPhone({ ...newPhone, description: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price (VND)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={newPhone.price}
                                onChange={(e) =>
                                    setNewPhone({ ...newPhone, price: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock quantity"
                                value={newPhone.stockQuantity}
                                onChange={(e) =>
                                    setNewPhone({
                                        ...newPhone,
                                        stockQuantity: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={newPhone.image}
                                onChange={(e) => setNewPhone({ ...newPhone, image: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Chipset</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter chipset"
                                value={newPhone.chipset}
                                onChange={(e) => setNewPhone({ ...newPhone, chipset: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>GPU</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter GPU"
                                value={newPhone.gpu}
                                onChange={(e) => setNewPhone({ ...newPhone, gpu: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter color"
                                value={newPhone.color}
                                onChange={(e) => setNewPhone({ ...newPhone, color: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Warranty Period (Months)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter warranty period"
                                value={newPhone.warrantyPeriod}
                                onChange={(e) =>
                                    setNewPhone({
                                        ...newPhone,
                                        warrantyPeriod: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddPhoneModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddPhone}
                        disabled={
                            !newPhone.modelId ||
                            !newPhone.description.trim() ||
                            !newPhone.price ||
                            !newPhone.stockQuantity ||
                            !newPhone.image.trim() ||
                            !newPhone.chipset.trim() ||
                            !newPhone.gpu.trim() ||
                            !newPhone.color.trim() ||
                            !newPhone.warrantyPeriod
                        }
                    >
                        Add Phone
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Adding Phone Item */}
            <Modal show={showAddItemModal} onHide={() => setShowAddItemModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Phone Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter serial number"
                                value={newPhoneItem.serialNumber}
                                onChange={(e) =>
                                    setNewPhoneItem({ ...newPhoneItem, serialNumber: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddItemModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (!selectedPhoneId || !newPhoneItem.serialNumber.trim()) {
                                alert("Please fill all required fields!");
                                return;
                            }
                            onAddPhoneItem({
                                phoneId: selectedPhoneId,
                                serialNumber: newPhoneItem.serialNumber,
                            });
                        }}
                        disabled={!newPhoneItem.serialNumber.trim()}
                    >
                        Add Phone Item
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditPhoneModal} onHide={() => setShowEditPhoneModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Phone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Model ID</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter model ID"
                                value={editPhone?.modelId || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, modelId: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={editPhone?.description || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, description: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price (VND)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={editPhone?.price || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, price: Number(e.target.value) })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock quantity"
                                value={editPhone?.stockQuantity || ""}
                                onChange={(e) =>
                                    setEditPhone({
                                        ...editPhone,
                                        stockQuantity: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={editPhone?.image || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, image: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Chipset</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter chipset"
                                value={editPhone?.chipset || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, chipset: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>GPU</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter GPU"
                                value={editPhone?.gpu || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, gpu: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter color"
                                value={editPhone?.color || ""}
                                onChange={(e) =>
                                    setEditPhone({ ...editPhone, color: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Warranty Period (Months)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter warranty period"
                                value={editPhone?.warrantyPeriod || ""}
                                onChange={(e) =>
                                    setEditPhone({
                                        ...editPhone,
                                        warrantyPeriod: Number(e.target.value),
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditPhoneModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (editPhone) {
                                onEditPhone(editPhone); // Call the parent-provided function
                            }
                            setShowEditPhoneModal(false);
                        }}
                        disabled={
                            !editPhone?.modelId ||
                            !editPhone?.description?.trim() ||
                            !editPhone?.price ||
                            !editPhone?.stockQuantity ||
                            !editPhone?.image?.trim() ||
                            !editPhone?.chipset?.trim() ||
                            !editPhone?.gpu?.trim() ||
                            !editPhone?.color?.trim() ||
                            !editPhone?.warrantyPeriod
                        }
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PhonesTable;
