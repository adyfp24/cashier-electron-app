import axios from 'axios';

const API_URL = '/api/recap';

const getAllRecapData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

export default {
    getAllRecapData
}