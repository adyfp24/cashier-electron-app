const recapService = require('../services/recap-service');
const { clientErrorResponse, errorResponse, successResponse } = require('../middlewares/response');

const getAllRecapData = async (req, res) => {
    try {
        const response = await recapService.getAllRecapData();
        return successResponse(res, response, 'data rekap berhasil didapat');
    } catch (error) {
        return errorResponse(res, error);
    }
};

module.exports = {
    getAllRecapData
}
