import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Đơn giản cho demo - trong thực tế sử dụng JWT token
  const adminCredentials = {
    username: "admin",
    password: "admin123",
  };

  useEffect(() => {
    // Kiểm tra localStorage xem user đã login admin chưa
    const adminLoggedIn = localStorage.getItem("isAdmin") === "true";
    if (adminLoggedIn) {
      setIsAdmin(true);
      setIsAuthenticated(true);
    }
  }, []);

  const loginAsAdmin = useCallback((username, password) => {
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setIsAdmin(true);
      setIsAuthenticated(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    localStorage.removeItem("isAdmin");
  }, []);

  const value = useMemo(
    () => ({
      isAdmin,
      isAuthenticated,
      loginAsAdmin,
      logout,
    }),
    [isAdmin, isAuthenticated, loginAsAdmin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
