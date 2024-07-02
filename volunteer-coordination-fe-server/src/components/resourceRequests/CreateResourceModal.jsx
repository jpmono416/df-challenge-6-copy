// ResourceModalForm.jsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ResourceDetailsForm from "./ResourceDetailsForm";

const CreateResourceModal = ({ show, handleClose, addResource }) => {
    const [urgencyLevel, setUrgencyLevel] = useState("Urgency");
    const [requestedResourceType, setRequestedResourceType] = useState("");
    const [description, setDescription] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState(0);
    const [quantityFulfilled, setQuantityFulfilled] = useState(0);
    const [status, setStatus] = useState("Still Needed"); // Default value for status

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        addResource({
            requestedResourceType,
            description,
            quantityNeeded,
            quantityFulfilled,
            urgencyLevel: urgencyLevel === "Urgency" ? "Low" : urgencyLevel,
            status,
        });

        // Reset form
        setRequestedResourceType("");
        setDescription("");
        setQuantityNeeded("");
        setUrgencyLevel("Urgency");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Resource</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResourceDetailsForm
                    requestId={-1}
                    requestedResourceType={requestedResourceType}
                    description={description}
                    quantityNeeded={quantityNeeded}
                    quantityFulfilled={quantityFulfilled}
                    urgencyLevel={urgencyLevel}
                    status={status}
                    setRequestedResourceType={setRequestedResourceType}
                    setDescription={setDescription}
                    setQuantityNeeded={setQuantityNeeded}
                    setQuantityFulfilled={setQuantityFulfilled}
                    setUrgencyLevel={setUrgencyLevel}
                    setStatus={setStatus}
                    isEditing={false}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateResourceModal;
