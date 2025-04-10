const recapService = require('../services/recap-service');
const { clientErrorResponse, errorResponse, successResponse } = require('../middlewares/response');

const getAllRecapData = async (req, res) => {
    try {
        const { month, year } = req.query;
        const response = await recapService.getAllRecapData({ month, year });
        return successResponse(res, response, 'data rekap berhasil didapat');
    } catch (error) {
        return errorResponse(res, error);
    }
};

const getAvailableYears = async (req, res) => {
    try {
        const response = await recapService.getAvailableYears();
        return successResponse(res, response, 'data tahun berhasil didapat');
    } catch (error) {
        return errorResponse(res, error);
    }
}

module.exports = {
    getAllRecapData,
    getAvailableYears
}
