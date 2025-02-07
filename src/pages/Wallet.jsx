import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { Wallet as WalletIcon } from 'lucide-react';

const Wallet = () => {
    const { currentUser, makeTransaction, EXCHANGE_RATE } = useAuth();
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('deposit');
    const [error, setError] = useState('');

    const handleTransaction = (e) => {
        e.preventDefault();
        setError('');

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        // Convert INR to USD for internal storage
        const amountInUSD = parsedAmount / EXCHANGE_RATE;

        if (transactionType === 'withdrawal' && amountInUSD > currentUser.balance) {
            setError('Insufficient funds');
            return;
        }

        if (makeTransaction(transactionType, amountInUSD)) {
            setAmount('');
            setError('');
        } else {
            setError('Transaction failed. Please try again.');
        }
    };

    return (
        <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Wallet</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <WalletIcon className="mr-2" /> Current Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            ₹{(currentUser.balance * EXCHANGE_RATE).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Make a Transaction</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleTransaction}>
                        <CardContent>
                            <div className="grid w-full gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Transaction Type</Label>
                                    <select
                                        value={transactionType}
                                        onChange={(e) => setTransactionType(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value="deposit">Deposit</option>
                                        <option value="withdrawal">Withdrawal</option>
                                    </select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Amount (INR)</Label>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm">{error}</div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Process Transaction</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Wallet; 