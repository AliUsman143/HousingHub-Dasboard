"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize user from localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const updateUser = (userData) => {
    // Update both context and localStorage
    setUser(userData);
    if (userData) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userInfo');
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};