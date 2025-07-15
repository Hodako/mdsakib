import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  adminData: any;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth');
    if (adminAuth) {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const fetchAdminData = async () => {
    const { data } = await supabase
      .from('admin')
      .select('*')
      .eq('username', 'sakib')
      .single();
    setAdminData(data);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, simple check
      if (username === 'sakib' && password === 'sakib69') {
        localStorage.setItem('admin_auth', 'true');
        setIsAuthenticated(true);
        await fetchAdminData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setAdminData(null);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, adminData }}>
      {children}
    </AdminContext.Provider>
  );
};