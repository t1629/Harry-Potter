import { useLocation, useNavigate } from "react-router-dom";
import magoImg from "../assets/pngegg.png";

const Eliminar = ({ setPersonaje, personaje }) => {
  const location = useLocation();
  const backPage = useNavigate();
  const personajeHP = location.state?.personaje;
  const confirmar = () => {
    setPersonaje(personaje.filter((p) => p.id !== personajeHP.id));
    backPage("/Listado");
  };
  const cancelar = () => {
    backPage("/");
  };
  return (
    <>
      <div className="alert alert-success text-center fw-bold shadow">
        <h2>❾¾ ¿Estas seguro que desas eliminar a este mago?⚯͛</h2>
        <h3>
          ⌁☍ Una vez eleminado, el mago/a {personajeHP.name} no volvera a
          aparecer
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
        style={{
          marginBottom: "50px",
        }}
      >
        <h3 className="fw-semibold">{personajeHP.name}</h3>
        <hr />
        <p>
          <strong>Imagen:</strong> {personajeHP.image}
        </p>
        <p>
          <strong>Genero:</strong> {personajeHP.gender}
        </p>
        <p>
          <strong>Especie:</strong> {personajeHP.species}
        </p>
        <p>
          <strong>Casa de Hogwarts:</strong> {personajeHP.house}
        </p>
      </div>
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
  );
};

export default Eliminar;
