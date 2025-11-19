// src/pages/ArtisanDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001";

function ArtisanDetails() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  useEffect(() => {
    async function fetchArtisan() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/artisans/${id}`);
        let data;

        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error("Réponse non JSON pour /api/artisans/:id :", jsonErr);
          setError("La réponse du serveur n'est pas au format JSON.");
          setArtisan(null);
          return;
        }

        if (!response.ok) {
          setError(
            data.error || data.message || "Erreur lors du chargement"
          );
          setArtisan(null);
        } else {
          setArtisan(data);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        setError("Impossible de contacter le serveur");
        setArtisan(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisan();
  }, [id]);

  const renderStars = (note) => {
    if (note == null) return "Aucune note";
    const rounded = Math.round(Number(note));
    const stars = Array.from({ length: 5 }, (_, i) =>
      i < rounded ? "★" : "☆"
    ).join("");
    return `${stars} (${note}/5)`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/artisans/${id}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || data.message || "Erreur lors de l'envoi"
        );
      }

      setSendResult({
        type: "success",
        message:
          "Votre message a bien été envoyé à l’artisan (simulation côté front).",
      });
      setForm({ nom: "", email: "", objet: "", message: "" });
    } catch (err) {
      console.error("Erreur envoi formulaire :", err);
      setSendResult({
        type: "error",
        message: err.message || "Erreur lors de l'envoi du message.",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <p>Chargement de l’artisan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/artisans" className="btn btn-secondary mt-3">
          ← Retour à la liste des artisans
        </Link>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="container py-5">
        <p>Aucun artisan trouvé.</p>
        <Link to="/artisans" className="btn btn-secondary mt-3">
          ← Retour à la liste des artisans
        </Link>
      </div>
    );
  }

  const {
    nom_artisan,
    ville,
    description,
    note,
    artisan_du_mois,
    site_web,
    email_contact,
    specialty,
    photo_url,
  } = artisan;

  return (
    <div className="container py-5">
      <Link to="/artisans" className="btn btn-link mb-3 p-0">
        ← Retour à la liste des artisans
      </Link>

      <div className="row">
        <div className="col-md-4">
          {/* Image ou placeholder */}
          {photo_url ? (
            <img
              src={photo_url}
              alt={nom_artisan}
              className="img-fluid rounded mb-3"
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded mb-3"
              style={{
                backgroundColor: "#f1f8fc",
                height: "200px",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#00497c",
              }}
            >
              {nom_artisan.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="col-md-8">
          <h1 className="mb-2">{nom_artisan}</h1>

          {artisan_du_mois && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ⭐ Artisan du mois
            </p>
          )}

          <p className="mb-2">
            <strong>Note : </strong>
            {renderStars(note)}
          </p>

          {specialty && (
            <p className="mb-2">
              <strong>Spécialité : </strong>
              {specialty.nom_specialite}
              {specialty.category && (
                <>
                  {" "}
                  – <em>{specialty.category.nom_categorie}</em>
                </>
              )}
            </p>
          )}

          {ville && (
            <p className="mb-2">
              <strong>Localisation : </strong>
              {ville}
            </p>
          )}

          {description && (
            <>
              <h2 className="h5 mt-4">À propos</h2>
              <p>{description}</p>
            </>
          )}

          <h2 className="h5 mt-4">Contact</h2>
          {email_contact ? (
            <p>
              <strong>Email : </strong>
              <a href={`mailto:${email_contact}`}>{email_contact}</a>
            </p>
          ) : (
            <p>
              <strong>Email : </strong> Non renseigné
            </p>
          )}

          {site_web && (
            <p>
              <strong>Site web : </strong>
              <a href={site_web} target="_blank" rel="noreferrer">
                {site_web}
              </a>
            </p>
          )}

          {/* Formulaire de contact */}
          <form
            onSubmit={handleSubmit}
            className="mt-3"
            style={{ maxWidth: "500px" }}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="nom">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="form-control"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="objet">
                Objet
              </label>
              <input
                type="text"
                id="objet"
                name="objet"
                className="form-control"
                value={form.objet}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {sendResult && (
              <p
                className={
                  sendResult.type === "success"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {sendResult.message}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending}
            >
              {sending ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtisanDetails;
