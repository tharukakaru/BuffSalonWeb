"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "customer" | "salon" | "stylist" | "event-stylist" | "vendor" | "admin";

type AuthState = {
  isAuthenticated: boolean;
  role: Role | null;
  email: string | null;
};

type AuthContextValue = AuthState & {
  login: (args?: { email?: string; role?: Role }) => void;
  logout: () => void;
  setRole: (role: Role) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LS_KEY = "buff_auth";

function readLS(): AuthState {
  if (typeof window === "undefined") return { isAuthenticated: false, role: null, email: null };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { isAuthenticated: false, role: null, email: null };
    const parsed = JSON.parse(raw);
    return {
      isAuthenticated: !!parsed.isAuthenticated,
      role: (parsed.role ?? null) as Role | null,
      email: (parsed.email ?? null) as string | null,
    };
  } catch {
    return { isAuthenticated: false, role: null, email: null };
  }
}

function writeLS(state: AuthState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ isAuthenticated: false, role: null, email: null });

  useEffect(() => {
    setState(readLS());
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...state,
      login: (args) => {
        const next: AuthState = {
          isAuthenticated: true,
          role: args?.role ?? state.role ?? "customer",
          email: args?.email ?? state.email ?? null,
        };
        setState(next);
        writeLS(next);
      },
      logout: () => {
        const next: AuthState = { isAuthenticated: false, role: null, email: null };
        setState(next);
        writeLS(next);
      },
      setRole: (role) => {
        const next: AuthState = { ...state, role };
        setState(next);
        writeLS(next);
      },
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
