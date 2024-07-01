import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

const ResourceListEntry = ({ type, description, quantityNeeded, urgency, onClick }) => {
    return (
        <ListGroup.Item
            className="d-flex justify-content-between align-items-start"
            onClick={onClick}
             style={{ cursor: "pointer" }}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{type}</div>
                {description}
            </div>
            <Badge bg="primary" pill>
                {quantityNeeded}
            </Badge>
            <Badge bg="warning" pill>
                {urgency}
            </Badge>
        </ListGroup.Item>
    );
};

export default ResourceListEntry;
