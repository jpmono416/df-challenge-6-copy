import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import CustomHeader from "./CustomHeader.jsx";
import { AuthContext } from "../../auth/AuthProvider.jsx";

const AppNavbar = () => {
    const { authToken, logout } = useContext(AuthContext); // Replace with your login logic
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <Navbar expand="lg" className="text-white px-5" style={{ backgroundColor: "#D97706" }}>
            <Navbar.Brand className="text-white px-1">
                <Nav.Link as={Link} to="/">
                    <img
                        src="/images/logo.png" // Replace with the actual path to your image
                        alt="Logo"
                        style={{ maxHeight: "60px" }}
                    />
                </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="text-white px-5">
                        <CustomHeader>Home</CustomHeader>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Disasters" className="text-white px-5">
                        <CustomHeader>Ongoing disasters</CustomHeader>
                    </Nav.Link>
                    {authToken !== "" ? (
                        <>
                            <Nav.Link as={Link} to="/Profile" className="text-white px-5">
                                <CustomHeader>Profile</CustomHeader>
                            </Nav.Link>
                            <Nav.Link
                                as={Button}
                                onClick={handleLogout}
                                className="text-white px-5"
                                style={{ cursor: "pointer" }}
                            >
                                <CustomHeader>Logout</CustomHeader>
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login" className="text-white px-1">
                            <CustomHeader>Login</CustomHeader>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
