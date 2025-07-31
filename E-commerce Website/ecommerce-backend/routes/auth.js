// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const router = express.Router();

const dbPath = path.resolve(__dirname, "../db/ecommerce.db");
const db = new sqlite3.Database(dbPath);

// Signup
router.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hash) => { // 10 is the salt rounds
        if (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.run(sql, [username, email, hash], function (err) { // Use the hash here
            if (err) {
                // Check for unique email constraint error more specifically if possible
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(409).json({ error: "Email already registered" });
                }
                return res.status(400).json({ error: err.message });
            }
            res.json({ success: true, userId: this.lastID });
        });
    });
});

// Signin
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // Corrected SQL: Only query by email. Password comparison is done with bcrypt.
    const sql = "SELECT * FROM users WHERE email = ?"; 
    db.get(sql, [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: "Invalid credentials" }); // No user found with that email

        // Compare provided password with stored hash
        bcrypt.compare(password, row.password, (compareErr, result) => {
            if (compareErr) {
                return res.status(500).json({ error: "Error comparing passwords" });
            }
            if (!result) { // Passwords do not match
                return res.status(401).json({ error: "Invalid credentials" });
            }
            // Passwords match, proceed with login
            // You might want to include a token here for session management
            res.json({ success: true, user: { id: row.id, username: row.username, email: row.email } });
        });
    });
});

module.exports = router;