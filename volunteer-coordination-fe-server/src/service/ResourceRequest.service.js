import axios from "axios";



const sendResourceRequests = async () => {
    for (const request of sampleResourceRequests) {
        try {
            const response = await axios.post('http://your-backend-endpoint/resourceRequests', request);
            console.log(`Request sent successfully for ID: ${request._id}, Status: ${response.status}`);
        } catch (error) {
            console.error(`Failed to send request for ID: ${request._id}, Error: ${error}`);
        }
    }
};

sendResourceRequests();