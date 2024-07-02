import React, { useState } from "react";
import TrackedDisasterPreviewCard from "./TrackedDisasterPreviewCard";
import { Col, Row } from "react-bootstrap";
import CustomHeader from "../shared/CustomHeader";

const DisasterPreviewRow = ({ disasters }) => {
    const [maxHeight, setMaxHeight] = useState(0);

    // Keep all cards the same height
    const updateMaxHeight = (newHeight) => {
        if (newHeight > maxHeight) {
            setMaxHeight(newHeight);
        }
    };

    return (
        <>
            <CustomHeader>Tracked disasters:</CustomHeader>
            <Row>
                {disasters.map((disaster) => (
                    <Col key={disaster._id} sm={6} lg={3} style={{ minHeight: `${maxHeight}px`, display: 'flex', justifyContent: 'center' }}>
                        <TrackedDisasterPreviewCard
                            disaster={disaster}
                            updateMaxHeight={updateMaxHeight}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default DisasterPreviewRow;
