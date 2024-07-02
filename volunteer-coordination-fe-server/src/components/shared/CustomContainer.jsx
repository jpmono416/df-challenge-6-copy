const CustomContainer = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                marginBottom: "2rem",
                marginTop: "2rem",
            }}
        >
            <div style={{ width: "70vw" }}>{children}</div>
        </div>
    );
};

export default CustomContainer;
