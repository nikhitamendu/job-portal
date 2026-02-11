import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  // 🔁 Try refreshing token on page load
  const tryRefresh = async () => {
    try {
      const res = await api.post("/auth/refresh");
      setAccessToken(res.data.accessToken);
      return true;
    } catch {
      return false;
    }
  };

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAccessToken(res.data.token);
    await loadUser();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const refreshed = await tryRefresh();

      if (refreshed) {
        await loadUser();
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
