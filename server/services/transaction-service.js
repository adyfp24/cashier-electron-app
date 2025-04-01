const db = require('../utils/db-conn');

const getAllTransaction = (page, limit) => {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit;

        db.all(`
            SELECT t.id, t.tanggal, t.total, 
                   dt.quantity, dt.subtotal, 
                   p.nama as product_name, p.harga as product_price
            FROM transactions t
            LEFT JOIN detail_transactions dt ON t.id = dt.transaction_id
            LEFT JOIN products p ON dt.product_id = p.id
            LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
            if (err) reject(new Error('Internal server error: ' + err.message));

            db.get('SELECT COUNT(*) AS total FROM transactions', (err, countResult) => {
                if (err) reject(new Error('Internal server error: ' + err.message));

                const transactions = {};
                rows.forEach(row => {
                    if (!transactions[row.id]) {
                        transactions[row.id] = {
                            id: row.id,
                            tanggal: row.tanggal,
                            total: row.total,
                            details: []
                        };
                    }
                    transactions[row.id].details.push({
                        product_name: row.product_name,
                        product_price: row.product_price,
                        quantity: row.quantity,
                        subtotal: row.subtotal
                    });
                });

                resolve({
                    transactions: Object.values(transactions),
                    pagination: {
                        page,
                        limit,
                        total: countResult.total,
                        totalPage: Math.ceil(countResult.total / limit)
                    }
                });
            });
        });
    });
};

const getTransactionById = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT t.id, t.tanggal, t.total, 
                   dt.quantity, dt.subtotal, 
                   p.nama as product_name, p.harga as product_price
            FROM transactions t
            LEFT JOIN detail_transactions dt ON t.id = dt.transaction_id
            LEFT JOIN products p ON dt.product_id = p.id
            WHERE t.id = ?`, [id], (err, rows) => {
            if (err) reject(new Error('Internal server error: ' + err.message));

            if (rows.length === 0) resolve(null);

            const transaction = {
                id: rows[0].id,
                tanggal: rows[0].tanggal,
                total: rows[0].total,
                details: rows.map(row => ({
                    product_name: row.product_name,
                    product_price: row.product_price,
                    quantity: row.quantity,
                    subtotal: row.subtotal
                }))
            };
            resolve(transaction);
        });
    });
};

const exportTransactionHistory = () => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT t.id, t.tanggal, t.total, 
                   dt.quantity, dt.subtotal, 
                   p.nama as product_name
            FROM transactions t
            LEFT JOIN detail_transactions dt ON t.id = dt.transaction_id
            LEFT JOIN products p ON dt.product_id = p.id`, [], async (err, rows) => {
            if (err) reject(new Error('Internal server error: ' + err.message));

            const workbook = new excelJs.Workbook();
            const worksheet = workbook.addWorksheet('Transaction History');

            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Tanggal', key: 'tanggal', width: 20 },
                { header: 'Total', key: 'total', width: 20 },
                { header: 'Detail', key: 'detail', width: 60 },
            ];

            rows.forEach((row, index) => {
                worksheet.addRow({
                    id: index === 0 ? row.id : '',
                    tanggal: index === 0 ? row.tanggal.split('T')[0] : '',
                    total: index === 0 ? row.total : '',
                    detail: `Nama: ${row.product_name}, Kuantitas: ${row.quantity}, Subtotal: ${row.subtotal}`,
                });
            });

            worksheet.getRow(1).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF00' },
                };
                cell.font = { bold: true };
            });

            const buffer = await workbook.xlsx.writeBuffer();
            resolve(buffer);
        });
    });
};

module.exports = {
    getAllTransaction,
    getTransactionById,
    exportTransactionHistory
};
