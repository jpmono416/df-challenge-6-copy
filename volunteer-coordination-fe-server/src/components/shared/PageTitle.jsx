import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

const PageTitle = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Card className="text-center titleCard">
            <Card.Body>
                <h1>{title}</h1>
            </Card.Body>
        </Card>
    );
};

export default PageTitle;
