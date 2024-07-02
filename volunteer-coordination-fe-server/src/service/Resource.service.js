import axios from "axios";
import Config from "../config/Config.js";

class ResourceService {
    static CreateResourceRequest = async (resourceDetails, token) => {
        try {
            const response = await axios.post(`${Config.backendUrl()}/resources`, resourceDetails, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating resource:", error);
            return {
                failed: true,
                message:
                    "An unexpected error occurred while creating the resource. Please try again.",
            };
        }
    };
}

export default ResourceService;
