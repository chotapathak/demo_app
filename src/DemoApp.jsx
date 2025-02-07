import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Wallet, User, CreditCard, History } from 'lucide-react';

// Mock exchange rate (as of 2024)
const EXCHANGE_RATE = 83.50; // 1 USD = 83.50 INR

// Mock user data and authentication
const mockUsers = [
    {
        username: 'johndoe',
        password: 'password123',
        name: 'John Doe',
        balance: 5000,
        transactions: [
            { id: 1, type: 'deposit', amount: 1000, date: '2024-02-01' },
            { id: 2, type: 'withdrawal', amount: 500, date: '2024-02-05' }
        ]
    }
];

const DemoApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationData, setRegistrationData] = useState({
        newUsername: '',
        newPassword: '',
        name: ''
    });
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionType, setTransactionType] = useState('deposit');

    // Convert USD to INR
    const convertToRupees = (amount) => {
        return amount * EXCHANGE_RATE;
    };

    // Convert INR to USD
    const convertToDollars = (amount) => {
        return amount / EXCHANGE_RATE;
    };

    const handleLogin = () => {
        const user = mockUsers.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleRegistration = () => {
        const { newUsername, newPassword, name } = registrationData;

        if (mockUsers.some(u => u.username === newUsername)) {
            alert('Username already exists');
            return;
        }

        const newUser = {
            username: newUsername,
            password: newPassword,
            name: name,
            balance: 0,
            transactions: []
        };

        mockUsers.push(newUser);
        setCurrentUser(newUser);
        setIsLoggedIn(true);
    };

    const handleTransaction = () => {
        if (!currentUser) return;

        const amount = parseFloat(transactionAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Invalid amount');
            return;
        }

        const newTransaction = {
            id: currentUser.transactions.length + 1,
            type: transactionType,
            amount: amount,
            date: new Date().toISOString().split('T')[0]
        };

        if (transactionType === 'withdrawal' && amount > currentUser.balance) {
            alert('Insufficient funds');
            return;
        }

        const updatedBalance = transactionType === 'deposit'
            ? currentUser.balance + amount
            : currentUser.balance - amount;

        currentUser.balance = updatedBalance;
        currentUser.transactions.push(newTransaction);

        setCurrentUser({ ...currentUser });
        setTransactionAmount('');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUsername('');
        setPassword('');
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Demo App Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={handleLogin}>Login</Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Register</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Account</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            value={registrationData.name}
                                            onChange={(e) => setRegistrationData({
                                                ...registrationData,
                                                name: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Username
                                        </Label>
                                        <Input
                                            id="newUsername"
                                            className="col-span-3"
                                            value={registrationData.newUsername}
                                            onChange={(e) => setRegistrationData({
                                                ...registrationData,
                                                newUsername: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="newPassword" className="text-right">
                                            Password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            className="col-span-3"
                                            value={registrationData.newPassword}
                                            onChange={(e) => setRegistrationData({
                                                ...registrationData,
                                                newPassword: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleRegistration}>
                                    Create Account
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center">
                    <User className="mr-2" /> Welcome, {currentUser.name}
                </h1>
                <Button onClick={handleLogout} variant="destructive">
                    Logout
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Wallet Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Wallet className="mr-2" /> My Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            ${currentUser.balance.toFixed(2)}
                            <span className="text-sm ml-2 text-gray-500">
                                (₹{convertToRupees(currentUser.balance).toFixed(2)})
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="mr-2" /> Make a Transaction
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label>Transaction Type</Label>
                                <select
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    className="p-2 border rounded"
                                >
                                    <option value="deposit">Deposit</option>
                                    <option value="withdrawal">Withdrawal</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label>Amount (USD)</Label>
                                <Input
                                    type="number"
                                    value={transactionAmount}
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                />
                                <div className="text-sm text-gray-500">
                                    Equivalent in INR: ₹{transactionAmount ? convertToRupees(parseFloat(transactionAmount)).toFixed(2) : '0.00'}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleTransaction}>
                            Process Transaction
                        </Button>
                    </CardFooter>
                </Card>

                {/* Transaction History */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <History className="mr-2" /> Transaction History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {currentUser.transactions.length === 0 ? (
                            <p>No transactions yet.</p>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left">Date</th>
                                        <th className="text-left">Type</th>
                                        <th className="text-right">Amount (USD)</th>
                                        <th className="text-right">Amount (INR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUser.transactions.map(transaction => (
                                        <tr key={transaction.id} className="border-b">
                                            <td>{transaction.date}</td>
                                            <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                                            <td className={`text-right ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                                ${transaction.amount.toFixed(2)}
                                            </td>
                                            <td className={`text-right ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                                ₹{convertToRupees(transaction.amount).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DemoApp;