import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('skyline_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skyline_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          localStorage.setItem('skyline_user', JSON.stringify(data.user));
        } else {
          logout();
        }
      } catch (err) {
        console.error('Auth verification failed', err);
      } finally {
        setLoading(false);
      }
    }
    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('skyline_token', data.token);
    localStorage.setItem('skyline_user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('skyline_token');
    localStorage.removeItem('skyline_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

