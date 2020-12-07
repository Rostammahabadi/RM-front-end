import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setToken,
        token,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
