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
            }),
            new Promise((res, rej) => {
                if (!year) return res([]); // only get monthly data if year is provided

                db.all(
                    `SELECT 
                        strftime('%m', tanggal) AS month,
                        COUNT(id) AS totalTransaction,
                        SUM(total) AS totalIncome
                     FROM transactions
                     WHERE strftime('%Y', tanggal) = ?
                     GROUP BY month
                     ORDER BY month`,
                    [year],
                    (err, rows) => {
                        if (err) return rej(err);
                        // Ensure 12 months included (fill missing months with 0)
                        const monthlyData = Array.from({ length: 12 }, (_, i) => {
                            const m = String(i + 1).padStart(2, '0');
                            const row = rows.find(r => r.month === m);
                            return {
                                month: m,
                                totalTransaction: row?.totalTransaction || 0,
                                totalIncome: row?.totalIncome || 0,
                            };
                        });
                        res(monthlyData);
                    }
                );
            })
        ])
        .then(([totalTransaction, totalProduct, totalProductSold, totalIncome, monthList]) => {
            resolve({
                totalTransaction,
                totalProduct,
                totalProductSold,
                totalIncome,
                monthList
            });
        })
        .catch(reject);
    });
};

const getAvailableYears = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT DISTINCT strftime("%Y", tanggal) AS year FROM transactions ORDER BY year DESC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows.map(row => row.year));
        });
    });
}

module.exports = {
    getAllRecapData,
    getAvailableYears
}
