// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

import { User,AuthContextType } from '../interfaces'; // 假設 User 介面已經定義在這個路徑



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 新增 loading 狀態

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (err) {

        console.error('❌ 解析 localStorage user 錯誤:', err);
        localStorage.removeItem('user'); // 清除壞掉的 user 資料
      }
    }
    setLoading(false); // 初始化完成
  }, []);

  const login = (jwt: string, user: User) => {
    if (!jwt || !user) {
      console.warn('⚠️ login 被呼叫但 jwt 或 user 無效:', jwt, user);
      return;
    }

    setToken(jwt);
    setUser(user);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
