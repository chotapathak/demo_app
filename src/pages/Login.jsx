import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (login(username, password)) {
            navigate('/');
        } else {
            setError('Invalid credentials. Try demo/demo123');
        }
    };

    const handleDemoLogin = () => {
        if (login('demo', 'demo123')) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#005eb8]">
            <header className="bg-white p-4">
                <div className="max-w-7xl mx-auto">
                    <svg className="h-8 w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16">
                        <path fill="#005eb8" d="M0 0h40v16H0z"/>
                        <path fill="#fff" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"/>
                    </svg>
                </div>
            </header>
            
            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
                <Card className="w-full max-w-md bg-white">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-[#005eb8]">Welcome Back</CardTitle>
                        <p className="text-gray-600">Please login to access your account</p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="border-gray-300"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border-gray-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>
                            )}
                            <div className="text-sm text-gray-600">
                                <p>Demo Credentials:</p>
                                <p>Username: demo</p>
                                <p>Password: demo123</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full bg-[#005eb8] hover:bg-[#003d78]">
                                Login
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full border-[#005eb8] text-[#005eb8] hover:bg-[#005eb8] hover:text-white"
                                onClick={handleDemoLogin}
                            >
                                Try Demo Account
                            </Button>
                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-[#005eb8] hover:underline">
                                    Register here
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    );
};

export default Login; 
