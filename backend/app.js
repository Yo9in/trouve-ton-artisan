// backend/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test pour vérifier que le serveur tourne
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Routes API
const artisansRouter = require("./routes/artisans");
app.use("/api/artisans", artisansRouter);

// 404 par défaut (facultatif)
app.use((req, res) => {
  res.status(404).send("Not found");
});

module.exports = app;
