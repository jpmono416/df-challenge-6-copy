import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomCard from "../shared/CustomCard.jsx";
import DisasterService from "../../service/Disaster.service";
import MainText from "./MainText.jsx";

const MainSection = () => {
    const navigate = useNavigate();
    const [disasterCount, setDisasterCount] = useState(0);

    useEffect(() => {
        document.title = "HelpHive - Home";
        const fetchDisasterCount = async () => {
            const result = await DisasterService.getActiveDisastersCount();
            if (!result.failed) setDisasterCount(result);
            else navigate("/error");
        };

        fetchDisasterCount();
    }, []);

    return (
        <div className="half-size-container">
            <Container className="mt-4">
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <CustomCard>
                            <MainText disasterCount={disasterCount} />
                            <div
                                className="d-flex justify-content-center"
                                style={{ marginTop: "25px" }}
                            >
                                <Button
                                    variant="success"
                                    size="lg"
                                    onClick={() => navigate("/disasters")}
                                >
                                    Make a difference
                                </Button>
                            </div>
                        </CustomCard>

                        <div style={{ width: "50%", margin: "30px auto" }}>
                            <CustomCard>
                                <h5 className="text-center mt-3">
                                    Is your community in need of help? <br />
                                </h5>
                                <div
                                    className="d-flex justify-content-center"
                                    style={{ marginTop: "25px" }}
                                >
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={() => navigate("/disasters/create")}
                                    >
                                        Ask for it!
                                    </Button>
                                </div>
                            </CustomCard>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainSection;
