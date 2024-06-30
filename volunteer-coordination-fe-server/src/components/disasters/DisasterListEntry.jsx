import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../shared/CustomCard";
import CustomHeader from "../shared/CustomHeader";
import ResourceCard from "../resourceRequests/ResourceCard";
import ResourcesRow from "../resourceRequests/ResourcesRow";

const DisasterListEntry = ({ location, description, affectedPeople, resources }) => {
    return (
        <CustomCard>
            <Row>
                <CustomHeader>Location: {location}</CustomHeader>
            </Row>
            <CustomHeader>Description: {description}</CustomHeader>
            <CustomHeader>Affected people: {affectedPeople}</CustomHeader>
            <ResourcesRow resources={resources} />
        </CustomCard>
    );
};

export default DisasterListEntry;
