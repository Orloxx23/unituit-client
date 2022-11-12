import React from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import TuitModal from "../tuitModal";
import { Link } from "react-router-dom";
import { AuthContext, SocketContext } from "../../context";
import axios from "axios";

export default function Sidebar() {
  const { user } = React.useContext(AuthContext);
  const { socket } = React.useContext(SocketContext);
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    socket?.on("getLikePost", data => {
      setNotifications((prev) => [...prev, data]);
      try {
        //const msg = desc.current.value.substr(0, 20);
        axios.post("http://unituit-api.herokuapp.com/api/subscription/new-message", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Te han dado like en una publicacion",
          }),
        });
      } catch (error) {}
    });
  }, [socket]);

  console.log(notifications);

  return (
    <div className="sidebar">
      {/* <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div> */}
      {open ? <TuitModal open={open} setOpen={setOpen} /> : ""}
      <div className="left">
        <div className="menu">
          <div className="frames">
            <Link to="/">
              <div className="frame">
                <div className="iconFrame"></div>
                <p className="nameFrame">Home</p>
              </div>
            </Link>
            {/* <div className="frame">
              <div className="iconFrame"></div>
              <p className="nameFrame">Tendencias</p>
            </div> */}
            <div className="frame">
              <div className="iconFrame"></div>
              <p className="nameFrame">
                Notificaciones <span>{notifications.length}</span>
              </p>
            </div>
            <Link to={`/profile/${user.username}`}>
              <div className="frame">
                <div className="iconFrame"></div>
                <p className="nameFrame">Perfil</p>
              </div>
            </Link>
            <button className="bTuit" onClick={() => setOpen(!open)}>
              Tuit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
