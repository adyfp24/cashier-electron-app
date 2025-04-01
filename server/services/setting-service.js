const db = require('../utils/db-conn');

const updateSettingName = async (updatedData) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE settings
                       SET nama_aplikasi = ?
                       WHERE id = ?`;
        db.run(query, [updatedData.appName, 1], function (err) {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve({ id: this.lastID, name: updatedData.name });
        });
    }
    );
};

const updateSettingLogo = async (updatedData) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE settings
                       SET logo_aplikasi = ?
                       WHERE id = ?`;
        db.run(query, [updatedData.appLogo, 1], function (err) {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve({ id: this.lastID, logo: updatedData.logo });
        });
    }
    );
};

const getAllSetting = async () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM settings`;
        db.all(query, [], (err, rows) => {
            if (err) {
                return reject(new Error('Internal server error: ' + err.message));
            }
            resolve(rows);
        });
    }
    );
}

module.exports = {
    updateSettingName,
    updateSettingLogo,
    getAllSetting
}