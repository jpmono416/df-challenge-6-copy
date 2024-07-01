import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ResourceDetailsForm from "./ResourceDetailsForm";

const EditResourceDetailsModal = ({ show, handleClose, resource, onUpdateResource }) => {
    const [urgencyLevel, setUrgencyLevel] = useState(resource.urgencyLevel || "Urgency");
    const [requestedResourceType, setRequestedResourceType] = useState(resource.requestedResourceType || "");
    const [description, setDescription] = useState(resource.description || "");
    const [quantityNeeded, setQuantityNeeded] = useState(resource.quantityNeeded || "");
    const [quantityFulfilled, setQuantityFulfilled] = useState(resource.quantityFulfilled || "");

    const handleSave = () => {
        onUpdateResource(resource._id, {
            requestedResourceType,
            description,
            quantityNeeded,
            quantityFulfilled,
            urgencyLevel,
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Resource request details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResourceDetailsForm
                    requestedResourceType={requestedResourceType}
                    description={description}
                    quantityNeeded={quantityNeeded}
                    quantityFulfilled={quantityFulfilled}
                    urgencyLevel={urgencyLevel}
                    setRequestedResourceType={setRequestedResourceType}
                    setDescription={setDescription}
                    setQuantityNeeded={setQuantityNeeded}
                    setQuantityFulfilled={setQuantityFulfilled}
                    setUrgencyLevel={setUrgencyLevel}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditResourceDetailsModal;
