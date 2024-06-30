import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

const UrgencyDropdown = ({ selectedUrgency, setSelectedUrgency }) => {
    return (
        <DropdownButton
            id="dropdown-urgency"
            title={selectedUrgency}
            onSelect={setSelectedUrgency}
            variant="outline-secondary"
        >
            <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
            <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
            <Dropdown.Item eventKey="High">High</Dropdown.Item>
            <Dropdown.Item eventKey="Critical">Critical</Dropdown.Item>
        </DropdownButton>
    );
};

export default UrgencyDropdown;
