const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, "userData.db"));

db.serialize(() => {
    // Create the user table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL unique,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`);
});

module.exports = db;