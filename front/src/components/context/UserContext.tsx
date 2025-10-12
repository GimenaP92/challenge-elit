'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types/Iuser';
import { Task, TaskStatus } from '../types/Itask';

interface UserContextProps {
  user: User | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (user: User, token: string) => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar persistencia desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
  };

  const addTask = (task: Task) => {
    if (!user) return;
    setUser({
      ...user,
      tasks: [...(user.tasks || []), task],
    });
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    if (!user) return;
    setUser({
      ...user,
      tasks: user.tasks.map((t) =>
        t.id === taskId ? { ...t, status } : t
      ),
    });
  };

  const deleteTask = (taskId: string) => {
    if (!user) return;
    setUser({
      ...user,
      tasks: user.tasks.filter((t) => t.id !== taskId),
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ user, token, setUser, setToken, login, addTask, updateTaskStatus, deleteTask, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
