import React from "react";
import Notification from "../notification";
import "./notiModal.css";
import axios from "axios";
import { AuthContext } from "../../context";

export default function NotiModal({ open, setOpen, deleteN }) {
  const { user } = React.useContext(AuthContext);
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get(
          "https://unituit-api.up.railway.app/api/users?userId=" + user._id
        );
        setNotifications(
          res.data.notifications.filter((n) => n.read === false)
        );
      } catch (err) {}
    };
    getNotifications();
  }, []);

  const deleteNoti = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    deleteN(id);
  };

  return (
    <div className={open ? "" : "notiModalClose"}>
      <div className="notiModal">
        <div className="notiModal-head">
          <h3>Notificaciones</h3>
          <hr />
          <i className="fa-solid fa-xmark" onClick={() => setOpen(!open)}></i>
        </div>
        <div className="notiModal-body">
          {notifications.length > 0 ? (
            notifications?.map((n) => (
              <Notification
                notification={n}
                key={n.id}
                deleteNoti={deleteNoti}
                onClick={() => setOpen(!open)}
              />
            ))
          ) : (
            <div className="notifications-empty">
              <i class="fa-solid fa-bell-concierge"></i>
              <h3>No tienes notificaciones</h3>
            </div>
          )}
        </div>
      </div>
      <div className="modalOverlay"></div>
    </div>
  );
}
