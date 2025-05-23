const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../../prisma/pos.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
    } else {
        console.log('✅ Connected to the SQLite database.');
    }
});

module.exports = db;
