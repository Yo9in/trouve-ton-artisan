// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.scss"; // optionnel si tu veux styliser à part
import notFoundImg from "../assets/image/404.jpg"; // à adapter au vrai chemin

function NotFound() {
  return (
    <div className="notfound-wrapper d-flex flex-column align-items-center justify-content-center">
      {/* Image */}
      <div className="notfound-image-wrapper">
        <img
          src={notFoundImg}
          alt="Page non trouvée"
          className="notfound-image"
        />
      </div>

      {/* Texte */}
      <h1 className="mt-3">Page non trouvée</h1>
      <p className="mt-2 mb-4 text-center">
        La page que vous avez demandée n’existe pas ou n’est plus disponible.<br />
        Vérifiez l’adresse ou revenez à la page d’accueil.
      </p>

      {/* Bouton retour */}
      <Link to="/" className="btn btn-primary">
        Retour à la page d’accueil
      </Link>
    </div>
  );
}

export default NotFound;
