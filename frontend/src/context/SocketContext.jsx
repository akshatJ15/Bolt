
import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const socket = io(`${import.meta.env.VITE_BASE_URL}`);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);


  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;