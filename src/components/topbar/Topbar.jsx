import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getNoAvatar } from "../../utils/getImg";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [noAvatar, setNoAvatar] = useState("");

  useEffect(() => {
    getNoAvatar().then((res) => setNoAvatar(res));
  }, []);
  /*return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );*/
  return (
    <div className="navBar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logoCompletado">
          <div className="tituloPartes">
            <h1 className="UParte1">UNI</h1>
            <h1 className="UParte2">TUIT</h1>
          </div>
          <img src={"https://firebasestorage.googleapis.com/v0/b/unituit-ef9d7.appspot.com/o/logo.png?alt=media&token=89931bf8-9318-43c3-9e72-37be04d256fd"} alt="logo" className="imgLogo" />
        </div>
      </Link>
      <div className="searchContend">
        <input type="text" className="search" placeholder="    Buscar" />
      </div>
      <div className="user">
        <Link className="user_img" to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture ? user.profilePicture : noAvatar}
            alt="user"
            className="user_img"
          />
        </Link>
        <div className="usarioTAContend">
          <p className="usuarioText">{user.username}</p>
          <p className="usuarioArroba">{"@" + user.username}</p>
        </div>
        {/* <img src={Settings} onClick={logout} alt="settings" /> */}
      </div>
    </div>
  );
}
