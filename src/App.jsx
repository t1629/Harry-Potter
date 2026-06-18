import { Routes, Route } from "react-router-dom";
import Read from "./page/Read";
import List from "./page/List";
import Create from "./page/Create";
import Edit from "./page/Edit";
import Remove from "./page/Remove";
import Home from "./page/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";

import "./components/layout/App.css";
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
          <Route path="/" element={<Home />} />
          <Route
            path="/Listado"
            element={
              <List personajes={personaje} loading={loading} error={error} />
            }
          />
          <Route path="/Detalle/:id" element={<Read />} />
          <Route
            path="/EditarPersonaje/:id"
            element={
              <Edit
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
              <Create
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
              <Remove personaje={personaje} setPersonaje={setPersonaje} />
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
