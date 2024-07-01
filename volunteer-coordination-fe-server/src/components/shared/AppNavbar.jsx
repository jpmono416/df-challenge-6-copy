import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../../auth/AuthProvider.jsx";

const AppNavbar = () => {
    const { authToken, logout } = useContext(AuthContext); // Replace with your login logic
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <Navbar bg="dark" expand="lg" className="text-white px-5">
            <Navbar.Brand href="#" className="text-white px-1">
                Logo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="text-white px-5">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Disasters" className="text-white px-5">
                        Ongoing disasters
                    </Nav.Link>
                    {authToken !== "" ? (
                        <>
                            <Nav.Link as={Link} to="/Profile" className="text-white px-5">
                                Profile
                            </Nav.Link>
                            <Nav.Link
                                as={Button}
                                onClick={handleLogout}
                                className="text-white px-5"
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login" className="text-white px-1">
                            Login
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
