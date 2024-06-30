import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Button, OverlayTrigger, Tooltip, ListGroup } from "react-bootstrap";

import CustomCard from "../shared/CustomCard";
import CustomContainer from "../shared/CustomContainer";
import CustomHeader from "../shared/CustomHeader";
import DisasterResourceListEntry from "./DisasterResourceListEntry.jsx";
import CreateResourceModal from "../resourceRequests/CreateResourceModal.jsx";
import DisasterService from "../../service/Disaster.service.js";

import { AuthContext } from "../../auth/AuthProvider.jsx";

const CreateDisasterCard = () => {
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [estimationPeopleAffected, setEstimationPeopleAffected] = useState(0);
    const [resourceRequests, setResources] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const { authToken, userDetails } = useContext(AuthContext); // Replace with your login logic

    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleAddResource = (resource) => {
        setResources([...resourceRequests, resource]);
    };

    const handleCreateDisaster = async (event) => {
        event.preventDefault();
        const disasterData = {
            location,
            description,
            estimationPeopleAffected,
            resourceRequests,
            createdBy: userDetails._id,
        };
        const response = await DisasterService.addNewDisaster(disasterData, authToken);

        if (response.failed) navigate("/error");
        else navigate(`/disasters/${response._id}`);
    };

    return (
        <CustomContainer>
            <CustomCard>
                <Row className="justify-content-center">
                    <div className="d-flex justify-content-center" style={{ marginTop: "25px" }}>
                        <CustomHeader>Create a new disaster</CustomHeader>
                    </div>
                </Row>
                <Form onSubmit={handleCreateDisaster}>
                    {/* Disaster details */}
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAffectedPeople">
                        <Form.Label>Affected people</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter estimation of affected people"
                            value={estimationPeopleAffected}
                            onChange={(e) => setEstimationPeopleAffected(e.target.value)}
                        />
                    </Form.Group>

                    {/* Resources */}
                    <CustomHeader>Resources needed</CustomHeader>
                    <ListGroup>
                        {resourceRequests.map((resource, index) => (
                            <DisasterResourceListEntry
                                key={index}
                                type={resource.requestedResourceType}
                                description={resource.description}
                                quantityNeeded={resource.quantityNeeded}
                                urgency={resource.urgencyLevel}
                            />
                        ))}
                    </ListGroup>
                    <Button variant="success" className="mb-3" onClick={handleShowModal}>
                        Add
                    </Button>
                    <CreateResourceModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        addResource={handleAddResource}
                    />

                    {/* Submit */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            left: 0,
                            bottom: 0,
                            width: "100%",
                            padding: "20px",
                            boxSizing: "border-box",
                        }}
                    >
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip-submit">
                                    Please make sure to provide accurate information. You can always
                                    edit or delete this later.
                                </Tooltip>
                            }
                        >
                            <Button variant="primary" type="submit">
                                Report natural disaster
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Form>
            </CustomCard>
        </CustomContainer>
    );
};

export default CreateDisasterCard;
