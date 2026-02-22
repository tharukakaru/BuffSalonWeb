"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LS_KEY = "lilyhairapp:isLoggedIn";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      setIsLoggedIn(raw === "true");
    } catch {}
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      login: () => {
        setIsLoggedIn(true);
        try {
          localStorage.setItem(LS_KEY, "true");
        } catch {}
      },
      logout: () => {
        setIsLoggedIn(false);
        try {
          localStorage.setItem(LS_KEY, "false");
        } catch {}
      },
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}
