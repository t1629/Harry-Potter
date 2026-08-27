import { Link } from "react-router-dom";
import { GetAll } from "../service/Service";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../components/layout/list.css";
const List = ({ personajes, setPersonajes }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function Cdata() {
      try {
        setLoading(true);
        if (personajes.length === 0) {
          const respons = await GetAll();
          setPersonajes(respons);
        }
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      } finally {
        setLoading(false);
      }
    }
    Cdata();
  }, []);

  const personajesLimit = [
    ...personajes.slice(0, 22),
    ...personajes.filter((p) => p.id > 1000),
  ];
  return (
    <div className="list-container">
      {loading && <Loading />}
      {!loading && (
        <div className="row">
          {personajesLimit.map((p, index) => {
            return (
              <div key={index} className="col-md-3 mb-4">
                <div className="card h-100 shadow w-100 card-magica">
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
                      to={`/Detalle/${p.id}`}
                      className="btn btn-outline-success"
                    >
                      Detalles de {p.name} ⚡︎
                    </Link>
                    <Link
                      to={`/EditarPersonaje/${p.id}`}
                      className="btn btn-outline-warning "
                    >
                      Editar a {p.name} 🪄
                    </Link>
                    <Link
                      to={`/Eliminar/${p.id}`}
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
    </div>
  );
};

export default List;
