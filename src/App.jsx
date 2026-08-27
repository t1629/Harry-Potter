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
import NotFound from "./page/NotFound";
import { useState } from "react";

import "./components/layout/App.css";

function App() {
  const [personajes, setPersonajes] = useState([]);

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
              <List personajes={personajes} setPersonajes={setPersonajes} />
            }
          />
          <Route
            path="/Detalle/:id"
            element={<Read personajes={personajes} />}
          />
          <Route
            path="/EditarPersonaje/:id"
            element={
              <Edit personajes={personajes} setPersonajes={setPersonajes} />
            }
          />
          <Route
            path="/CrearPersonaje"
            element={
              <Create personajes={personajes} setPersonajes={setPersonajes} />
            }
          />
          <Route
            path="/Eliminar/:id"
            element={
              <Remove personajes={personajes} setPersonajes={setPersonajes} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
