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

  useEffect(() => {
    // Purge any stale client-side demo auth flags from previous iterations
    try {
      if (localStorage.getItem("isAdmin")) {
        localStorage.removeItem("isAdmin");
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const loginAsAdmin = useCallback(() => {
    // Hardcoded client-side credentials removed for production security.
    // Public exposure of admin capabilities is disabled until backend JWT authentication is implemented.
    console.warn(
      "Admin login is disabled: client-side authentication has been deactivated for production security. Backend authentication required."
    );
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("isAdmin");
    } catch {
      // Ignore storage access errors
    }
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
