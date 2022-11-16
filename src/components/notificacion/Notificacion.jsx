import "./notificacion.css";
import User from "./assets/User.png";

export default function Notificacion() {
  return (
    <>
      <div class="contenedorNotificacion">
      <div class="notificacionUp">
        <h1 class="iconoNotificacion"></h1>
        <img src={User} alt="Usuario" class="imagenUserN" />
      </div>
      <div class="notificacionDown">
        <h1 class="textoNotificacion">Ejemplo de notificación</h1>
      </div>
    </div>
    </>
  );
}
