import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";

const TrackedDisasterPreviewCard = ({ disaster, maxHeight, updateMaxHeight }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            const currentHeight = cardRef.current.offsetHeight;
            updateMaxHeight(currentHeight);
        }
    }, [updateMaxHeight]);

    return (
        <Link
            to={`/disasters/${disaster._id}`}
            style={{ textDecoration: "none", margin: "10px 0" }}
        >
            <div
                ref={cardRef}
                style={{
                    //? This ensures responsiveness while having 150px as the max width
                    //? it's a high vw value for it to always hit maxWidth on mobiles and not look than 150px
                    width: "40vw",
                    height: "100%",
                    maxWidth: "150px",
                    minWidth: "100px",
                    minHeight: "100px",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #000",
                    padding: "20px",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                }}
            >
                <h4 style={{ margin: "0", fontSize: "1em", color: "black" }}>
                    {disaster.location}
                </h4>
                <h6 style={{ margin: "10px 0", color: "grey" }}>{disaster.description}</h6>
                <StatusBadge status={disaster.status} />
            </div>
        </Link>
    );
};

export default TrackedDisasterPreviewCard;
