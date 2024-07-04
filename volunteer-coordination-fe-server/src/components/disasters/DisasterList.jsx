import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import DisasterListEntry from "./DisasterListEntry";
import DisasterService from "../../service/Disaster.service";
import CustomContainer from "../shared/CustomContainer";
import PageTitle from "../shared/PageTitle";

const DisasterList = () => {
    const [disasters, setDisasters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Active Disasters";
        const fetchDisasters = async () => {
            const result = await DisasterService.getAllActiveDisasters();
            if (!result?.failed) {
                setDisasters(result);
            } else {
                navigate("/error");
            }
        };

        fetchDisasters();
    }, []);

    if (disasters.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <CustomContainer>
            <PageTitle title="Active Disasters" />
            {disasters.map((disaster, index) => (
                <Row key={disaster._id}>
                    <Col sm={12} className="mb-5">
                        <DisasterListEntry
                            disaster={disaster}
                            isMain={index === 0 ? true : false}
                        />
                    </Col>
                </Row>
            ))}
        </CustomContainer>
    );
};

export default DisasterList;
