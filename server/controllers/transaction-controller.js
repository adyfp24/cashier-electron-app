const transactionService = require('../services/transaction-service');
const { successResponse, clientErrorResponse, errorResponse } = require('../middlewares/response');

const getAllTransaction = async (req, res) => {
    try {
        const {page, limit} = req.pagination;
        const transactions = await transactionService.getAllTransaction(page, limit);
        if(transactions.length == 0){
            return clientErrorResponse(res, "data transaksi tidak tersedia")
        }
        return successResponse(res, transactions, "data transaksi berhasil didapat");
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getTransactionById = async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await transactionService.getTransactionById(id);
        if(!transaction){
            return clientErrorResponse(res, "data transaksi tidak tersedia")
        }
        return successResponse(res, transaction, "data transaksi berhasil didapat");
    } catch (error) {
        return errorResponse(res, error);
    }
}

const exportTransactionHistory = async (req, res) => {
    try {
        const transactionBuffer = await transactionService.exportTransactionHistory();
        res.setHeader('Content-Disposition', 'attachment; filename="riwayat-transaksi.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(transactionBuffer);
    } catch (error) {
        return errorResponse(res, error);
    }
}

module.exports = {
    getAllTransaction,
    getTransactionById,
    exportTransactionHistory
}