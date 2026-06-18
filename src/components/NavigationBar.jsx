import { Link } from "react-router-dom";
import logo from "../assets/pngwing.com.png";
import "../components/layout/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark hp-navbar mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand hogwarts-brand" to="/">
          <img src={logo} alt="Logo Hogwarts" className="hogwarts-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link gryffindor" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link slytherin" to="/Listado">
                Listado
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ravenclaw" to="/CrearPersonaje">
                Crear Personaje
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
