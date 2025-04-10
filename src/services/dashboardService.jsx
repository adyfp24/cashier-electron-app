import axios from 'axios';

const API_URL = '/api/recap';

const getAllRecapData = async ({ month = null, year = null }) => {
    try {
        const params = {};
        if (month) params.month = month;
        if (year) params.year = year;

        const response = await axios.get(API_URL, { params });
        return response.data.data;
    } catch (e) {
        throw new Error(e.message);
    }
};

const getAvailableYears = async () => {
    try {
        const response = await axios.get(`${API_URL}/years`);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
}

export default {
    getAllRecapData,
    getAvailableYears
}