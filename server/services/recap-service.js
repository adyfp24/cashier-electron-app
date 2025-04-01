const db = require('../utils/db-conn');

const getAllRecapData = () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            new Promise((res, rej) => {
                db.get('SELECT COUNT(id) AS totalTransaction FROM transactions', [], (err, row) => {
                    if (err) return rej(err);
                    res(row.totalTransaction);
                });
            }),
            new Promise((res, rej) => {
                db.get('SELECT SUM(stok) AS totalProduct FROM products', [], (err, row) => {
                    if (err) return rej(err);
                    res(row.totalProduct || 0);
                });
            }),
            new Promise((res, rej) => {
                db.get('SELECT SUM(quantity) AS totalProductSold FROM detail_transactions', [], (err, row) => {
                    if (err) return rej(err);
                    res(row.totalProductSold || 0);
                });
            }),
            new Promise((res, rej) => {
                db.get('SELECT SUM(total) AS totalIncome FROM transactions', [], (err, row) => {
                    if (err) return rej(err);
                    res(row.totalIncome || 0);
                });
            })
        ])
        .then(([totalTransaction, totalProduct, totalProductSold, totalIncome]) => {
            resolve({
                totalTransaction,
                totalProduct,
                totalProductSold,
                totalIncome
            });
        })
        .catch(reject);
    });
};

module.exports = {
    getAllRecapData
};
