// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(SecureStore.getItemAsync('authToken') || '');

    const updateToken = async(newToken) => {
        await SecureStore.setItemAsync('authToken', newToken);
        setToken(newToken);
    };

    const deleteToken = async() => {
        await SecureStore.deleteItemAsync('authToken');
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ token, updateToken, deleteToken }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};
