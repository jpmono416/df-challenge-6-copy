import React from "react";
import TrackedDisasterPreviewCard from "./TrackedDisasterPreviewCard";
import { Col, Row } from "react-bootstrap";
import CustomHeader from "../shared/CustomHeader";

const DisasterPreviewRow = ({ disasters }) => {
    return (
        <>
            <CustomHeader>Tracked disasters:</CustomHeader>
            <Row>
                {disasters.map((disaster) => (
                    <Col key={disaster._id} sm={6} lg={3}>
                        <TrackedDisasterPreviewCard disaster={disaster} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default DisasterPreviewRow;
