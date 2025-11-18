// src/App.js
import { Routes, Route } from "react-router-dom";
import ArtisanList from "./components/ArtisanList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArtisanList />} />
      {/* On ajoutera plus tard la fiche artisan */}
      {/* <Route path="/artisans/:id" element={<ArtisanDetail />} /> */}
    </Routes>
  );
}

export default App;
