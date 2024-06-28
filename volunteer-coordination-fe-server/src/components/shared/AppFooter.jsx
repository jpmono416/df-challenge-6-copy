import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AppFooter = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>
                            Our platform is dedicated to bringing communities together in times of
                            natural disasters. We believe that by connecting volunteers with those
                            in need, we can make a positive impact and provide support during
                            challenging times. Our platform aims to streamline the process of
                            volunteering, making it easier for individuals to find opportunities and
                            contribute with time, skills or resources needed. Together, we are
                            stronger.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact</h5>
                        <p>Email: getintouch@helphive.com</p>
                        <p>Phone: +44 1234 567890</p>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <p>
                            <a
                                href="https://www.facebook.com/digital.futures2021/"
                                className="text-white"
                            >
                                Facebook
                            </a>{" "}
                            |{" "}
                            <a href="https://x.com/digitalfutures0?lang=en" className="text-white">
                                Twitter
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://www.linkedin.com/company/digital-futures2021/?originalSubdomain=uk"
                                className="text-white"
                            >
                                LinkedIn
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-3">
                <p>&copy; 2024 HelpHive. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default AppFooter;
