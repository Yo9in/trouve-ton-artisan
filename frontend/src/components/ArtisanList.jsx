// src/pages/ArtisansList.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

function ArtisansList() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = useQuery();
  const searchTerm = (query.get("q") || "").toLowerCase();
  const categoryFilter = (query.get("categorie") || "").toLowerCase();

  useEffect(() => {
    async function fetchArtisans() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/artisans`);
        let data;

        try {
          data = await res.json();
        } catch (jsonErr) {
          console.error("Réponse /api/artisans non JSON :", jsonErr);
          setError("La réponse du serveur n'est pas au format JSON.");
          return;
        }

        if (!res.ok) {
          console.error("Erreur HTTP /api/artisans :", res.status, data);
          setError("Impossible de charger les artisans.");
          return;
        }

        if (!Array.isArray(data)) {
          console.error("Format inattendu de /api/artisans :", data);
          setError("Format de données incorrect.");
          return;
        }

        setArtisans(data);
      } catch (err) {
        console.error("Erreur fetch /api/artisans :", err);
        setError("Erreur de connexion au serveur.");
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, []);

  const renderStars = (note) => {
    if (note == null) return "Aucune note";
    const rounded = Math.round(Number(note));
    const stars = Array.from({ length: 5 }, (_, i) =>
      i < rounded ? "★" : "☆"
    ).join("");
    return `${stars} (${note}/5)`;
  };

  const filteredArtisans = artisans.filter((a) => {
    // filtre recherche sur le nom de l'artisan
    const matchSearch =
      !searchTerm ||
      (a.nom_artisan &&
        a.nom_artisan.toLowerCase().includes(searchTerm));

    // filtre catégorie sur le NOM de la catégorie
    const artisanCategoryName =
      a.specialty.category.nom_categorie.toLowerCase() || "";

    const matchCategory =
      !categoryFilter || artisanCategoryName === categoryFilter;

    return matchSearch && matchCategory;
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Liste des artisans</h1>

      {(searchTerm || categoryFilter) && (
        <p className="mb-3">
          Filtres appliqués :
          {searchTerm && (
            <>
              {" "}
              recherche = <strong>{searchTerm}</strong>
            </>
          )}
          {categoryFilter && (
            <>
              {" "}
              / catégorie = <strong>{categoryFilter}</strong>
            </>
          )}
        </p>
      )}

      {loading && <p>Chargement des artisans...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && filteredArtisans.length === 0 && (
        <p>Aucun artisan ne correspond à votre recherche.</p>
      )}

      <div className="row">
        {filteredArtisans.map((artisan) => (
          <div
            key={artisan.id_artisan || artisan.id}
            className="col-md-4 mb-3"
          >
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{artisan.nom_artisan}</h5>

                <p className="card-text mb-1">
                  <strong>Note :</strong> {renderStars(artisan.note)}
                </p>

                <p className="card-text mb-1">
                  <strong>Spécialité :</strong>{" "}
                  {artisan.specialty
                    ? artisan.specialty.nom_specialite
                    : "Non renseignée"}
                </p>

                <p className="card-text mb-1">
                  <strong>Localisation :</strong> {artisan.ville}
                </p>

                <Link
                  to={`/artisans/${artisan.id_artisan || artisan.id}`}
                  className="stretched-link"
                >
                  Voir la fiche complète
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtisansList;
