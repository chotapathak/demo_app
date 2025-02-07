import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { Wallet, History } from 'lucide-react';

const Dashboard = () => {
    const { currentUser, EXCHANGE_RATE } = useAuth();

    const recentTransactions = currentUser.transactions
        .slice(-3)
        .reverse();

    return (
        <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Wallet className="mr-2" /> Current Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            ₹{(currentUser.balance * EXCHANGE_RATE).toFixed(2)}
                        </div>
                        <Link 
                            to="/wallet"
                            className="text-sm text-blue-500 hover:text-blue-700 mt-2 inline-block"
                        >
                            Manage Wallet →
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <History className="mr-2" /> Recent Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentTransactions.length === 0 ? (
                            <p className="text-gray-500">No recent transactions</p>
                        ) : (
                            <div className="space-y-4">
                                {recentTransactions.map(transaction => (
                                    <div 
                                        key={transaction.id}
                                        className="flex justify-between items-center border-b pb-2"
                                    >
                                        <div>
                                            <div className="font-medium">
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {transaction.date}
                                            </div>
                                        </div>
                                        <div className={`font-medium ${
                                            transaction.type === 'deposit' 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
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
                            className="text-sm text-blue-500 hover:text-blue-700 mt-4 inline-block"
                        >
                            View All Transactions →
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard; 