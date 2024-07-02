import React, {useEffect} from "react";
import { Form, Button, Dropdown, DropdownButton, OverlayTrigger, Tooltip } from "react-bootstrap";
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
    handleDeleteDisaster,
    setIsEditing,
}) => {
  useEffect(() => {
      document.title = "Edit disaster";
  }, []);
    const handleAddResource = (resource) => {
        handleResourcesUpdate([...resourceRequests, resource]);
    };
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
                    <Form.Group controlId="status">
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
                        handleAddResource={handleAddResource}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                        <Button
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginRight: "0.5rem",
                            }}
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>

                        {/* Delete a disaster from the Database */}
                        {status === "Cancelled" && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip-submit">
                                        Only delete the disaster if it was created by mistake.
                                    </Tooltip>
                                }
                            >
                                <Button
                                    style={{ margin: "0 0.5rem" }}
                                    variant="danger"
                                    onClick={() => handleDeleteDisaster()}
                                >
                                    Delete
                                </Button>
                            </OverlayTrigger>
                        )}
                        <Button
                            style={{ marginLeft: "0.5rem" }}
                            variant="secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </CustomCard>
        </CustomContainer>
    );
};

export default EditDisasterCard;
