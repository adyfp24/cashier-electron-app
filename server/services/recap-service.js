const db = require('../utils/db-conn');

const getAllRecapData = ({ month, year }) => {
    return new Promise((resolve, reject) => {
        const filters = [];
        const values = [];

        if (year) {
            filters.push(`strftime('%Y', tanggal) = ?`);
            values.push(year);
        }
        if (month) {
            filters.push(`strftime('%m', tanggal) = ?`);
            values.push(month.padStart(2, '0')); // make sure it's '01', '02', etc.
        }

        const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

        Promise.all([
            new Promise((res, rej) => {
                db.get(`SELECT COUNT(id) AS totalTransaction FROM transactions ${whereClause}`, values, (err, row) => {
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
                db.get(
                    `SELECT SUM(quantity) AS totalProductSold 
                     FROM detail_transactions 
                     WHERE transaction_id IN (
                         SELECT id FROM transactions ${whereClause}
                     )`,
                    values,
                    (err, row) => {
                        if (err) return rej(err);
                        res(row.totalProductSold || 0);
                    }
                );
            }),
            new Promise((res, rej) => {
                db.get(`SELECT SUM(total) AS totalIncome FROM transactions ${whereClause}`, values, (err, row) => {
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
}
