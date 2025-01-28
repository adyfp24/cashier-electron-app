const { successResponse, errorResponse, notFoundResponse } = require('../middlewares/response');
const settingService = require('../services/setting-service');

const getAllSetting = async (req, res) => {
    try {
        const allSetting = await settingService.getAllSetting();
        if(allSetting.length == 0){
            return notFoundResponse(res, "data setting tidak tersedia")
        }
        return successResponse(res, allSetting, 'data setting berhasil didapat');
    } catch (error) {
        return errorResponse(res, error);
    }
}

const updateSetting = async (req, res) => {
    try {
        const { nama, logo } = req.body;
        const data = {
            nama,
            logo
        };
        const newSetting = await settingService.updateSetting(data);
        return successResponse(res, newSetting, 'setting baru berhasil dibuat');
    } catch (error) {
        console.error('Error di controller:', error.message);
        return errorResponse(res, error);
    }
};

module.exports = {
    getAllSetting,
    updateSetting
}