const CustomContainer = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
                width: "100vw",
            }}
        >
            <div style={{ width: "70vw" }}>{children}</div>
        </div>
    );
};

export default CustomContainer;
