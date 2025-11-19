// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";          // "/" = accueil
import ArtisansList from "./components/ArtisanList";       // "/artisans"
import ArtisanDetails from "./components/ArtisanDetails";   // "/artisans/:id"
import NotFound from "./components/NotFound";               // 404

function PageEnConstruction() {
  return (
    <div className="container py-5">
      <h1>Page en construction</h1>
      <p>Cette page sera complétée ultérieurement.</p>
    </div>
  );
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Routes>
          {/* Accueil */}
          <Route path="/" element={<HomePage />} />

          {/* Liste des artisans */}
          <Route path="/artisans" element={<ArtisansList />} />

          {/* Fiche artisan */}
          <Route path="/artisans/:id" element={<ArtisanDetails />} />

          {/* Pages légales */}
          <Route path="/mentions-legales" element={<PageEnConstruction />} />
          <Route
            path="/donnees-personnelles"
            element={<PageEnConstruction />}
          />
          <Route path="/accessibilite" element={<PageEnConstruction />} />
          <Route path="/cookies" element={<PageEnConstruction />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
