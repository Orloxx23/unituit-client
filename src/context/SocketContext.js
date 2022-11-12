import React from "react";

const SocketContext = React.createContext();

function SocketProvider(props) {

  const [socket, setSocket] = React.useState(null);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
