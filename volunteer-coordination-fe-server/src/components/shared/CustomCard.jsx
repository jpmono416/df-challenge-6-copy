import React from "react";
import Card from "react-bootstrap/Card";

const CustomCard = ({ children }) => {
    const customStyle = {
        borderRadius: "2rem",
        borderTopLeftRadius: "0rem",
        borderBottomRightRadius: "0rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    };

    return (
        <Card style={customStyle}>
            <Card.Body>{children}</Card.Body>
        </Card>
    );
};

export default CustomCard;
