// src/contexts/NavigationGuardContext.jsx
import { createContext, useContext, useState } from 'react';

const NavigationGuardContext = createContext();

export const NavigationGuardProvider = ({ children }) => {
  const [shouldWarn, setShouldWarn] = useState(false);

  return (
    <NavigationGuardContext.Provider value={{ shouldWarn, setShouldWarn }}>
      {children}
    </NavigationGuardContext.Provider>
  );
};

export const useNavigationGuardContext = () => useContext(NavigationGuardContext);
