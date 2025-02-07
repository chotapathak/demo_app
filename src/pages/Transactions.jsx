import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { History } from 'lucide-react';

const Transactions = () => {
    const { currentUser, EXCHANGE_RATE } = useAuth();

    const sortedTransactions = [...currentUser.transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Transaction History</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <History className="mr-2" /> All Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {sortedTransactions.length === 0 ? (
                        <p className="text-gray-500">No transactions yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Date</th>
                                        <th className="text-left py-2">Type</th>
                                        <th className="text-right py-2">Amount (INR)</th>
                                        <th className="text-left py-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTransactions.map(transaction => (
                                        <tr 
                                            key={transaction.id} 
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="py-3">{transaction.date}</td>
                                            <td className="py-3">
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </td>
                                            <td className={`text-right py-3 ${
                                                transaction.type === 'deposit' 
                                                    ? 'text-green-600' 
                                                    : 'text-red-600'
                                            }`}>
                                                {transaction.type === 'deposit' ? '+' : '-'}
                                                ₹{(transaction.amount * EXCHANGE_RATE).toFixed(2)}
                                            </td>
                                            <td className="py-3 text-gray-600">
                                                {transaction.description || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Transactions; 