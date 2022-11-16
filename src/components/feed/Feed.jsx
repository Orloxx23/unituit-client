import {
  useContext,
  useEffect,
  useState,
} from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username, socket }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    const res = username
      ? await axios.get("https://unituit-api.herokuapp.com/api/posts/profile/" + username)
      : await axios.get("https://unituit-api.herokuapp.com/api/posts/timeline/" + user._id);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchPosts();
  }, [username, user._id]);

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p._id !== id));
  };

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share addPost={addPost}/>}
        {posts.map((p) => (
          <Post key={p._id || p.tempId} post={p} deleteP={deletePost} sokect={socket} />
        ))}
      </div>
    </div>
  );
}
