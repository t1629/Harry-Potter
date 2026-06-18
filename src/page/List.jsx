import { Link } from "react-router-dom";

const List = ({ personajes, loading, error }) => {
  const personajesLimit = [
    ...personajes.slice(0, 22),
    ...personajes.filter((p) => p.id > 22),
  ];
  return (
    <>
      {loading && (
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only">Cargando Personajes ...</span>
        </div>
      )}
      {error && (
        <p className="alert alert-warning" role="alert">
          Error: {error}
        </p>
      )}
      {!loading && !error && (
        <div className="row">
          {personajesLimit.map((p, index) => {
            const infoP = {
              Imagen: p.image,
              Nombre: p.name,
              Especie: p.species,
              Genero: p.gender,
              Casa: p.house,
            };
            return (
              <div key={index} className="col-md-3 mb-4">
                <div
                  className="card h-100 shadow w-100 card-magica"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245, 233, 212, 0.1) 0%, rgba(232, 217, 181, 0.05) 100%)",
                    border: "1px solid rgba(211, 166, 37, 0.2)",
                    borderRadius: "15px",
                    color: "white",
                  }}
                >
                  <img
                    src={p.image}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center fw-bold">{p.name}</h5>
                    <hr />
                    <p className="card-text">Especie: {p.species}</p>
                    <p className="card-text">Género: {p.gender}</p>
                    <p className="card-text">Casa de Hogwarts: {p.house}</p>
                  </div>
                  <div className="card-footer d-grid gap-2">
                    <Link
                      to={`/Detalle/${index}`}
                      className="btn btn-outline-success"
                      state={{ info: infoP }}
                    >
                      Detalles de {p.name} ⚡︎
                    </Link>
                    <Link
                      to={`/EditarPersonaje/${index}`}
                      state={{ personaje: p }}
                      className="btn btn-outline-warning "
                    >
                      Editar a {p.name} 🪄
                    </Link>
                    <Link
                      to={`/Eliminar/${index}`}
                      state={{ personaje: p }}
                      className="btn btn-outline-danger"
                    >
                      Eliminar a {p.name} 💀
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default List;
