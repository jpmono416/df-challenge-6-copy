import React from "react";
import Card from "react-bootstrap/Card";

const CustomCard = ({ children, className }) => {
    return (
        <Card className={className}>
            <Card.Body>{children}</Card.Body>
        </Card>
    );
};

export default CustomCard;
