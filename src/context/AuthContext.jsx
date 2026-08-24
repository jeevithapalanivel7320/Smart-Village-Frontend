import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smart_village_user');
    return saved ? JSON.parse(saved) : null;
});

const login = (userData) => {
    setUser(userData);
    localStorage.setItem('smart_village_user', JSON.stringify(userData));
};

const logout = () => {
    setUser(null);
    localStorage.removeItem('smart_village_user');
};

return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);