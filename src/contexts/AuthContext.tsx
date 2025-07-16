import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User, RegisterData } from "../types";
import { api } from "../utils/api";
import { getUserFromToken } from "../utils/jwt";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.post("/auth/login", { email, password });

      console.log("Login API Response:", data); // Debug log
      console.log("Login Data Sent:", { email, password }); // Debug log

      // Store the token first
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Try to get user info from JWT token
      let user: User;
      if (data.token) {
        const userFromToken = getUserFromToken(data.token);
        if (userFromToken) {
          user = userFromToken;
        } else {
          // Fallback if JWT decode fails
          user = {
            id: Math.random().toString(36),
            fullName: "User",
            email: email,
            university: "Unknown",
            role: "student",
            createdAt: new Date(),
          };
        }
      } else {
        // Fallback if no token
        user = {
          id: Math.random().toString(36),
          fullName: "User",
          email: email,
          university: "Unknown",
          role: "student",
          createdAt: new Date(),
        };
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Login successful! User:", user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const data = await api.post("/auth/signup", userData);

      console.log("Registration API Response:", data); // Debug log
      console.log("Registration Data Sent:", userData); // Debug log

      // Handle different possible response structures
      let userDataFromResponse;
      if (data.user) {
        userDataFromResponse = data.user;
      } else if (data.id || data.full_name || data.email) {
        userDataFromResponse = data;
      } else {
        // If no user data in response, use the registration data
        userDataFromResponse = {
          id: Math.random().toString(36),
          full_name: userData.full_name,
          email: userData.email,
          university: userData.university,
          role: "student",
          created_at: new Date().toISOString(),
        };
      }

      const user: User = {
        id: userDataFromResponse.id || Math.random().toString(36),
        fullName:
          userDataFromResponse.full_name ||
          userDataFromResponse.fullName ||
          userData.full_name,
        email: userDataFromResponse.email || userData.email,
        university: userDataFromResponse.university || userData.university,
        role: userDataFromResponse.role || "student",
        createdAt: new Date(
          userDataFromResponse.created_at ||
            userDataFromResponse.createdAt ||
            Date.now()
        ),
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      console.log("Registration successful! User:", user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
