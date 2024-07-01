import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import CustomHeader from "../shared/CustomHeader";
import ResourceListEntry from "./ResourceListEntry";
import EditResourceDetailsModal from "./EditResourceDetailsModal";

const ResourceList = ({ resourceRequests, onResourcesUpdate }) => {
    const [selectedResource, setSelectedResource] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

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
        </>
    );
};

export default ResourceList;
