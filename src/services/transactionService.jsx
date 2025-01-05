import axios from 'axios';

const API_URL = '/api/transaction';

const getAllTransaction = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

const getTransactionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

export default {
    getAllTransaction,
    getTransactionById
}