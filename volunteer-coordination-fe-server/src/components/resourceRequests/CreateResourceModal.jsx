// ResourceModalForm.jsx
import React, { useState } from "react";
import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import UrgencyDropdown from "../shared/UrgencyDropdown";

const CreateResourceModal = ({ show, handleClose, addResource }) => {
    const [urgency, setUrgency] = useState("Urgency");
    const [requestedResourceType, setRequestedResourceType] = useState("");
    const [description, setDescription] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        addResource({
            requestedResourceType,
            description,
            quantityNeeded,
            urgencyLevel: urgency === "Urgency" ? "Low" : urgency,
        });

        // Reset form
        setRequestedResourceType("");
        setDescription("");
        setQuantityNeeded("");
        setUrgency("Urgency");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Resource</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="resourceType">
                        <Form.Label>Type</Form.Label>
                        <DropdownButton
                            id="dropdown-resource-type"
                            title={requestedResourceType || "Type"}
                            onSelect={setRequestedResourceType}
                            variant="outline-secondary"
                        >
                            <Dropdown.Item eventKey="Water">Water</Dropdown.Item>
                            <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                            <Dropdown.Item eventKey="Medicine">Medicine</Dropdown.Item>
                            <Dropdown.Item eventKey="Shelter">Shelter</Dropdown.Item>
                            <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
                            <Dropdown.Item eventKey="Transportation">Transportation</Dropdown.Item>
                            <Dropdown.Item eventKey="Hygiene">Hygiene</Dropdown.Item>
                            <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
                            <Dropdown.Item eventKey="Electricity">Electricity</Dropdown.Item>
                            <Dropdown.Item eventKey="Volunteers">Volunteers</Dropdown.Item>
                            <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group controlId="resourceDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="resourceAmountNeeded">
                        <Form.Label>Amount Needed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter amount needed"
                            value={quantityNeeded}
                            onChange={(e) => setQuantityNeeded(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="resourceUrgency">
                        <Form.Label>Urgency</Form.Label>
                        <UrgencyDropdown
                            selectedUrgency={urgency}
                            setSelectedUrgency={setUrgency}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateResourceModal;
