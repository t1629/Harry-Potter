import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import icon from "../components/iu/iconMessage";

const ErrorMessage = () => {
  const navigate = useNavigate();

  const handBack = () => {
    navigate("/Listado");
  };
  Swal.fire({
    title: "❾¾ Harry Potter ⚯͛",
    html: `
      <div style="text-align:center;">
        <p style="font-size:40px;">🪄 Personaje no encontrado...</p>
        ${icon}
      </div>
    `,
    confirmButtonText: "Volver al listado",
    customClass: {
      popup: "shadow fw-bold text-center",
    },
  }).then(() => {
    handBack();
  });
};

export default ErrorMessage;
