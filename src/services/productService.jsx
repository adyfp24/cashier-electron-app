import axios from 'axios';

const API_URL = '/api/product'; 

const getAll = async () => {
    const response = await axios.get(API_URL);
    return response.data.data; 
};

const getById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
};

const addProduct = async (newProduct) => {
    const response = await axios.post(API_URL, newProduct);
    return response.data.data;
};

const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
};

const updateProduct = async (id, updatedProduct) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data.data;
};

export default {
    getAll,
    getById,
    addProduct,
    deleteProduct,
    updateProduct
};
