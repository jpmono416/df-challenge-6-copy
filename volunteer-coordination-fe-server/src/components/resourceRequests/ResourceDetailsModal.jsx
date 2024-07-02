import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import StatusBadge from "../shared/StatusBadge";

const ResourceDetailsModal = ({ show, handleClose, resource }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Resource request details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <p>
                            <strong>Status:</strong> <StatusBadge status={resource.status} />
                        </p>
                        <p>
                            <strong>Resource Type:</strong> {resource.requestedResourceType}
                        </p>
                        <p>
                            <strong>Description:</strong> {resource.description}
                        </p>
                        <p>
                            <strong>Quantity Needed:</strong> {resource.quantityNeeded}
                        </p>
                        <p>
                            <strong>Quantity Fulfilled:</strong> {resource.quantityFulfilled}
                        </p>
                        <p>
                            <strong>Urgency Level:</strong>{" "}
                            <StatusBadge status={resource.urgencyLevel} />
                        </p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResourceDetailsModal;
