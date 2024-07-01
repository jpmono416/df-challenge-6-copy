import React from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import CustomContainer from "../shared/CustomContainer";
import CustomCard from "../shared/CustomCard";
import CustomTitle from "../shared/CustomTitle";
import ResourceList from "../resourceRequests/ResourceList";

const EditDisasterCard = ({
    location,
    description,
    estimationPeopleAffected,
    resourceRequests,
    status,
    setLocation,
    setDescription,
    setEstimationPeopleAffected,
    setStatus,
    handleSave,
    handleResourcesUpdate,
    setIsEditing,
}) => {
    return (
        <CustomContainer>
            <CustomCard>
                <CustomTitle>Edit details</CustomTitle>
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            disabled={true}
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAffectedPeople">
                        <Form.Label>Affected People</Form.Label>
                        <Form.Control
                            type="text"
                            value={estimationPeopleAffected}
                            onChange={(e) => setEstimationPeopleAffected(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="resourceType">
                        <Form.Label>Status</Form.Label>

                        <DropdownButton
                            id="dropdown-disaster-status"
                            title={status || "Status"}
                            onSelect={setStatus}
                            variant="outline-secondary"
                        >
                            <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                            <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                            <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                    <ResourceList
                        resourceRequests={resourceRequests}
                        onResourcesUpdate={handleResourcesUpdate}
                    />
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </Form>
            </CustomCard>
        </CustomContainer>
    );
};

export default EditDisasterCard;
