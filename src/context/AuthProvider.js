import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';


export const AuthContext = createContext();

// context section
const AuthProvider = ({ children }) => {
    const allContexts = useFirebase();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;