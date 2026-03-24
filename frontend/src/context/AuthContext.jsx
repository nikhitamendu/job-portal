//AuthContext.jsx controls login state in React UI.It stores login state globally and keeps the user logged in across pages and refresh using refresh token.
import { createContext, useContext, useEffect, useState } from "react";
//createContext → creates a global store (like global state without Redux)
//useContext → lets components read that global state
import api, { setAccessToken } from "../services/api";

const AuthContext = createContext(null); //this line checks user is logged in

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  //logged-in user data
  const [loading, setLoading] = useState(true); //checking login status during page load

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }  //it came from the backend and tells the frontend who am i
  };

  // 🔁 Try refreshing token on page load
  const tryRefresh = async () => {
    try {
      const res = await api.post("/auth/refresh");
      setAccessToken(res.data.accessToken);
      return true;
    } catch {
      return false;  //page reloads,access token expired,browser still has cookie ,/auth/refresh gives new access token user stays logged in
    }
  };

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAccessToken(res.data.token);  //saves access token in axios header
    await loadUser();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    setAccessToken(null);
    setUser(null);
  };  //remove token and user
//“When the app first opens, should the user still be logged in or not?” 
//auto login
  useEffect(() => {
    const initAuth = async () => {
      const refreshed = await tryRefresh();

      if (refreshed) {
        await loadUser();
      }

      setLoading(false);
    }; //Restores login session automatically when the app starts.

    initAuth();
  }, []);   //runs only onece when app opens

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
