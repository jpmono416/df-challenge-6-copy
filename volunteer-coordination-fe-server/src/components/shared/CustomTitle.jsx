const CustomTitle = ({ children }) => {
    return (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "28px" }}>{children}</h1>
            <hr style={{ width: "50%", border: "1px solid #000", margin: "auto" }} />
        </div>
    );
};

export default CustomTitle;