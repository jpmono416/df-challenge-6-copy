import React from "react";
import CustomCard from "./CustomCard";

const InternalError = () => {
    return (
        <CustomCard>
            <h1>Internal Error</h1>
            <p>Sorry, something went wrong. Please try again later.</p>
        </CustomCard>
    );
};

export default InternalError;
