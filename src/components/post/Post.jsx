import "./post.css";
import { Close } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext, SocketContext } from "../../context/";
import { getNoAvatar } from "../../utils/getImg";

export default function Post({ post, deleteP }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [noAvatar, setNoAvatar] = useState("");

  useEffect(() => {
    getNoAvatar().then((res) => setNoAvatar(res));
  }, []);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        //`/users?userId=${post.userId}`
        `https://unituit-api.up.railway.app/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put(
        //"/posts/" + post._id + "/like",
        "https://unituit-api.up.railway.app/api/posts/" + post._id + "/like",
        { userId: currentUser._id }
      );
    } catch (err) {}
    if (!isLiked) {
      if (currentUser._id !== post.userId) {
        socket?.emit("newNotification", {
          senderId: currentUser._id,
          receiverId: post.userId,
          type: "like",
        });
        const notification = {
          id: currentUser._id + Date.now() + Math.floor(Math.random() * 999),
          senderId: currentUser._id,
          type: "like",
          read: false,
        };
        await axios.put(
          `https://unituit-api.up.railway.app/api/users/${post.userId}/notification`,
          {
            notifications: notification,
          }
        );
      }
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const isPostOwner = () => {
    return currentUser._id === post.userId;
  };

  const deletePost = async () => {
    if (post._id) {
      try {
        await axios.delete(
          //"/posts/" + post._id,
          `https://unituit-api.up.railway.app/api/posts/${post._id}`,
          {
            data: { userId: currentUser._id },
          }
        );
        deleteP(post._id);
      } catch (err) {}
    }
  };

  const localeFunc = (number, index, total_sec) => {
    return [
      ["Justo ahora", "Justo ahora"],
      ["Hace %s segundos", "En %s segundos"],
      ["Hace 1 minuto", "En 1 minuto"],
      ["Hace %s minutos", "en %s minutos"],
      ["Hace 1 hora", "En 1 hora"],
      ["Hace %s horas", "En %s horas"],
      ["Hace 1 d??a", "En 1 d??a"],
      ["Hace %s d??as", "En %s d??as"],
      ["Hace 1 semana", "En 1 semana"],
      ["Hace %s semanas", "En %s semanas"],
      ["Hace 1 mes", "En 1 mes"],
      ["Hace %s meses", "En %s meses"],
      ["Hace 1 a??o", "En 1 a??o"],
      ["Hace %s a??os", "En %s a??os"],
    ][index];
  };

  useEffect(() => {
    register("es_ES", localeFunc);
  }, []);

  /*return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );*/

  return (
    <>
      <div className="post" key={post._id}>
        <div className="contend_up_post">
          <Link to={`/profile/${user.username}`}>
            <div className="contend_up_post_user">
              <img
                src={user.profilePicture ? user.profilePicture : noAvatar}
                alt="Usuario"
                className="user_img_post"
              />
              <div className="contend_up_post_user_text">
                <p className="post_user">{user.username}</p>
                <p className="post_time">{format(post.createdAt, "es_ES")}</p>
              </div>
            </div>
          </Link>
          <div className="contend_up_post_delete">
            {isPostOwner() && (
              <Close
                style={{ fontSize: "3rem", cursor: "pointer" }}
                className="cursor-pointer"
                onClick={() => deletePost(post._id)}
              />
            )}
          </div>
        </div>
        <div className="contend_user_text">
          <p className="post_text">{post?.desc}</p>
        </div>
        <div className="contenedor_Image_Post">
          {post.img && (
            <img src={post.img} alt="Imagen" className="imagenPost" />
          )}
        </div>
        <div className="likesPost">
          <button
            className={isLiked ? "corazon corazon-active" : "corazon"}
            onClick={likeHandler}
          >
            ???
          </button>
          <p>{like}</p>
        </div>
      </div>
    </>
  );
}
