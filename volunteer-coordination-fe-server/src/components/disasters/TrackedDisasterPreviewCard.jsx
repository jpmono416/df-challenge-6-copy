import React from "react";
import { Link } from "react-router-dom";

const TrackedDisasterPreviewCard = ({ disaster }) => {
    return (
        <Link to={`/disasters/${disaster._id}`} style={{ textDecoration: "none" }}>
            <div
                style={{
                    width: "20vw",
                    height: "20vw",
                    margin: "10px 0",
                    maxWidth: "150px",
                    maxHeight: "150px",
                    minWidth: "100px",
                    minHeight: "100px",
                    borderRadius: "20px", // Adjusted for a card-like appearance
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #000",
                    padding: "20px",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    backgroundColor: "#fff", // Optional: Added background color for contrast
                }}
            >
                <h4 style={{ margin: "0", fontSize: "1em", color: "black" }}>
                    {disaster.location}
                </h4>
                <h6 style={{ margin: "0", color: "grey" }}>{disaster.description}</h6>
            </div>
        </Link>
    );
};

export default TrackedDisasterPreviewCard;
