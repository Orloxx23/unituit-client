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

function App() {
  const { user } = React.useContext(AuthContext);
  const { socket, setSocket } = React.useContext(SocketContext);

  React.useEffect(() => {
    const socket = io("https://unituit-api.herokuapp.com");
    setSocket(socket);
  }, []);

  React.useEffect(() => {
    socket?.emit("addUser", user?._id);
  }, [socket, user]);

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
