import React, { createContext, useState, useContext, useEffect } from 'react';

// Mock exchange rate and user data
const EXCHANGE_RATE = 83.50;
const mockUsers = [
    {
        username: 'johndoe',
        password: 'password123',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        balance: 5000,
        accountType: 'Savings',
        accountNumber: '1234567890',
        joinDate: '2024-01-01',
        transactions: [
            { id: 1, type: 'deposit', amount: 1000, date: '2024-02-01', description: 'Initial deposit' },
            { id: 2, type: 'withdrawal', amount: 500, date: '2024-02-05', description: 'ATM withdrawal' }
        ],
        preferences: {
            notifications: true,
            twoFactorAuth: false,
            language: 'English',
            currency: 'USD',
            theme: 'light'
        }
    }
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const login = (username, password) => {
        const user = mockUsers.find(
            u => u.username === username && u.password === password
        );
        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            setTheme(user.preferences.theme || 'light');
            return true;
        }
        return false;
    };

    const register = (userData) => {
        if (mockUsers.some(u => u.username === userData.username)) {
            return false;
        }

        const newUser = {
            ...userData,
            phone: '',
            address: '',
            balance: 0,
            accountType: 'Savings',
            accountNumber: Math.random().toString().slice(2, 12),
            joinDate: new Date().toISOString().split('T')[0],
            transactions: [],
            preferences: {
                notifications: true,
                twoFactorAuth: false,
                language: 'English',
                currency: 'USD',
                theme: 'light'
            }
        };

        mockUsers.push(newUser);
        setCurrentUser(newUser);
        setIsLoggedIn(true);
        return true;
    };

    const updateProfile = (updates) => {
        if (!currentUser) return false;

        const updatedUser = {
            ...currentUser,
            ...updates
        };

        const userIndex = mockUsers.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            mockUsers[userIndex] = updatedUser;
            setCurrentUser(updatedUser);
            return true;
        }
        return false;
    };

    const updatePreferences = (preferences) => {
        if (!currentUser) return false;

        const updatedUser = {
            ...currentUser,
            preferences: {
                ...currentUser.preferences,
                ...preferences
            }
        };

        if (preferences.theme) {
            setTheme(preferences.theme);
        }

        const userIndex = mockUsers.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            mockUsers[userIndex] = updatedUser;
            setCurrentUser(updatedUser);
            return true;
        }
        return false;
    };

    const makeTransaction = (type, amount, description = '') => {
        if (!currentUser) return false;

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) return false;

        if (type === 'withdrawal' && parsedAmount > currentUser.balance) {
            return false;
        }

        const newTransaction = {
            id: currentUser.transactions.length + 1,
            type,
            amount: parsedAmount,
            date: new Date().toISOString().split('T')[0],
            description
        };

        const updatedBalance = type === 'deposit'
            ? currentUser.balance + parsedAmount
            : currentUser.balance - parsedAmount;

        const updatedUser = {
            ...currentUser,
            balance: updatedBalance,
            transactions: [...currentUser.transactions, newTransaction]
        };

        setCurrentUser(updatedUser);
        const userIndex = mockUsers.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            mockUsers[userIndex] = updatedUser;
        }

        return true;
    };

    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
    };

    const value = {
        currentUser,
        isLoggedIn,
        theme,
        login,
        register,
        logout,
        makeTransaction,
        updateProfile,
        updatePreferences,
        EXCHANGE_RATE
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 