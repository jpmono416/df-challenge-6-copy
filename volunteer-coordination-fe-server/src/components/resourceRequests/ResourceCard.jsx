const ResourceCard = ({ resource, onClick }) => {
    return (
        <div
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
            <p style={{ margin: "0", fontWeight: "bold" }}>{resource.requestedResourceType}</p>
            <p style={{ margin: "0" }}>
                {Math.round((resource.quantityFulfilled / resource.quantityNeeded) * 100)}% supplied
            </p>
        </div>
    );
};

export default ResourceCard;
