import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../auth/AuthProvider.jsx";
import UserService from "../../service/User.service.js";
import CustomCard from "../shared/CustomCard.jsx";
import { RegisterExtraFields } from "./RegisterExtraFields.jsx";

const LoginCard = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wantsToVolunteer, setWantsToVolunteer] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const { addLoginToContext } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSwitchForm = () => {
        setName("");
        setIsRegister(!isRegister);
        setConfirmPassword("");
        setValidationMessage("");
        setWantsToVolunteer(false);
        //? Intentionally not resetting the email/pw when switching forms as it can be annoying for the user to reenter those in the right form
    };

    //* This processes a custom json response object served by the service with error details or user/token data
    const processUserAuthenticationResponse = async (response) => {
        if (response.failed) {
            setValidationMessage(response.message);
            return false;
        }

        const { user, token } = response;

        addLoginToContext(user, token);

        navigate("/");
        return true;
    };

    const processValidation = () => {
        const validation = UserService.validateCredentials({
            name,
            email,
            password,
            confirmPassword,
        });

        if (!validation.isValid) {
            setValidationMessage(validation.message);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationMessage("");
        let response;

        if (isRegister) {
            if(!processValidation()) return;
            response = await UserService.registerUser({ name, email, password, wantsToVolunteer });
        } else {
            response = await UserService.loginUser({ email, password });
        }
        await processUserAuthenticationResponse(response);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
                width: "100%",
            }}
        >
            <div style={{ width: "500px" }}>
                <CustomCard>
                    <Card.Title>{isRegister ? "Register" : "Login"}</Card.Title>
                    {validationMessage && <Alert variant="danger">{validationMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {isRegister && (
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        )}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {isRegister && (
                            <RegisterExtraFields
                                confirmPassword={confirmPassword}
                                setConfirmPassword={setConfirmPassword}
                                wantsToVolunteer={wantsToVolunteer}
                                setWantsToVolunteer={setWantsToVolunteer}
                            />
                        )}

                        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
                            {isRegister ? "Register" : "Login"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleSwitchForm}
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                        >
                            Switch to {isRegister ? "Login" : "Register"}
                        </Button>
                    </Form>
                </CustomCard>
            </div>
        </div>
    );
};

export default LoginCard;
