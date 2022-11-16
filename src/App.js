/* eslint-disable react-hooks/exhaustive-deps */
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import { AuthContext, SocketContext } from "./context";
import { io } from "socket.io-client";
import axios from "axios";

function App() {
  const { user } = React.useContext(AuthContext);
  const { socket, setSocket } = React.useContext(SocketContext);

  React.useEffect(() => {
    const socket = io("https://unituit-api.herokuapp.com");
    //const socket = io("http://localhost:8800");
    setSocket(socket);
  }, []);

  React.useEffect(() => {
    socket?.emit("addUser", user?._id);
  }, [socket, user]);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("https://unituit-api.herokuapp.com/api/users?userId=" + user._id);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
