import axios from 'axios';

const API_URL = '/api';

const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data.data;
    } catch (error) {
        throw new Error(error);
    }
}

const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data.data;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    login,
    register
}