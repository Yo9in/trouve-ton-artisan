const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(express.json());

// Import routes
const artisanRoutes = require("./routes/artisans");
app.use("/api/artisans", artisanRoutes);

// Sync DB
db.sequelize.sync();

module.exports = app;
