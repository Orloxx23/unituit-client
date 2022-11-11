import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
          <img src={PF + "logo.png"} alt="logo" className="imgLogo" />
        </div>
      </Link>
      <div className="searchContend">
        <input type="text" className="search" placeholder="    Buscar" />
      </div>
      <div className="user">
        <Link className="user_img" to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
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
