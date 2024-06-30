import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DisasterListEntry from "./DisasterListEntry";
import DisasterService from "../../service/Disaster.service";
import CustomContainer from "../shared/CustomContainer";

const DisasterList = () => {
    const [disasters, setDisasters] = useState([]);

    useEffect(() => {
        const fetchDisasters = async () => {
            const result = await DisasterService.getAllActiveDisasters();
            if (!result.failed) {
                setDisasters(result);
            } else {
                console.error(result.message); // TODO navigate to error page
            }
        };

        fetchDisasters();
    }, []);

    if (disasters.length === 0) {
        return <div>Loading...</div>; 
    }

    return (
        <CustomContainer>
            <h1 className="text-center">Active Disasters</h1>
            {console.log("Resources: ", disasters[0].resourceRequests)}
            {disasters.map((disaster, index) => (
                <Row>
                    <Col key={index} sm={12} className="mt-5">
                        <DisasterListEntry
                            location={disaster.location}
                            description={disaster.description}
                            urgency={disaster.urgency}
                            resources={disaster.resourceRequests}
                        />
                    </Col>
                </Row>
            ))}
        </CustomContainer>
    );
};

export default DisasterList;
