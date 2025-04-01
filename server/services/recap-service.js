const db = require('../utils/db-conn');

const getAllRecapData = () => {
    return new Promise((resolve, reject) => {
        const recapData = {};

        db.get('SELECT COUNT(id) AS totalTransaction FROM transactions', [], (err, row) => {
            if (err) return reject(err);
            recapData.totalTransaction = row.totalTransaction;
        });

        db.get('SELECT SUM(stok) AS totalProduct FROM products', [], (err, row) => {
            if (err) return reject(err);
            recapData.totalProduct = row.totalProduct || 0;
        });

        db.get('SELECT SUM(quantity) AS totalProductSold FROM detail_transactions', [], (err, row) => {
            if (err) return reject(err);
            recapData.totalProductSold = row.totalProductSold || 0;
        });

        db.get('SELECT SUM(total) AS totalIncome FROM transactions', [], (err, row) => {
            if (err) return reject(err);
            recapData.totalIncome = row.totalIncome || 0;
            resolve(recapData);
        });
    });
};

module.exports = {
    getAllRecapData
};
