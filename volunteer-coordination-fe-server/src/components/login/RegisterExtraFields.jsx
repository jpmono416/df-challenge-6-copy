import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BiInfoCircle } from "react-icons/bi";

export const RegisterExtraFields = ({
    confirmPassword,
    setConfirmPassword,
    wantsToVolunteer,
    setWantsToVolunteer,
}) => {
    return (
        <>
            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formWantsToVolunteer">
                <Form.Check
                    type="checkbox"
                    label={
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip-volunteer">
                                    You are always in control of when and how you help.
                                </Tooltip>
                            }
                        >
                            <span>
                                Do you wish to volunteer?
                                <BiInfoCircle />
                            </span>
                        </OverlayTrigger>
                    }
                    checked={wantsToVolunteer}
                    onChange={(e) => setWantsToVolunteer(e.target.checked)}
                />
            </Form.Group>
        </>
    );
};

export default RegisterExtraFields;
