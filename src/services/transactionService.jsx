import axios from 'axios';

const API_URL = '/api/transaction';
const excelJs = require('exceljs');

const getAllTransaction = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.data.data);
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

const exportTransactionHistory = async () => {
    try {
        const response = await axios.get(`${API_URL}/export`, {
            responseType: 'blob', 
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'riwayat-transaksi.xlsx'); // Nama file unduhan
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (e) {
        throw new Error(e.message)
    }
}

export default {
    getAllTransaction,
    getTransactionById,
    exportTransactionHistory
}