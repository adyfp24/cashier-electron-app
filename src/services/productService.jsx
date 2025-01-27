import axios from 'axios';

const API_URL = '/api/product';

const getAll = async (page) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

const addProduct = async (newProduct) => {
    try {
        const response = await axios.post(API_URL, newProduct, {
            headers: { 'Content-Type': 'multipart/form-data' }, 
        });
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedProduct, {
            headers: { 'Content-Type': 'multipart/form-data' }, 
        });
        return response.data.data;
    } catch (e) {
        throw new Error(e.message)
    }
};

export default {
    getAll,
    getById,
    addProduct,
    deleteProduct,
    updateProduct
};
