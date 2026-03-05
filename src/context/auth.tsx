"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role =
  | "customer"
  | "salon"
  | "stylist"
  | "event-stylist"
  | "vendor"
  | "admin";

export type AuthUser = {
  email: string;
  role: Role;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (payload: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "buff_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // restore session (frontend only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AuthUser;
      if (parsed?.email && parsed?.role) setUser(parsed);
    } catch {
      // ignore
    }
  }, []);

  const login = (payload: AuthUser) => {
    setUser(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
