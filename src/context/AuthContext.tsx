"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { isLoggedIn, username } = JSON.parse(storedAuth);
      setIsLoggedIn(isLoggedIn);
      setUsername(username);
    }
  }, []);

  const login = async (email: string) => {
    // Simulate API call
    console.log("Attempting login for:", email);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const username = email.split("@")[0];
    setIsLoggedIn(true);
    setUsername(username);

    localStorage.setItem(
      "auth",
      JSON.stringify({ isLoggedIn: true, username })
    );
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
