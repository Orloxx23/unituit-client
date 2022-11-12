import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider, SocketProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
