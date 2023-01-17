import React, { createContext, useState } from "react";

const initialState = "light";
const ColorContext = createContext(initialState);

function ColorProvider({ children }) {
  const [mode, setMode] = useState(initialState);

  const toogleColorCode = (code) => {
    setMode(code);
  };

  return (
    <ColorContext.Provider value={{ mode, toogleColorCode }}>
      {children}
    </ColorContext.Provider>
  );
}

export { ColorProvider, ColorContext };
