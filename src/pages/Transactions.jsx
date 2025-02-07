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
            <h2 className="text-3xl font-bold dark:text-white">Transaction History</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center dark:text-white">
                        <History className="mr-2" /> All Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {sortedTransactions.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-300">Date</th>
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-300">Type</th>
                                        <th className="text-right py-2 text-gray-600 dark:text-gray-300">Amount (INR)</th>
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-300">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTransactions.map(transaction => (
                                        <tr 
                                            key={transaction.id} 
                                            className="group border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <td className="py-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
                                                {transaction.date}
                                            </td>
                                            <td className="py-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </td>
                                            <td className={`text-right py-3 ${
                                                transaction.type === 'deposit' 
                                                    ? 'text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300' 
                                                    : 'text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300'
                                            }`}>
                                                {transaction.type === 'deposit' ? '+' : '-'}
                                                ₹{(transaction.amount * EXCHANGE_RATE).toFixed(2)}
                                            </td>
                                            <td className="py-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
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
