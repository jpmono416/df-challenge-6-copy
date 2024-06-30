const ResourcesRow = ({ resources }) => {
    return (
        resources.length > 0 && (
                <>
            <div className="text-center mb-4">
                <CustomHeader>Resources needed:</CustomHeader>
            </div>
            <Row className="justify-content-center">
                {resources.map((resource, index) => (
                    <Col key={index} sm={6} lg={3}>
                        <ResourceCard
                            resourceType={resource.requestedResourceType}
                            percComplete={
                                (resource.quantityFulfilled / resource.quantityNeeded) * 100
                            }
                        ></ResourceCard>
                    </Col>
                ))}
            </Row>
        </>)
        
    );
};

export default ResourcesRow;