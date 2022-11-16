import React from "react";
import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext, SocketContext } from "../../context/";
import axios from "axios";

export default function Share({ addPost }) {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [followers, setFollowers] = useState([]);

  const getFollowers = async () => {
    try {
      const res = await axios.get("https://unituit-api.up.railway.app/api/users?userId=" + user._id);
      setFollowers(res.data.followers);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getFollowers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      likes: [],
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("https://unituit-api.up.railway.app/api/upload", data);
      } catch (err) {}
    }
    try {
      await getFollowers();
      await axios.post("https://unituit-api.up.railway.app/api/posts", newPost);
      const postTmp = {
        tempId: user._id + Date.now(),
        ...newPost,
      };
      reset();
      addPost(postTmp);
      socket?.emit("newNotification", {
        senderId: user._id,
        receiverId: followers,
        type: "post",
      });
      const notification = {
        id: user._id + Date.now() + Math.floor(Math.random() * 999),
        senderId: user._id,
        text: newPost.desc,
        type: "post",
        read: false,
      };
      followers.map((follower) => {
        axios.put(`https://unituit-api.up.railway.app/api/users/${follower}/notification`, {
          notifications: [...user.notifications, notification],
        });
      });

      //window.location.reload();
    } catch (err) {}
  };

  const reset = () => {
    setFile(null);
    desc.current.value = "";
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"¿Que hay de nuevo " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div> */}
            {/* <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div> */}
            {/* <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button className="shareButton" type="submit">
            Tuit
          </button>
        </form>
      </div>
    </div>
  );
}
