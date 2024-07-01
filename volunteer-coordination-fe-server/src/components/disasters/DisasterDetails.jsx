import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import CustomCard from "../shared/CustomCard";
import CustomContainer from "../shared/CustomContainer";
import CustomHeader from "../shared/CustomHeader";
import DisasterService from "../../service/Disaster.service.js";
import ResourcesRow from "../resourceRequests/ResourcesRow.jsx";

import { AuthContext } from "../../auth/AuthProvider.jsx";
import ResourceList from "../resourceRequests/ResourceList.jsx";
import CustomTitle from "../shared/CustomTitle.jsx";
import UserService from "../../service/User.service.js";
import TrackDisasterButton from "./TrackDisasterButton.jsx";
import UntrackDisasterButton from "./UntrackDisasterButton.jsx";

const DisasterDetails = () => {
    const { id } = useParams();
    const [disaster, setDisaster] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [estimationPeopleAffected, setEstimationPeopleAffected] = useState(0);
    const [resourceRequests, setResourceRequests] = useState([]);

    const { authToken, userDetails, updateUserDetails } = useContext(AuthContext); // Replace with your login logic
    const [isTrackingDisaster, setIsTrackingDisaster] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDisaster = async () => {
            const result = await DisasterService.getDisasterById(id);
            if (result.failed) {
                navigate("/error");
                return;
            }

            setDisaster(result);
            setLocation(result.location);
            setDescription(result.description);
            setEstimationPeopleAffected(result.estimationPeopleAffected);
            setResourceRequests(result.resourceRequests);
        };

        fetchDisaster();
    }, [id]);

    useEffect(() => {
        if (disaster) {
            const trackingStatus = userDetails.trackedDisasters.some(
                (trackedDisaster) => trackedDisaster._id === disaster._id
            );
            setIsTrackingDisaster(trackingStatus);
        }
    }, [disaster, userDetails.trackedDisasters]);

    const handleTrackDisaster = async () => {
        const response = await UserService.trackDisaster(disaster._id, userDetails._id, authToken);
        if (response.failed) {
            navigate("/error");
            return;
        }
        updateUserDetails(response);
        setIsTrackingDisaster(true);
    };

    const handleUntrackDisaster = async () => {
        const response = await UserService.untrackDisaster(disaster._id, userDetails._id, authToken);
        if (response.failed) {
            navigate("/error");
            return;
        }
        updateUserDetails(response);
        setIsTrackingDisaster(false);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const disasterData = {
            id: disaster._id,
            location,
            description,
            estimationPeopleAffected,
            resourceRequests,
            createdBy: userDetails._id,
        };

        const response = await DisasterService.updateDisasterDetails(disasterData, authToken);
        if (response.failed) {
            navigate("/error");
            return;
        }
        // Return to the disaster details
        setDisaster(response);
        setIsEditing(false);
    };

    const handleResourcesUpdate = (updatedResources) => {
        setResourceRequests(updatedResources);
    };

    if (!disaster) {
        return <div>Loading...</div>;
    }

    return isEditing ? (
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
    ) : (
        <CustomContainer>
            <CustomCard>
                <CustomTitle>Disaster details</CustomTitle>
                <CustomHeader>Location: {disaster.location} </CustomHeader>
                <CustomHeader>Description: {disaster.description} </CustomHeader>
                <CustomHeader>Affected people: {disaster.estimationPeopleAffected} </CustomHeader>
                <Form.Text className="text-muted">
                    Created: {new Date(disaster.createdAt).toLocaleDateString("en-GB")}
                </Form.Text>
                <br />
                <Form.Text className="text-muted">
                    Last Updated: {new Date(disaster.updatedAt).toLocaleDateString("en-GB")}
                </Form.Text>
                <ResourcesRow resources={disaster.resourceRequests} />
                <Button variant="info" onClick={() => setIsEditing(true)}>
                    Edit
                </Button>
                {isTrackingDisaster ? (
                    <UntrackDisasterButton onClick={handleUntrackDisaster} />
                ) : (
                    <TrackDisasterButton onClick={handleTrackDisaster} />
                )}
            </CustomCard>
        </CustomContainer>
    );
};

export default DisasterDetails;
