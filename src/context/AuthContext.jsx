import React, { createContext, useState, useContext, useEffect } from 'react';

// Mock exchange rate and user data
const EXCHANGE_RATE = 83.50;
const mockUsers = [
    {
        username: 'demo',
        password: 'demo123',
        email: 'demo@example.com',
        phone: '+91 98765 43210',
        address: '123 Main St, Mumbai, India',
        balance: 25000,
        accountType: 'Savings',
        accountNumber: '1234567890',
        joinDate: '2024-01-01',
        transactions: [
            { id: 1, type: 'deposit', amount: 10000, date: '2024-02-07', description: 'Salary Credit' },
            { id: 2, type: 'withdrawal', amount: 2500, date: '2024-02-07', description: 'ATM Withdrawal' },
            { id: 3, type: 'deposit', amount: 5000, date: '2024-02-06', description: 'Freelance Payment' },
            { id: 4, type: 'withdrawal', amount: 1500, date: '2024-02-06', description: 'Utility Bill Payment' },
            { id: 5, type: 'deposit', amount: 3000, date: '2024-02-05', description: 'Client Payment' },
            { id: 6, type: 'withdrawal', amount: 800, date: '2024-02-05', description: 'Grocery Shopping' }
        ],
        preferences: {
            notifications: true,
            twoFactorAuth: false,
            language: 'English',
            currency: 'INR',
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

    return (
        <AuthContext.Provider value={{
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
        }}>
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
