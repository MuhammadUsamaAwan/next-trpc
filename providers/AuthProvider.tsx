'use client';

import { createContext, useEffect, useState } from 'react';
import { type JwtPayload, decode } from 'jsonwebtoken';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decode(token) as User & JwtPayload;
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      } else {
        setUser(decoded);
      }
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
