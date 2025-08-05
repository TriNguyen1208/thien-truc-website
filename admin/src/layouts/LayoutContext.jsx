// src/contexts/LayoutContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layoutProps, setLayoutProps] = useState({
    title: "",
    description: "",
    hasButton: false,
    buttonLabel: "",
    buttonAction: null,
  });

  return (
    <LayoutContext.Provider value={{ layoutProps, setLayoutProps }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
