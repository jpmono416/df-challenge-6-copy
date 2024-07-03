import React, { useContext, useEffect } from "react";
import CustomCard from "../shared/CustomCard";
import CustomContainer from "../shared/CustomContainer";
import CustomTitle from "../shared/CustomTitle";
import CustomHeader from "../shared/CustomHeader";
import TrackedDisasterPreviewCard from "../disasters/TrackedDisasterPreviewCard";
import UserService from "../../service/User.service";

import { AuthContext } from "../../auth/AuthProvider";
import DisasterPreviewRow from "../disasters/DisasterPreviewRow";

const ProfileCard = () => {
    const { userDetails, updateUserDetails } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Profile";
        const fetchUserDetails = async () => {
            if (userDetails && userDetails._id) {
                const response = await UserService.getUserById(userDetails._id);
                if (!response.failed) {
                    updateUserDetails(response);
                }
            }
        };

        fetchUserDetails();
    }, [userDetails._id]);

    return (
        <CustomContainer>
            <CustomCard>
                <CustomTitle>Profile</CustomTitle>
                <CustomHeader>Name: {userDetails.name}</CustomHeader>
                <CustomHeader>Email: {userDetails.email}</CustomHeader>
                {userDetails.roles && userDetails.roles.length > 0 && (
                    <CustomHeader>Roles: {userDetails.roles.join(", ")}</CustomHeader>
                )}
                {userDetails.trackedDisasters && userDetails.trackedDisasters.length > 0 && (
                    <DisasterPreviewRow disasters={userDetails.trackedDisasters} />
                )}
            </CustomCard>
        </CustomContainer>
    );
};

export default ProfileCard;
