import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import CustomHeader from "../shared/CustomHeader";
import ResourceListEntry from "./ResourceListEntry";
import EditResourceDetailsModal from "./EditResourceDetailsModal";
import CreateResourceModal from "./CreateResourceModal";
import ResourceService from "../../service/Resource.service.js";

const ResourceList = ({ resourceRequests, onResourcesUpdate, handleAddResource }) => {
    const [selectedResource, setSelectedResource] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // const addResource = async (resourceDetails) => {
    //     try {
    //         const newResource = await ResourceService.CreateResourceRequest(resourceDetails);
    //         // Assuming newResource is the newly created resource returned from the service
    //         if (newResource && !newResource.failed) {
    //             // Call the prop function to update parent component's state
    //             handleAddResource(newResource);
    //         } else {
    //             // Handle failure (e.g., show an error message)
    //             console.error("Failed to create resource");
    //         }
    //     } catch (error) {
    //         console.error("Error creating resource:", error);
    //         // Optionally, handle the error (e.g., show an error message)
    //     }
    // };

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleShowEditModal = (resource) => {
        setSelectedResource(resource);
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleUpdateResource = (resourceId, updatedDetails) => {
        const updatedResources = resourceRequests.map((resource) =>
            resource._id === resourceId ? { ...resource, ...updatedDetails } : resource
        );
        onResourcesUpdate(updatedResources);
    };

    return (
        <>
            <CustomHeader>Resources needed</CustomHeader>
            <ListGroup>
                {resourceRequests.map((resource) => (
                    <ResourceListEntry
                        key={resource._id}
                        type={resource.requestedResourceType}
                        description={resource.description}
                        quantityNeeded={resource.quantityNeeded}
                        urgency={resource.urgencyLevel}
                        onClick={() => handleShowEditModal(resource)}
                    />
                ))}
                {selectedResource && showEditModal && (
                    <EditResourceDetailsModal
                        show={showEditModal}
                        handleClose={handleCloseEditModal}
                        resource={selectedResource}
                        onUpdateResource={handleUpdateResource}
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
