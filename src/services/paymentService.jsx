import axios from 'axios';

const API_URL = '/api/payment';

const createPayment = async () => {
    try {
        const response = await axios.post(API_URL);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
}

const createReceipt = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/struct`);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
}

export default {
    createPayment,
    createReceipt
}

