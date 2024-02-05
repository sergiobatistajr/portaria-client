"use client";
import { apiConstants } from "@/constants";
import { portariaFetch } from "@/lib.module";
import { createContext, useContext, useEffect, useState } from "react";
interface User {
  id: string;
  username: string;
  role: string;
}
interface LoginInput {
  username: string;
  password: string;
}
interface AuthContextProps {
  user?: User;
  login(input: LoginInput): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getMe() {
      const { user } = await portariaFetch.get(apiConstants.endpoints.me);
      setUser(user);
    }
    getMe();
  }, []);

  async function login(input: LoginInput) {
    const { user } = await portariaFetch.post(
      apiConstants.endpoints.login,
      input,
    );

    setUser(user);
  }
  async function logout() {
    await portariaFetch.get(apiConstants.endpoints.logout);
  }
  const contextProps: AuthContextProps = {
    user: user,
    login: login,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={contextProps}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth)
    throw new Error("AuthContext tem que ser usado dentro do provider");
  return auth;
};
