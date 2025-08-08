// routes/orders.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

const dbPath = path.resolve(__dirname, "../db/ecommerce.db");
const db = new sqlite3.Database(dbPath);

// Endpoint for checkout, protected by authentication middleware
router.post("/checkout", authenticateToken, (req, res) => {
    const { cart } = req.body;
    const userId = req.user.userId; // User ID from the authenticated token
    const orderDate = new Date().toISOString();

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: "Cart cannot be empty." });
    }

    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0);

    // Begin a database transaction
    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");

        // Insert a new order
        const insertOrderSql = "INSERT INTO orders (user_id, total_amount, order_date) VALUES (?, ?, ?)";
        db.run(insertOrderSql, [userId, totalAmount, orderDate], function(err) {
            if (err) {
                db.run("ROLLBACK;");
                return res.status(500).json({ error: err.message });
            }

            const orderId = this.lastID;
            const insertItemSql = "INSERT INTO order_items (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)";
            const stmt = db.prepare(insertItemSql);

            cart.forEach(item => {
                const priceValue = parseFloat(item.price);
                stmt.run(orderId, item.name, priceValue, 1); // Assuming quantity is 1 for now
            });

            stmt.finalize();
            db.run("COMMIT;", (commitErr) => {
                if (commitErr) {
                    return res.status(500).json({ error: commitErr.message });
                }
                res.json({ success: true, message: "Order placed successfully!", orderId: orderId });
            });
        });
    });
});

module.exports = router;