// src/components/Header.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoRegion from "../assets/image/logo-region.png";
import "../styles/header.scss";

function Header() {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchTerm = (formData.get("search") || "").trim();
    if (!searchTerm) return;

    // Redirige vers /artisans avec le terme de recherche
    navigate(`/artisans?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo + lien vers accueil */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={logoRegion}
              alt="Logo Région"
              className="header-logo me-2"
            />
            
          </Link>

          {/* Bouton menu mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Basculer la navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Menu + recherche */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Bâtiment */}
              <li className="nav-item">
                <NavLink
                  to="/artisans?categorie=Bâtiment"
                  className="nav-link"
                >
                  Bâtiment
                </NavLink>
              </li>

              {/* Services */}
              <li className="nav-item">
                <NavLink
                  to="/artisans?categorie=Services"
                  className="nav-link"
                >
                  Services
                </NavLink>
              </li>

              {/* Fabrication */}
              <li className="nav-item">
                <NavLink
                  to="/artisans?categorie=Fabrication"
                  className="nav-link"
                >
                  Fabrication
                </NavLink>
              </li>

              {/* Alimentation */}
              <li className="nav-item">
                <NavLink
                  to="/artisans?categorie=Alimentation"
                  className="nav-link"
                >
                  Alimentation
                </NavLink>
              </li>
            </ul>

            {/* Barre de recherche */}
            <form
              className="d-flex header-search"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Rechercher un artisan"
                aria-label="Rechercher un artisan"
              />
              <button className="btn btn-primary" type="submit">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
