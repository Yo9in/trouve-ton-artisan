// routes/artisans.js
const express = require("express");
const router = express.Router();
const { Artisan, Specialty, Category } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialty,
          as: "specialty",
          include: [{ model: Category, as: "category" }],
        },
      ],
    });
    res.json(artisans);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
