import React from "react";
import { Row, Col } from "react-bootstrap";
import ResourceCard from "../resourceRequests/ResourceCard";
import CustomCard from "../shared/CustomCard";
import CustomContainer from "../shared/CustomContainer";
import CustomHeader from "../shared/CustomHeader";

const DisasterDetails = () => {
    return (
        <CustomContainer>
            <CustomCard>
                <CustomHeader>Location: (to be filled)</CustomHeader>
                <CustomHeader>Description: (to be filled)</CustomHeader>
                <div className="text-center mb-4">
                    <h3>Resources needed:</h3>
                </div>
                <Row className="justify-content-center">
                    <Col className="d-flex justify-content-center" sm={6} lg={3}> <ResourceCard /> </Col>
                    <Col className="d-flex justify-content-center" sm={6} lg={3}> <ResourceCard /> </Col>
                    <Col className="d-flex justify-content-center" sm={6} lg={3}> <ResourceCard /> </Col>
                    <Col className="d-flex justify-content-center" sm={6} lg={3}> <ResourceCard /> </Col>
                </Row>
            </CustomCard>
        </CustomContainer>
    );
};

export default DisasterDetails;
