import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import CustomHeader from "../shared/CustomHeader";
import ResourceListEntry from "./ResourceListEntry";
import EditResourceDetailsModal from "./EditResourceDetailsModal";
import CreateResourceModal from "./CreateResourceModal";

const ResourceList = ({ resourceRequests, onResourcesUpdate, handleAddResource }) => {
    const [selectedResource, setSelectedResource] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleShowEditModal = (resource) => {
        setSelectedResource(resource);
        console.log("Selected resource: ", resource);
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleUpdateResource = (resourceId, updatedDetails) => {
        console.log("Updated details: ", updatedDetails);
        const updatedResources = resourceRequests.map((resource) =>
            resource._id === resourceId ? { ...resource, ...updatedDetails } : resource
        );
        onResourcesUpdate(updatedResources);
    };

    const handleDeleteResource = (resourceId) => {
        const updatedResources = resourceRequests.filter((resource) => resource._id !== resourceId);
        onResourcesUpdate(updatedResources);
    };

    return (
        <>
            <CustomHeader>Resources needed</CustomHeader>
            <ListGroup>
                {console.log("MAP", resourceRequests)}
                {resourceRequests.map((resource) => (
                    <ResourceListEntry
                        key={resource._id}
                        type={resource.requestedResourceType}
                        description={resource.description}
                        quantityNeeded={resource.quantityNeeded}
                        quantityFulfilled={resource.quantityFulfilled}
                        urgency={resource.urgencyLevel}
                        status={resource.status}
                        onClick={() => handleShowEditModal(resource)}
                    />
                ))}
                {selectedResource && showEditModal && (
                    <EditResourceDetailsModal
                        show={showEditModal}
                        handleClose={handleCloseEditModal}
                        resource={selectedResource}
                        onUpdateResource={handleUpdateResource}
                        onDeleteResource={handleDeleteResource}
                    />
                )}
            </ListGroup>

            <Button variant="success" className="mb-3" onClick={handleShowCreateModal}>
                Add
            </Button>
            <CreateResourceModal
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                addResource={handleAddResource}
            />
        </>
    );
};

export default ResourceList;
