import { useNavigate, useParams } from "react-router-dom";
import { RemoveCharacter } from "../service/Service";
import { useEffect } from "react";
import magoImg from "../assets/pngegg.png";
import { useState } from "react";
import Error from "../page/ErrorMessage";
import Loading from "../components/Loading";
import "../components/layout/remove.css";

const Remove = ({ setPersonajes, personajes }) => {
  const [error, setError] = useState(false);
  const [personajeHP, setPersonajeHP] = useState();
  const { id } = useParams();
  const backPage = useNavigate();

  useEffect(() => {
    async function loadCharacter() {
      try {
        const response = await RemoveCharacter(id, personajes);
        console.log(response);
        setPersonajeHP(response);
      } catch {
        setError(true);
      }
    }
    loadCharacter();
  }, [id, personajes]);
  const confirmar = () => {
    const nuevos = personajes.filter((p) => p.id !== parseInt(id));
    setPersonajes(nuevos);
    backPage("/Listado");
  };
  const cancelar = () => {
    backPage("/");
  };
  return (
    <div className="remove-container" style={{ position: "relative" }}>
      {error ? (
        <Error />
      ) : !personajeHP ? (
        <Loading />
      ) : (
        <>
          {personajeHP && (
            <>
              <div className="alert alert-success text-center fw-bold shadow">
                <h2>❾¾ ¿Estas seguro que deseas eliminar a este mago?⚯͛</h2>
                <h3>
                  ⌁☍ Una vez eliminado, el mago/a {personajeHP.name} no volverá
                  a aparecer
                </h3>
                <div className="card-footer text-center">
                  <img
                    src={magoImg}
                    alt="Mago"
                    className="mx-auto d-block"
                    style={{ maxWidth: "500px" }}
                  />
                </div>
              </div>

              <div
                className="card-body card-body-magica text-center"
                style={{ marginBottom: "50px" }}
              >
                <h3 className="fw-semibold">{personajeHP.name}</h3>
                <hr />
                <p>
                  <strong>Imagen:</strong> {personajeHP.image}
                </p>
                <p>
                  <strong>Género:</strong> {personajeHP.gender}
                </p>
                <p>
                  <strong>Especie:</strong> {personajeHP.species}
                </p>
                <p>
                  <strong>Casa de Hogwarts:</strong> {personajeHP.house}
                </p>
              </div>
            </>
          )}

          <div className="col-12 text-center mt-4 d-flex justify-content-center gap-5">
            <button
              type="button"
              className="btn btn-outline-success me-2"
              onClick={confirmar}
            >
              Avada Kedavra💀
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={cancelar}
            >
              ❌ Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Remove;
