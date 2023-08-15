import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // API 연결 모두 완료하면 위 코드 삭제하고 아래 코드 활성화
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const login = (id, token) => {
    setUserId(id);
    setAuthToken(token);

    localStorage.setItem("userId", id);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUserId(null);
    setAuthToken(null);

    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  };

  const BASE_URL = "https://yewon1209.pythonanywhere.com";

  return (
    <AuthContext.Provider
      value={{ authToken, userId, login, logout, BASE_URL }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}