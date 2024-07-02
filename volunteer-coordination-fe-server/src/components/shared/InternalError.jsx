import React, { useEffect } from "react";
import CustomCard from "./CustomCard";

const InternalError = () => {
    useEffect(() => {
        document.title = "HelpHive - Error";
    }, []);
    return (
        <CustomCard>
            <h1>Internal Error</h1>
            <p>Sorry, something went wrong. Please try again later.</p>
        </CustomCard>
    );
};

export default InternalError;
