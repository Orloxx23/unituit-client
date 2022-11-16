import "./rightbar.css";
//import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext, SocketContext } from "../../context/";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  //const { socket } = useContext(SocketContext);
  const [followed, setFollowed] = useState();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, currentUser?.followers]);

  useEffect(() => {
    user?.followers?.includes(currentUser?._id)
      ? setFollowed(true)
      : setFollowed(false);
  }, [currentUser?._id, currentUser?.followers, user?._id, user?.followers]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`https://unituit-api.herokuapp.com/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`https://unituit-api.herokuapp.com/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        socket?.emit("newNotification", {
          senderId: currentUser._id,
          receiverId: user._id,
          type: "follow",
        });
        const notification = {
          id: currentUser._id + Date.now() + Math.floor(Math.random() * 999),
          senderId: currentUser._id,
          type: "follow",
          read: false,
        };
        axios.put(`https://unituit-api.herokuapp.com/api/users/${user._id}/notification`, {
          notifications: [...user.notifications, notification],
        });
      }
      setFollowed(!followed);
      //window.location.reload();
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Dejar de seguir" : "Seguir"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {/* <h4 className="rightbarTitle">User information</h4> */}
        {/* <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Seguidores:</span>
            <span className="rightbarInfoValue">{user.followers?.length}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Siguiendo:</span>
            <span className="rightbarInfoValue">{user.followings?.length}</span>
          </div>
        </div> */}
        <h4 className="rightbarTitle">Siguiendo a {user.followings?.length}</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
