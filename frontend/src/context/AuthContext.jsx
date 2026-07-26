import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [onLoginCallbacks, setOnLoginCallbacks] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    // Register callback to be called after login
    const onLogin = useCallback((callback) => {
        setOnLoginCallbacks((prev) => [...prev, callback]);
        return () => {
            setOnLoginCallbacks((prev) => prev.filter((cb) => cb !== callback));
        };
    }, []);

    // Execute all login callbacks
    const executeLoginCallbacks = useCallback(async () => {
        for (const callback of onLoginCallbacks) {
            try {
                await callback();
            } catch (error) {
                console.error('Login callback error:', error);
            }
        }
    }, [onLoginCallbacks]);

    const login = async (email, password) => {
        try {
            const { data } = await authAPI.login({ email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Logged in successfully!');

            // Execute callbacks (like cart sync)
            await executeLoginCallbacks();

            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await authAPI.register({ name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Registration successful!');

            // Execute callbacks (like cart sync)
            await executeLoginCallbacks();

            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const updateProfile = async (userData) => {
        try {
            const { data } = await authAPI.updateProfile(userData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Profile updated successfully!');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Update failed';
            toast.error(message);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        onLogin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
