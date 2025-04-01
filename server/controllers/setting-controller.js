const { successResponse, errorResponse, notFoundResponse } = require('../middlewares/response');
const settingService = require('../services/setting-service');

const getAllSetting = async (req, res) => {
    try {
        const allSetting = await settingService.getAllSetting();
        if (allSetting.length == 0) {
            return notFoundResponse(res, "data setting tidak tersedia")
        }
        return successResponse(res, allSetting, 'data setting berhasil didapat');
    } catch (error) {
        return errorResponse(res, error);
    }
}

const updateSettingName = async (req, res) => {
    try {
        console.log('Data dari req.body:', req.body); // Debugging
        const { nama } = req.body;
        const data = {
            appName: nama || undefined,
        };
        console.log('Data yang diteruskan ke service:', data); // Debugging
        const newSetting = await settingService.updateSettingName(data);
        return successResponse(res, newSetting, 'setting baru berhasil dibuat');
    } catch (error) {
        console.error('Error di controller:', error.message);
        return errorResponse(res, error);
    }
};

const updateSettingLogo = async (req, res) => {
    try {
        console.log('Data dari req.body:', req.body); // Debugging
        const logo = req.file.filename;
        const data = {
            appLogo: logo ? '/images/' + logo : undefined
        };
        console.log('Data yang diteruskan ke service:', data); // Debugging
        const newSetting = await settingService.updateSettingLogo(data);
        return successResponse(res, newSetting, 'setting baru berhasil dibuat');
    } catch (error) {
        console.error('Error di controller:', error.message);
        return errorResponse(res, error);
    }
};

module.exports = {
    getAllSetting,
    updateSettingName,
    updateSettingLogo,
}