import React from "react";
import { Button } from "react-bootstrap";
import { TbStarOff } from "react-icons/tb";

const UntrackDisasterButton = ({ onClick }) => {
    return (
        <Button
            style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                backgroundColor: "#B71C1C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
            }}
            onClick={onClick}
        >
            <TbStarOff />
        </Button>
    );
};

export default UntrackDisasterButton;
