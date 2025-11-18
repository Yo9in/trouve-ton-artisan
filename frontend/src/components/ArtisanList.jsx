// src/components/ArtisanList.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArtisans } from "../services/api";
import StarRating from "./StarRating";

export default function ArtisanList() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArtisans()
      .then(setArtisans)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // liste des catégories à partir des données
  const categories = useMemo(() => {
    const set = new Set();
    artisans.forEach((artisan) => {
      const catName = artisan.specialty.category.nom_categorie;
      if (catName) set.add(catName);
    });
    return Array.from(set);
  }, [artisans]);

  // filtrage par recherche + catégorie
  const filteredArtisans = artisans.filter((artisan) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      artisan.nom_artisan.toLowerCase().includes(searchLower) ||
      artisan.ville.toLowerCase().includes(searchLower) ||
      artisan.specialty.nom_specialite
        .toLowerCase()
        .includes(searchLower);

    const catName = artisan.specialty.category.nom_categorie;
    const matchesCategory =
      selectedCategory === "all" || catName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Trouve ton artisan</h1>

      {/* recherche + filtre catégorie */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher par nom, ville, spécialité..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1",
            minWidth: "220px",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "180px",
          }}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* cards artisans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {filteredArtisans.map((artisan) => (
          <button
            key={artisan.id_artisan}
            onClick={() => navigate(`/artisans/${artisan.id_artisan}`)}
            style={{
              textAlign: "left",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              backgroundColor: "white",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem" }}>{artisan.nom_artisan}</h3>
            <StarRating note={artisan.note} />
            <p style={{ margin: "0.5rem 0 0" }}>
              <strong>Spécialité : </strong>
              {artisan.specialty.nom_specialite || "Non renseignée"}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Localisation : </strong>
              {artisan.ville}
            </p>
          </button>
        ))}
      </div>

      {filteredArtisans.length === 0 && (
        <p style={{ marginTop: "1rem" }}>
          Aucun artisan ne correspond à votre recherche.
        </p>
      )}
    </div>
  );
}
