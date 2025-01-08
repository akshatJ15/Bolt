import React, { createContext, useState, useContext } from "react";
import { SocketContext } from "./SocketContext.jsx";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const { sendMessage, receiveMessage } = useContext(SocketContext);

  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser, sendMessage, receiveMessage }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;