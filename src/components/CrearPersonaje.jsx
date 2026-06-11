import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import sombrero from "../assets/pngwing.comS.png";
const initialState = {
  Imagen: "",
  Nombre: "",
  Especie: "",
  Genero: "",
  Casa: "",
};

const personajeReducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGEN":
      return { ...state, Imagen: action.payload };
    case "SET_NOMBRE":
      return { ...state, Nombre: action.payload };
    case "SET_ESPECIE":
      return { ...state, Especie: action.payload };
    case "SET_GENERO":
      return { ...state, Genero: action.payload };
    case "SET_CASA":
      return { ...state, Casa: action.payload };
    default:
      return state;
  }
};

const CrearPersonaje = ({ personajes, setPersonajes, loading, error }) => {
  const [state, dispatch] = useReducer(personajeReducer, initialState);

  const backPage = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevo = {
      id: personajes.length + 1,
      image: state.Imagen,
      name: state.Nombre,
      species: state.Especie,
      gender: state.Genero,
      house: state.Casa,
    };

    setPersonajes([...personajes, nuevo]);
    backPage("/Listado");
  };
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
        <div className="container mt-4">
          <img
            src={sombrero}
            alt="Sombrero seleccionador"
            style={{ maxWidth: "600px", height: "auto", marginLeft: "350px" }}
          />
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="card shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 233, 212, 0.1) 0%, rgba(232, 217, 181, 0.05) 100%)",
                  border: "3px solid rgba(211, 166, 37, 0.2)",
                  borderRadius: "15px",
                  padding: "2rem",
                  color: "white",
                  marginBottom: "150px",
                }}
              >
                <div className="card-header text-center ">
                  <h4 className="tittle-form">⚡Crear Personaje ⚯</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="Imagen" className="form-label fw-bold">
                        Imagen (URL)
                      </label>

                      <input
                        type="text"
                        id="Imagen"
                        className="form-control"
                        placeholder="Ingresa la URL de la imagen"
                        value={state.Imagen}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_IMAGEN",
                            payload: e.target.value,
                          })
                        }
                      />
                      <div className="form-text text-muted">
                        Si no tienes una imagen, no pasa nada: se acepta igual.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Nombre" className="form-label fw-bold">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="Nombre"
                        className="form-control"
                        placeholder="Ingresa el nombre"
                        value={state.Nombre}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_NOMBRE",
                            payload: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Especie" className="form-label fw-bold">
                        Especie
                      </label>
                      <input
                        type="text"
                        id="Especie"
                        className="form-control"
                        placeholder="Ingresa la especie"
                        value={state.Especie}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_ESPECIE",
                            payload: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Genero" className="form-label fw-bold">
                        Género
                      </label>
                      <input
                        type="text"
                        id="Genero"
                        placeholder="Ingrese el Genero"
                        className="form-control"
                        value={state.Genero}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_GENERO",
                            payload: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Casa" className="form-label fw-bold">
                        Casa de Hogwarts
                      </label>
                      <input
                        type="text"
                        id="Genero"
                        placeholder="Ingrese su Casa de Hogwarts"
                        className="form-control"
                        value={state.Casa}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_CASA",
                            payload: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-warning  px-4"
                        style={{
                          marginTop: "20px",
                          marginRight: "10px",
                          borderRadius: "20px",
                        }}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrearPersonaje;
