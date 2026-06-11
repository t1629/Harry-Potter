import { Routes, Route } from "react-router-dom";
import Detalle from "./components/Detalle";
import Listado from "./components/Listado";
import CrearPersonaje from "./components/CrearPersonaje";
import EditarPersonaje from "./components/EditarPersonaje";
import Eliminar from "./components/Eliminar";
import Index from "./components/Index";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";

import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [personaje, setPersonaje] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPersonajes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://hp-api.onrender.com/api/characters",
      );
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const HpData = await response.json();
      setPersonaje(HpData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonajes();
  }, []);

  return (
    <div className="hp-container">
      <Header />
      <NavigationBar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/Listado"
            element={
              <Listado personajes={personaje} loading={loading} error={error} />
            }
          />
          <Route path="/Detalle/:id" element={<Detalle />} />
          <Route
            path="/EditarPersonaje/:id"
            element={
              <EditarPersonaje
                personajes={personaje}
                setPersonaje={setPersonaje}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/CrearPersonaje"
            element={
              <CrearPersonaje
                personajes={personaje}
                setPersonaje={setPersonaje}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/Eliminar/:id"
            element={
              <Eliminar personaje={personaje} setPersonaje={setPersonaje} />
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
