import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetCharacter } from "../service/Service";
import Error from "../page/ErrorMessage";
import "../components/layout/Read.css";
import "../components/iu/buttom.css";

const Read = ({ personajes }) => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCharacter() {
      try {
        const data = await GetCharacter(id, personajes);
        setInfo(data);
      } catch {
        setError(true);
      }
    }
    loadCharacter();
  }, [id, personajes]);

  if (error) {
    return <Error />;
  }
  if (!info) {
    return <p className="text-center mt-4">Cargando personaje...</p>;
  }
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card-detail shadow-lg">
        <img
          src={info.image}
          className="card-img-top"
          style={{ height: "300px", objectFit: "contain" }}
        />
        <div className="card-body text-center">
          <h3 className="card-title fw-bold text-center">⚡{info.name}⚡</h3>
          <hr />
          <p className="card-text">
            <span className="fw-bold">🦉Especie:</span> {info.species}
          </p>
          <p className="card-text">
            <span className="fw-bold">🧹Género:</span> {info.gender}
          </p>
          <p className="card-text">
            <span className="fw-bold">🪶Casa de Hogwarts:</span> {info.house}
          </p>
        </div>
        <div className="card-footer text-center">
          <Link to="/Listado" className="btn btn-listado-read">
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
