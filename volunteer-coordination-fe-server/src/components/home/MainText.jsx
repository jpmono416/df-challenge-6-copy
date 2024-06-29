const MainText = ({disasterCount}) => {

    return (
        <h5 className="text-center mt-3">
            {`There ${
                disasterCount !== 1 ? "are" : "is"
            } currently ${disasterCount} active natural ${
                disasterCount !== 1 ? "disasters" : "disaster"
            } looking for humanitarian help.`}
        </h5>
    );
};

export default MainText;