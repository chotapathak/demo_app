import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Wallet, History, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const Dashboard = () => {
    const { currentUser, EXCHANGE_RATE } = useAuth();
    const navigate = useNavigate();

    const recentTransactions = currentUser.transactions
        .slice(-3)
        .reverse();

    // Calculate quick stats
    const totalDeposits = currentUser.transactions
        .filter(t => t.type === 'deposit')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalWithdrawals = currentUser.transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0);

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative bg-blue-600 dark:bg-blue-900 text-white rounded-3xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 opacity-50"></div>
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">
                                    Good {getTimeOfDay()}, {currentUser.email.split('@')[0]}!
                                </h1>
                                <p className="text-blue-100 mb-6">
                                    Welcome back to your financial dashboard. Here's your quick overview.
                                </p>
                                <div className="flex space-x-4">
                                    <Button 
                                        variant="secondary" 
                                        className="bg-white dark:bg-blue-200 text-blue-600 dark:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-300"
                                        onClick={() => navigate('/wallet')}
                                    >
                                        <Wallet className="w-4 h-4 mr-2" />
                                        Add Money
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="border-white text-white hover:bg-blue-700 dark:hover:bg-blue-800 dark:border-blue-200"
                                        onClick={() => navigate('/transactions')}
                                    >
                                        <History className="w-4 h-4 mr-2" />
                                        View History
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-blue-100">Total Balance</p>
                                        <TrendingUp className="w-4 h-4 text-blue-100" />
                                    </div>
                                    <p className="text-2xl font-bold">₹{(currentUser.balance * EXCHANGE_RATE).toFixed(2)}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-blue-100">Last Activity</p>
                                        <Clock className="w-4 h-4 text-blue-100" />
                                    </div>
                                    <p className="text-lg font-semibold">
                                        {currentUser.transactions.length > 0 
                                            ? currentUser.transactions[currentUser.transactions.length - 1].date
                                            : 'No activity'}
                                    </p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-blue-100">Total Deposits</p>
                                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                                    </div>
                                    <p className="text-lg font-semibold text-green-400">
                                        ₹{(totalDeposits * EXCHANGE_RATE).toFixed(2)}
                                    </p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-blue-100">Total Withdrawals</p>
                                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                                    </div>
                                    <p className="text-lg font-semibold text-red-400">
                                        ₹{(totalWithdrawals * EXCHANGE_RATE).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Recent Activity</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center dark:text-white">
                                <History className="mr-2" /> Recent Transactions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentTransactions.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400">No recent transactions</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentTransactions.map(transaction => (
                                        <div 
                                            key={transaction.id}
                                            className="flex justify-between items-center border-b dark:border-gray-700 pb-2"
                                        >
                                            <div>
                                                <div className="font-medium dark:text-white">
                                                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {transaction.date}
                                                </div>
                                            </div>
                                            <div className={`font-medium ${
                                                transaction.type === 'deposit' 
                                                    ? 'text-green-600 dark:text-green-400' 
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}>
                                                {transaction.type === 'deposit' ? '+' : '-'}
                                                ₹{(transaction.amount * EXCHANGE_RATE).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Link 
                                to="/transactions"
                                className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-4 inline-block"
                            >
                                View All Transactions →
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center dark:text-white">
                                <Wallet className="mr-2" /> Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Button 
                                    className="w-full justify-start dark:text-white dark:hover:text-white" 
                                    variant="outline"
                                    onClick={() => navigate('/wallet')}
                                >
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Make a Deposit
                                </Button>
                                <Button 
                                    className="w-full justify-start dark:text-white dark:hover:text-white" 
                                    variant="outline"
                                    onClick={() => navigate('/wallet')}
                                >
                                    <ArrowDownRight className="mr-2 h-4 w-4" />
                                    Make a Withdrawal
                                </Button>
                                <Button 
                                    className="w-full justify-start dark:text-white dark:hover:text-white" 
                                    variant="outline"
                                    onClick={() => navigate('/profile')}
                                >
                                    <Clock className="mr-2 h-4 w-4" />
                                    View Account Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 
