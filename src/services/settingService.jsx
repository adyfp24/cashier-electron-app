const axios = require('axios');
const API_URL ='/api/setting';


const getAllSetting = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const updateSettingName = async (data) => {
    try {
        console.log('Data yang dikirim ke API (debug):', Array.from(data.entries()));
        const response = await axios.put(`${API_URL}/name`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.data;
    } catch (error) {
        throw new Error('internal server error: ' + error.message);
    }
};

const updateSettingLogo = async (data) => {
    try {
        console.log('Data yang dikirim ke API (debug):', Array.from(data.entries()));
        const response = await axios.put(`${API_URL}/logo`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.data;
    } catch (error) {
        throw new Error('internal server error: ' + error.message);
    }
};

module.exports = {
    getAllSetting,
    updateSettingName,
    updateSettingLogo,
}
