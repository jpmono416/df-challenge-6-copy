const ResourceCard = ({ resource, onClick }) => {
    const completionPercentage = Math.round(
        (resource.quantityFulfilled / resource.quantityNeeded) * 100
    );
    const individualClassName = `fillCircle${resource._id}`;

    const getFillColour = () => {
        switch (resource.urgencyLevel) {
            case "Low":
                return "#28a745";
            case "Medium":
                return "#ffc107";
            case "High":
                return "#dc3545";
            case "Critical":
                return "#dc3545";
            default:
                return "#007bff";
        }
    };
    return (
        <>
            <style>
                {`
                    .${individualClassName}::before {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: ${completionPercentage}%;
                        background-color: ${getFillColour()};
                        border-radius: 50%;
                        z-index: 0;
                        transition: height 0.3s ease;
                    }
                    .${individualClassName} {
                        position: relative;
                        overflow: hidden;
                    }
                `}
            </style>
            <div
                className={individualClassName}
                style={{
                    width: "20vw",
                    height: "20vw",
                    margin: "10px 0",
                    maxWidth: "150px",
                    maxHeight: "150px",
                    minWidth: "100px",
                    minHeight: "100px",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #000",
                    padding: "20px",
                    boxSizing: "border-box",
                    cursor: "pointer",
                }}
                onClick={onClick}
            >
                <p style={{ margin: "0", fontWeight: "bold", zIndex: "1", position: "relative" }}>
                    {resource.requestedResourceType}
                </p>
                <p style={{ margin: "0", zIndex: "1", position: "relative" }}>
                    {completionPercentage}% supplied
                </p>
            </div>
        </>
    );
};

export default ResourceCard;
