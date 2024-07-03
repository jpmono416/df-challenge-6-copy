import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../shared/CustomCard";
import CustomHeader from "../shared/CustomHeader";
import CustomTitle from "../shared/CustomTitle";
import ResourcesRow from "../resourceRequests/ResourcesRow";

const DisasterListEntry = ({ disaster, isMain }) => {
    return (
        <Link to={`/disasters/${disaster._id}`} style={{ textDecoration: "none" }}>
            <CustomCard className={isMain ? "mainCard" : "customCard"}>
                <CustomTitle>
                    <span>{disaster.location}</span>
                </CustomTitle>
                <Row className="mt-5">
                    <Col md={{ span: 12, offset: 1 }}>
                        <CustomHeader>Description: {disaster.description}</CustomHeader>
                        <CustomHeader>
                            Affected people: {disaster.estimationPeopleAffected}
                        </CustomHeader>
                    </Col>
                </Row>

                <ResourcesRow resources={disaster.resourceRequests} />
            </CustomCard>
        </Link>
    );
};

export default DisasterListEntry;
