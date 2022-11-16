import axios from "axios";
import React from "react";
import "./notification.css";
import { AuthContext } from "../../context/";

export default function Notification({ notification, deleteNoti }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = React.useState(null);
  const { user: currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "https://unituit-api.up.railway.app/api/users?userId=" +
          notification.senderId
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const getType = () => {
    switch (notification.type) {
      case "like":
        return "Le gustó tu tuit";
      case "follow":
        return "Comenzo a seguirte";
      case "post":
        return "Ha hecho un nuevo tuit";
      default:
        return "Nueva notificación";
    }
  };

  const markAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:8800/api/users/" +
          currentUser._id +
          "/readnoti",
        {
          userId: currentUser._id,
          notification: notification,
        }
      );
      deleteNoti(notification.id);
    } catch (err) {}
  };

  return (
    <div className="notification-card">
      <div className="notification-card-head">
        {user ? (
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        ) : (
          <div className="userPictureLazyCircle lazyColor"></div>
        )}
      </div>
      <div className="notification-card-body">
        <div className="notification-content">
          {user ? (
            <>
              <p className="notification-username">{user?.username}</p>
              <p className="notification-text">{getType()}</p>
            </>
          ) : (
            <>
              <div className="notification-usernameLazy lazyColor"></div>
              <p className="notification-textLazy lazyColor"></p>
            </>
          )}
        </div>
        <div className="notification-read">
          <i
            className={
              notification.read
                ? "fa-solid fa-check read"
                : "fa-solid fa-check noread"
            }
            onClick={markAsRead}
          ></i>
        </div>
      </div>
    </div>
  );
}
