import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ResourceDetailsForm from "./ResourceDetailsForm";
import ResourceService from "../../service/Resource.service";

import { AuthContext } from "../../auth/AuthProvider.jsx";

const EditResourceDetailsModal = ({
    show,
    handleClose,
    resource,
    onUpdateResource,
    onDeleteResource,
}) => {
    const [urgencyLevel, setUrgencyLevel] = useState(resource.urgencyLevel || "Urgency");
    const [requestedResourceType, setRequestedResourceType] = useState(
        resource.requestedResourceType || ""
    );
    const [description, setDescription] = useState(resource.description || "");
    const [quantityNeeded, setQuantityNeeded] = useState(resource.quantityNeeded || "");
    const [quantityFulfilled, setQuantityFulfilled] = useState(resource.quantityFulfilled || "");
    const [status, setStatus] = useState(resource.status || "Status");

    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = () => {
        onUpdateResource(resource._id, {
            requestedResourceType,
            description,
            quantityNeeded,
            quantityFulfilled,
            urgencyLevel,
            status,
        });
        handleClose();
    };

    const handleDeleteResourceRequest = async () => {
        const response = await ResourceService.deleteResourceRequest(resource._id, authToken);
        if (response.failed) {
            navigate("/error");
            return;
        }
        console.log("Delete: ", resource._id);
        onDeleteResource(resource._id);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Resource request details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {console.log("ID", resource._id)}
                <ResourceDetailsForm
                    requestId={1}
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
                    isEditing={true}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Update
                </Button>
                {/* Delete a resource request from the Database */}
                {status === "Cancelled" && (
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-submit">
                                Only delete the request if it was created by mistake.
                            </Tooltip>
                        }
                    >
                        <Button
                            style={{ margin: "0 0.5rem" }}
                            variant="danger"
                            onClick={() => handleDeleteResourceRequest()}
                        >
                            Delete
                        </Button>
                    </OverlayTrigger>
                )}
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditResourceDetailsModal;
