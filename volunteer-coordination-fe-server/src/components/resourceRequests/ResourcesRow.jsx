import React, { useState } from "react";
import CustomHeader from "../shared/CustomHeader";
import { Row, Col } from "react-bootstrap";
import ResourceCard from "./ResourceCard";
import ResourceDetailsModal from "./ResourceDetailsModal";

const ResourcesRow = ({ resources }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);

    const handleCloseDetailsModal = () => setShowDetailsModal(false);
    const handleShowDetailsModal = (resource) => {
        setSelectedResource(resource);
        setShowDetailsModal(true);
    };
    return (
        resources.length > 0 && (
            <>
                <div className="text-center mb-4">
                    <CustomHeader>Resources needed:</CustomHeader>
                </div>
                <Row className="justify-content-center">
                    {resources.map((resource) => (
                        <Col key={resource._id} sm={6} lg={3}>
                            <ResourceCard
                                resource={resource}
                                onClick={() => handleShowDetailsModal(resource)}
                            />
                        </Col>
                    ))}
                    {selectedResource && showDetailsModal && (
                        <ResourceDetailsModal
                            show={showDetailsModal}
                            handleClose={handleCloseDetailsModal}
                            resource={selectedResource}
                        />
                    )}
                </Row>
            </>
        )
    );
};

export default ResourcesRow;
