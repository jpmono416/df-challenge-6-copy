import axios from "axios";
import Config from "../config/Config.js";

class ResourceService {
    static deleteResourceRequest = async (resourceId, token) => {
        try {
            const response = await axios.delete(`${Config.backendUrl()}/resources`, {
                data: { id: resourceId },
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting resource:", error);
            return {
                failed: true,
                message:
                    "An unexpected error occurred while deleting the resource. Please try again.",
            };
        }
    };
}

export default ResourceService;
