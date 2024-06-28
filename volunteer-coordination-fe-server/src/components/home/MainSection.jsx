import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomCard from "../shared/CustomCard.jsx";

const MainSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <Container className="mt-4">
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <CustomCard>
                            <h5 className="text-center mt-3">
                                There are currently 0 active natural disasters looking for
                                humanitarian help.
                            </h5>
                            <div
                                className="d-flex justify-content-center"
                                style={{ marginTop: "25px" }}
                            >
                                <Button variant="success" size="lg">
                                    Make a difference
                                </Button>
                            </div>
                        </CustomCard>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainSection;
