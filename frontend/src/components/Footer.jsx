import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <footer className="site-footer mt-auto py-4">
      <div className="container">
        <div className="row gy-3">
          {/* Menu legal */}
          <div className="col-12 col-md-6">
            <h6 className="footer-title">Informations légales</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">Données personnelles</Link>
              </li>
              <li>
                <Link to="/accessibilite">Accessibilité</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
            <p className="text-muted small mb-0">
              Ces pages sont actuellement en construction.
            </p>
          </div>

          {/* Adresse */}
          <div className="col-12 col-md-6">
            <h6 className="footer-title">Contact – Antenne de Lyon</h6>
            <address className="mb-0 footer-address">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <span className="fw-bold">+33 (0)4 26 73 40 00</span>
            </address>
          </div>
        </div>

        <div className="text-center mt-3 small text-muted">
          &copy; {new Date().getFullYear()} Région – Plateforme des artisans
        </div>
      </div>
    </footer>
  );
};

export default Footer;
