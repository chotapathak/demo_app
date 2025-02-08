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
            {/* NHS Header */}
            <header className="bg-[#005eb8] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <svg className="h-8 w-20 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16">
                                    <path fill="#fff" d="M0 0h40v16H0z"/>
                                    <path fill="#005eb8" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"/>
                                </svg>
                                <span className="text-xl font-bold">Demo App</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="w-10 h-10 rounded-full text-white hover:bg-blue-700"
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5" />
                                ) : (
                                    <Sun className="h-5 w-5" />
                                )}
                            </Button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium text-white">{currentUser?.email}</div>
                                    <div className="text-xs text-blue-200">@{currentUser?.username}</div>
                                </div>
                            </div>
                            <Button onClick={handleLogout} variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`inline-flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                                    isActiveRoute(path)
                                        ? 'border-[#005eb8] text-[#005eb8] dark:text-blue-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-[#005eb8] dark:hover:text-blue-400'
                                }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>

            <footer className="bg-[#005eb8] text-white mt-auto">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm">
                        © 2024 Demo App. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout; 
