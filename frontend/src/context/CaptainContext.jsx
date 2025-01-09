
import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainDataProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};