// src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001";

function HomePage() {
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          console.error("Format inattendu pour /api/artisans :", data);
          setError("Format de données incorrect.");
          return;
        }

        let artisansDuMois = data.filter((a) => a.artisan_du_mois);

        if (artisansDuMois.length === 0) {
          artisansDuMois = data.slice(0, 3);
        } else {
          artisansDuMois = artisansDuMois.slice(0, 3);
        }

        setFeaturedArtisans(artisansDuMois);
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

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem" }}>
      {/* Titre principal */}
      <header style={{ marginBottom: "2rem" }}>
        <h1>Trouve ton artisan</h1>
        <p>
          Bienvenue sur la plateforme qui vous aide à trouver rapidement un artisan
          de confiance près de chez vous.
        </p>
      </header>

      {/* SECTION : Comment trouver mon artisan ? */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Comment trouver mon artisan ?</h2>
        <ol style={{ marginTop: "1rem", lineHeight: 1.7 }}>
          <li>
            <strong>Choisir la catégorie d’artisanat dans le menu.</strong>
            <br />
            Utilisez le menu en haut de la page pour sélectionner la catégorie
            d’artisanat qui vous intéresse.
          </li>
          <li>
            <strong>Choisir un artisan.</strong>
            <br />
            Consultez la liste ou les fiches détaillées des artisans, leur note,
            leur spécialité et leur localisation.
          </li>
          <li>
            <strong>Le contacter via le formulaire de contact.</strong>
            <br />
            Accédez à la fiche de l’artisan et utilisez le formulaire de contact
            pour lui décrire votre besoin.
          </li>
          <li>
            <strong>Une réponse sera apportée sous 48h.</strong>
            <br />
            L’artisan vous répondra dans un délai maximum de 48 heures.
          </li>
        </ol>
      </section>

      {/* SECTION : Artisans du mois */}
      <section>
        <h2>Les artisans du mois</h2>

        {loading && <p>Chargement des artisans du mois...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && featuredArtisans.length === 0 && (
          <p>Aucun artisan n’a pu être récupéré.</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {featuredArtisans.map((artisan) => (
            <article
              key={artisan.id_artisan || artisan.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>
                {artisan.nom_artisan}
              </h3>

              <p style={{ margin: "0.25rem 0" }}>
                <strong>Note :</strong> {renderStars(artisan.note)}
              </p>

              <p style={{ margin: "0.25rem 0" }}>
                <strong>Spécialité :</strong>{" "}
                {artisan.specialty
                  ? artisan.specialty.nom_specialite
                  : "Non renseignée"}
              </p>

              <p style={{ margin: "0.25rem 0" }}>
                <strong>Localisation :</strong> {artisan.ville}
              </p>

              <div style={{ marginTop: "0.75rem" }}>
                <Link to={`/artisans/${artisan.id_artisan || artisan.id}`}>
                  Voir la fiche détaillée
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
