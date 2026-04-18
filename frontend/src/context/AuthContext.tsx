import React, { createContext } from 'react';

interface AuthUser {
    userId: string;
    email: string;
    name: string;
    rolName?: string;
}


interface AuthContextType {
    user: AuthUser | null;
    login: (token: string, user: AuthUser) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<AuthUser | null>(() => {
        const storedUser = localStorage.getItem('auth_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (token: string, userData: AuthUser) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('auth_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}
