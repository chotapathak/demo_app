import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { User, Wallet, LayoutDashboard, History, Sun, Moon } from 'lucide-react';

const Layout = () => {
    const { currentUser, logout, theme, updatePreferences } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        updatePreferences({ theme: newTheme });
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/wallet', label: 'Wallet', icon: Wallet },
        { path: '/transactions', label: 'Transactions', icon: History },
        { path: '/profile', label: 'Profile', icon: User }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Demo App</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navLinks.map(({ path, label, icon: Icon }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                                            ${isActiveRoute(path)
                                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="w-10 h-10 rounded-full"
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5" />
                                ) : (
                                    <Sun className="h-5 w-5" />
                                )}
                            </Button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentUser?.email}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">@{currentUser?.username}</div>
                                </div>
                            </div>
                            <Button onClick={handleLogout} variant="destructive" size="sm">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>

            <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © 2025 All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout; 
