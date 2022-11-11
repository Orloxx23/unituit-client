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
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  async function registerWorker() {
    if ("serviceWorker" in navigator) {
      subscription();
      let url = process.env.PUBLIC_URL + "/worker.js";
      const reg = await navigator.serviceWorker.register(url, { scope: "/" });
      console.log("service config is", { reg });
      return reg;
    }
    throw Error("serviceworker not supported");
  }

  React.useEffect(() => {
    registerWorker();
  }, []);

  const subscription = async () => {
    const PUBLIC_VAPID_KEY =
      "BEyTAdeeDZzxzcAhiRbYQ5dbkYZA8m7n78TPzizfhwSDrqr-1CUGY97WoGw8NdhdSOkE0Gol9fsCz0mz0o8kig8";
    // Service Worker
    console.log("Registering a Service worker");
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/",
    });
    console.log("New Service Worker");

    // Listen Push Notifications
    console.log("Listening Push Notifications");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
    });

    console.log(subscription);

    // Send Notification
    await fetch("https://unituit-api.herokuapp.com/api/subscription", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Subscribed!");
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
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
