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

module.exports = {
    getAllRecapData
}
