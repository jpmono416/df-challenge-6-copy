import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../shared/CustomCard";
import CustomHeader from "../shared/CustomHeader";
import ResourceCard from "../resourceRequests/ResourceCard";

const DisasterListEntry = ({ location, description, urgency, resources }) => {
    return (
        <CustomCard>
            <Row>
                <CustomHeader>Location: {location}</CustomHeader>
            </Row>
            <CustomHeader>Description: {description}</CustomHeader>
            <CustomHeader>Urgency: {urgency}</CustomHeader>
            <div className="text-center mb-4">
                <CustomHeader>Resources needed:</CustomHeader>
            </div>
            <Row className="justify-content-center">
                {resources.map((resource, index) => (
                    <Col key={index} sm={6} lg={3}>
                        <ResourceCard
                            resourceType={resource.requestedResourceType}
                            percComplete={
                                (resource.quantityFulfilled / resource.quantityNeeded) * 100
                            }
                        ></ResourceCard>
                    </Col>
                ))}
            </Row>
        </CustomCard>
    );
};

export default DisasterListEntry;
