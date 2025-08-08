// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Use the same secret key from auth.js

const authenticateToken = (req, res, next) => {
    // Get the authorization header from the request
    const authHeader = req.headers['authorization'];
    // Extract the token (e.g., "Bearer TOKEN_STRING")
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, return an Unauthorized error
    if (token == null) {
        return res.status(401).json({ error: "No authentication token provided." });
    }

    // Verify the token using the secret key
    jwt.verify(token, SECRET_KEY, (err, user) => {
        // If there's an error (e.g., token is invalid or expired), return a Forbidden error
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token." });
        }
        // If the token is valid, attach the user data to the request object
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = authenticateToken;