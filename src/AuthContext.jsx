import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const apiUrl = 'http://localhost:8000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data if logged in
  const [loading, setLoading] = useState(true); // Indicates if auth status is being checked

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('checking auth status', loading);

      const storedUser = localStorage.getItem('auth');
      let currentUser = null;
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
        setUser(currentUser);
      }

      if (!currentUser || !currentUser.access_token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch(apiUrl + '/api/users/current', {
        headers: {
          Authorization: 'Bearer ' + currentUser.access_token,
        },
      });
      const data = await response.json();

      console.log('me', data);

      if (data.status === 'ok') {
        console.log('Setting Current user', currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      const response = await fetch(apiUrl + '/api/login', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('data', data);
      setUser(data.data);
      localStorage.setItem('auth', JSON.stringify(data.data));
      return data.data;
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
