const db = require('../utils/db-conn');

const createProduct = async (product) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO products (nama, stok, harga, jenis_id, gambar, kode, hargaBeli, merk, createdAt, updatedAt)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`;
        db.run(query, [
            product.nama, product.stok, product.harga, product.jenisProdukId,
            product.gambar, product.kode, product.hargaBeli, product.merk
        ], function (err) {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve({ id: this.lastID, ...product });
        });
    });
};

const getAllProduct = async (page, limit) => {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit;
        const query = `SELECT p.*, c.name AS jenisProduk FROM products p
                       JOIN categories c ON p.jenis_id = c.id
                       LIMIT ? OFFSET ?`;
        db.all(query, [limit, offset], (err, rows) => {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            db.get('SELECT COUNT(*) AS total FROM products', [], (err, countRow) => {
                if (err) {
                    return reject(new Error('Internal server error: ' + err.message));
                }
                resolve({
                    products: rows,
                    pagination: {
                        page,
                        limit,
                        total: countRow.total,
                        totalPage: Math.ceil(countRow.total / limit)
                    }
                });
            });
        });
    });
};

const getProductById = async (productId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT p.*, c.name AS jenisProduk FROM products p
                       JOIN categories c ON p.jenis_id = c.id WHERE p.id = ?`;
        db.get(query, [productId], (err, row) => {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve(row);
        });
    });
};

const deleteProduct = async (productId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) AS count FROM detail_transactions WHERE product_id = ?', [productId], (err, row) => {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            if (row.count > 0) {
                return resolve('linked-to-transaction');
            }
            db.run('DELETE FROM products WHERE id = ?', [productId], function (err) {
                if (err) {
                    return reject(new Error('Internal server error: ' + err.message));
                }
                resolve({ message: 'Product deleted', id: productId });
            });
        });
    });
};

const updateProduct = async (productId, productUpdate) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE products SET nama = ?, stok = ?, harga = ?, hargaBeli = ?, merk = ?, kode = ?, gambar = ?, jenis_id = ?, updatedAt = datetime('now')
                       WHERE id = ?`;
        db.run(query, [
            productUpdate.nama, productUpdate.stok, productUpdate.harga,
            productUpdate.hargaBeli, productUpdate.merk, productUpdate.kode,
            productUpdate.gambar, productUpdate.jenisProdukId, productId
        ], function (err) {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve({ id: productId, ...productUpdate });
        });
    });
};

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    updateProduct
};
