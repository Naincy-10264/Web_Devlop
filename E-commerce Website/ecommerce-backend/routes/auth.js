// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken"); // Make sure jsonwebtoken is required

const dbPath = path.resolve(__dirname, "../db/ecommerce.db");
const db = new sqlite3.Database(dbPath);

const SECRET_KEY = "your_secret_key"; // Use a strong, secret key

// Signup (no changes needed)
router.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.run(sql, [username, email, hash], function (err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(409).json({ error: "Email already registered" });
                }
                return res.status(400).json({ error: err.message });
            }
            res.json({ success: true, userId: this.lastID });
        });
    });
});

// Signin (update this route)
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: "Invalid credentials" });

        bcrypt.compare(password, row.password, (compareErr, result) => {
            if (compareErr) {
                return res.status(500).json({ error: "Error comparing passwords" });
            }
            if (!result) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Generate a JWT token that expires in 1 day
            const expiresIn = '1d';
            const token = jwt.sign(
                { userId: row.id, email: row.email, username: row.username },
                SECRET_KEY,
                { expiresIn: expiresIn }
            );

            // Calculate the expiration time as a timestamp for the frontend
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in milliseconds

            // Send the token and expiry time back to the client
            res.json({
                success: true,
                token,
                user: { id: row.id, username: row.username, email: row.email },
                tokenExpiry: expirationTime
            });
        });
    });
});

module.exports = router;