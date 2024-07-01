import React from "react";
import { Button } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const TrackDisasterButton = ({ onClick }) => {
    return (<Button
        style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor: "#FBC02D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
        }}
        onClick={onClick}
    >
        <BsStarFill />
    </Button>)
};

export default TrackDisasterButton;
    