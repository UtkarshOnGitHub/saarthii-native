import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('authToken');
                if (storedToken) {
                    setToken(storedToken);
                } else {
                    setToken(null);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    const updateToken = async (newToken) => {
        try {
            await SecureStore.setItemAsync('authToken', newToken);
            setToken(newToken);
        } catch (error) {
            console.error('Error updating token:', error);
        }
    };

    const deleteToken = async () => {
        try {
            await SecureStore.deleteItemAsync('authToken');
            setToken(null);
        } catch (error) {
            console.error('Error deleting token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, updateToken, deleteToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
