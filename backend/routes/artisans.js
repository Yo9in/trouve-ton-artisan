// backend/routes/artisans.js
const express = require("express");
const router = express.Router();

const db = require("../models");
const { Artisan, Specialty, Category } = db;

/**
 * GET /api/artisans
 * → liste des artisans
 */
router.get("/", async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialty,
          as: "specialty",
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        },
      ],
      order: [["nom_artisan", "ASC"]],
    });

    res.json(artisans);
  } catch (error) {
    console.error("Erreur GET /api/artisans :", error);
    next(error);
  }
});

/**
 * GET /api/artisans/:id
 * → détail d’un artisan (id = id_artisan)
 */
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const artisan = await Artisan.findOne({
      where: { id_artisan: id },
      include: [
        {
          model: Specialty,
          as: "specialty",
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        },
      ],
    });

    if (!artisan) {
      return res.status(404).json({ error: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error(`Erreur GET /api/artisans/${req.params.id} :`, error);
    next(error);
  }
});

module.exports = router;
