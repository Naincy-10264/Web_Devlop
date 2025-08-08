// server.js
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);

app.use("/api", orderRoutes);

app.use("/api", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
