import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import StatusBadge from "../shared/StatusBadge";

const ResourceListEntry = ({
    type,
    description,
    quantityNeeded,
    quantityFulfilled,
    urgency,
    status,
    onClick,
}) => {
    return (
        <ListGroup.Item
            className="d-flex justify-content-between align-items-start"
            onClick={onClick}
            style={{ cursor: "pointer" }}
            key={description}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{type}</div>
                <label>Description: {description}</label>
                <br />
                <label>
                    {quantityFulfilled}/{quantityNeeded} fulfilled
                </label>
                <p>
                    Priority: <StatusBadge status={urgency} />
                </p>
            </div>
            <StatusBadge status={status} />
        </ListGroup.Item>
    );
};

export default ResourceListEntry;
