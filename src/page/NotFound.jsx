import { Link } from "react-router-dom";
import "../components/layout/notFound.css";
import image from "../assets/notFoundImage.png";

const NotFound = () => {
  return (
    <div className="nf-container">
      <h2 className="nf-title">
        ¡Ups! Este pasillo está encantado… la página que buscas se ha
        desvanecido como un hechizo mal lanzado{" "}
      </h2>
      <img src={image} alt="Ministerio de Magia" className="nf-image" />

      <h4 className="nf-text">Mejor vuelve a Hogwarts</h4>
      <Link to="/" className="btn btn-nf">
        Volver a Howarts
      </Link>
    </div>
  );
};

export default NotFound;
