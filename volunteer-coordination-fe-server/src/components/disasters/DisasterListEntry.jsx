import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../shared/CustomCard";
import CustomHeader from "../shared/CustomHeader";
import ResourcesRow from "../resourceRequests/ResourcesRow";

const DisasterListEntry = ({ disaster }) => {
    return (
        <Link to={`/disasters/${disaster._id}`} style={{ textDecoration: "none" }}>
            <CustomCard>
                <Row>
                    <CustomHeader>Location: {disaster.location}</CustomHeader>
                </Row>
                <CustomHeader>Description: {disaster.description}</CustomHeader>
                <CustomHeader>Affected people: {disaster.estimationPeopleAffected}</CustomHeader>
                <ResourcesRow resources={disaster.resourceRequests} />
            </CustomCard>
        </Link>
    );
};

export default DisasterListEntry;
