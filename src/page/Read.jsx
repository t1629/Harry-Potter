import { useLocation, Link } from "react-router-dom";

const Read = () => {
  const infoHP = useLocation();
  const { info } = infoHP.state || {};

  if (!info) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">
          No se encuentra el personaje seleccionado
        </h4>
        <p>
          Ha ocurrido un error y lamentablemente el personaje que seleccionó no
          se pudo encontrar.
        </p>
        <hr />
        <p className="mb-0">
          Por favor vuelva a la lista de personajes y seleccione otro.
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        className="card shadow-lg"
        style={{
          width: "22rem",
          background:
            "linear-gradient(135deg, rgba(245, 233, 212, 0.1) 0%, rgba(232, 217, 181, 0.05) 100%)",
          border: "1px solid rgba(211, 166, 37, 0.2)",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <img
          src={info.Imagen}
          className="card-img-top"
          style={{ height: "300px", objectFit: "contain" }}
        />
        <div className="card-body text-center">
          <h3 className="card-title fw-bold text-center">⚡{info.Nombre}⚡</h3>
          <hr />
          <p className="card-text">
            <span className="fw-bold">🦉Especie:</span> {info.Especie}
          </p>
          <p className="card-text">
            <span className="fw-bold">🧹Género:</span> {info.Genero}
          </p>
          <p className="card-text">
            <span className="fw-bold">🪶Casa de Hogwarts:</span> {info.Casa}
          </p>
        </div>
        <div className="card-footer text-center">
          <Link
            to="/Listado"
            className="btn"
            style={{
              color: "#946b2d",
              border: "1px solid #946b2d",
              background: "#0e1a40",
            }}
          >
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
