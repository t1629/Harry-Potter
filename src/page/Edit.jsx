import { useNavigate } from "react-router-dom";
import { EditCharacter } from "../service/Service";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../page/ErrorMessage";

const Edit = ({ personajes, setPersonajes }) => {
  const backPage = useNavigate();
  const { id } = useParams();
  const [originalName, setOriginalName] = useState("");
  const [error, setError] = useState(false);
  const [infoP, setInfoP] = useState({
    image: "",
    name: "",
    species: "",
    gender: "",
    house: "",
  });

  useEffect(() => {
    async function loadCharacter() {
      try {
        const responsive = await EditCharacter(id, personajes);
        if (!responsive) {
          setError(true);
          return;
        }
        setInfoP(responsive);
        setOriginalName(responsive.name);
      } catch {
        setError(true);
      }
    }
    loadCharacter();
  }, [id, personajes]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevos = personajes.map((p) =>
      p.id === parseInt(id) ? { ...p, ...infoP } : p,
    );

    setPersonajes(nuevos);
    backPage("/Listado");
  };

  const cancelar = () => {
    backPage("/Listado");
  };

  if (error) {
    return <Error />;
  }
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4" style={{ fontFamily: "serif" }}>
        ❾¾ Editar a {originalName} ❾¾
      </h2>
      <hr
        style={{
          marginBottom: "50px",
        }}
      />
      <div
        className="container card-edit mb-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(245, 233, 212, 0.1) 0%, rgba(232, 217, 181, 0.05) 100%)",
          border: "3px solid rgba(211, 166, 37, 0.2)",
          borderRadius: "15px",
        }}
      >
        <form
          className="row g-3 shadow p-4 rounded card-edit"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label className="form-label fw-bold">
              <span className="emoji-edit">🖼️ </span>Imagen
            </label>
            <input
              type="text"
              className="form-control"
              value={infoP.image}
              onChange={(e) => setInfoP({ ...infoP, image: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              <span className="emoji-edit">🪄</span> Nombre
            </label>
            <input
              type="text"
              className="form-control"
              value={infoP.name}
              onChange={(e) => setInfoP({ ...infoP, name: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              <span className="emoji-edit">🦉</span> Especie
            </label>
            <input
              type="text"
              className="form-control"
              value={infoP.species}
              onChange={(e) => setInfoP({ ...infoP, species: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              <span className="emoji-edit">⚡</span> Género
            </label>
            <input
              type="text"
              className="form-control"
              value={infoP.gender}
              onChange={(e) => setInfoP({ ...infoP, gender: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">
              <span className="emoji-edit">🦁 🐍 🦅 🦡</span>Casa de Hogwarts
            </label>
            <input
              type="text"
              className="form-control"
              value={infoP.house}
              onChange={(e) => setInfoP({ ...infoP, house: e.target.value })}
            />
          </div>

          <div className="col-12 text-center mt-4 d-flex justify-content-center gap-5">
            <button type="submit" className="btn btn-outline-success me-2">
              ✉︎ Guardar cambios
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={cancelar}
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
