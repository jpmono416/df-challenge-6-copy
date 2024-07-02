import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import DisasterListEntry from "./DisasterListEntry";
import DisasterService from "../../service/Disaster.service";
import CustomContainer from "../shared/CustomContainer";

const DisasterList = () => {
    const [disasters, setDisasters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Active Disasters";
        const fetchDisasters = async () => {
            const result = await DisasterService.getAllActiveDisasters();
            if (!result.failed) setDisasters(result);
            else navigate("/error");
        };

        fetchDisasters();
    }, []);

    if (disasters.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <CustomContainer>
            <h1 className="text-center">Active Disasters</h1>
            {disasters.map((disaster) => (
                <Row key={disaster._id}>
                    <Col sm={12} className="mb-5">
                        <DisasterListEntry disaster={disaster} />
                    </Col>
                </Row>
            ))}
        </CustomContainer>
    );
};

export default DisasterList;
