const db = require('../utils/db-conn');
const bcrypt = require('bcrypt');
const utilsToken = require('../utils/sign-token');

// Login function
const login = (username, password) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
            if (err) {
                reject(new Error('Database Error: ' + err.message));
                return;
            }
            if (!user) {
                resolve({ success: false, message: 'Username tidak valid' });
                return;
            }

            const isPasswordValid = user.password === password;
            if (isPasswordValid) {
                const apiToken = utilsToken.generateJWT(user.id);
                resolve({ success: true, data: { user, token: apiToken } });
            } else {
                resolve({ success: false, message: 'Password salah' });
            }
        });
    });
};

// Register function
const register = (username, password) => {
    return new Promise(async (resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
                reject(new Error('Database Error: ' + err.message));
                return;
            }
            if (user) {
                resolve({ success: false, message: 'Username telah digunakan' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.run(
                'INSERT INTO users (username, password, createdAt, updatedAt) VALUES (?, ?, datetime("now"), datetime("now"))',
                [username, hashedPassword],
                function (err) {
                    if (err) {
                        reject(new Error('Database Insert Error: ' + err.message));
                        return;
                    }
                    resolve({
                        success: true,
                        data: { id: this.lastID, username },
                    });
                }
            );
        });
    });
};

module.exports = {
    login,
    register,
};
