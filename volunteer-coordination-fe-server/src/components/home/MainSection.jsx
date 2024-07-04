import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomCard from "../shared/CustomCard.jsx";
import DisasterService from "../../service/Disaster.service";
import MainText from "./MainText.jsx";
import PageTitle from "../shared/PageTitle";
import { AuthContext } from "../../auth/AuthProvider";

const MainSection = () => {
    const navigate = useNavigate();
    const [disasterCount, setDisasterCount] = useState(0);
    const { authToken } = useContext(AuthContext);
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
                        <PageTitle title="Volunteering, but easy." />
                        <CustomCard className={"mainCard"}>
                            <MainText disasterCount={disasterCount} />
                            <div
                                className="d-flex justify-content-center"
                                style={{ marginTop: "25px" }}
                            >
                                <Button
                                    className="primaryButton"
                                    size="lg"
                                    onClick={() => navigate("/disasters")}
                                >
                                    Make a difference
                                </Button>
                            </div>
                        </CustomCard>

                        <div style={{ width: "50%", margin: "30px auto" }}>
                            <CustomCard className={"customCard"}>
                                <h5 className="text-center mt-3">
                                    Is your community in need of help? <br />
                                </h5>
                                <div
                                    className="d-flex justify-content-center"
                                    style={{ marginTop: "25px" }}
                                >
                                    <Button
                                        className="secondaryButton"
                                        size="lg"
                                        onClick={() => {
                                            // Check if authToken is present, if not navigate to /login
                                            authToken
                                                ? navigate("/disasters/create")
                                                : navigate("/login");
                                        }}
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
