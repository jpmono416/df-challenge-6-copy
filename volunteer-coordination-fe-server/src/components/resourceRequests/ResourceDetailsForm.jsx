import React from "react";
import { Form, DropdownButton, Dropdown } from "react-bootstrap";
import UrgencyDropdown from "../shared/UrgencyDropdown";

const ResourceDetailsForm = ({
    requestId,
    requestedResourceType,
    description,
    quantityNeeded,
    quantityFulfilled,
    urgencyLevel,
    status,
    setRequestedResourceType,
    setDescription,
    setQuantityNeeded,
    setQuantityFulfilled,
    setUrgencyLevel,
    setStatus,
    isEditing,
}) => {
    return (
        <Form>
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

            {/* Only show the status if request already exists and is being edited */}
            {requestId && requestId !== -1 && (
                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>

                    <DropdownButton
                        id="dropdown-disaster-status"
                        title={status || "Status"}
                        onSelect={setStatus}
                        variant="outline-secondary"
                    >
                        <Dropdown.Item eventKey="Still Needed">Still Needed</Dropdown.Item>
                        <Dropdown.Item eventKey="Goal Reached">Goal Reached</Dropdown.Item>
                        <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
                    </DropdownButton>
                </Form.Group>
            )}
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
            <Form.Group controlId="resourceAmountFulfilled">
                <Form.Label>Amount Fulfilled</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter amount fulfilled"
                    value={quantityFulfilled}
                    onChange={(e) => setQuantityFulfilled(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="resourceUrgency">
                <Form.Label>Urgency</Form.Label>
                <UrgencyDropdown
                    selectedUrgency={urgencyLevel}
                    setSelectedUrgency={setUrgencyLevel}
                />
            </Form.Group>
        </Form>
    );
};

export default ResourceDetailsForm;
