// routes/auth.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const router = express.Router();

const dbPath = path.resolve(__dirname, "../db/ecommerce.db");
const db = new sqlite3.Database(dbPath);

// Signup
router.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.run(sql, [username, email, password], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ success: true, userId: this.lastID });
    });
});

// Signin
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.get(sql, [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ success: true, user: row });
    });
});

module.exports = router;
