const db = require('../utils/db-conn')

const createCategory = async (data) => {
    return new Promise((resove, reject) => {
        const query = `INSERT INTO categories (name)
                       VALUES (?)`;
        db.run(query, [data], function (err) {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resove({ id: this.lastID, name: data });
        });
    }
    );
};

const getAllCategory = async () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM categories`;
        db.all(query, [], (err, rows) => {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve(rows);
        });
    });
}

module.exports = {
    createCategory,
    getAllCategory
}