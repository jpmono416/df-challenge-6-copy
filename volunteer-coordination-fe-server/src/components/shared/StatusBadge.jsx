import React from "react";
import { Badge } from "react-bootstrap";

const StatusBadge = ({ status }) => {
    function getStatusColor(status) {
        // This covers for statuses of both disasters and resource requests and urgency levels
        switch (status) {
            case "Active":
            case "Still Needed":
            case "High":
                return "warning";
            case "Completed":
            case "Goal Reached":
            case "Low":
                return "success";
            case "Medium":
                return "primary";
            case "Cancelled":
            case "Critical":
                return "danger";
            default:
                return "secondary";
        }
    }

    return (
        <Badge bg={getStatusColor(status)} pill>
            {status}
        </Badge>
    );
};

export default StatusBadge;
