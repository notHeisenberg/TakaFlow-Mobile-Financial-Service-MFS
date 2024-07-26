import useAxiosSecure from "@/Utilities/useAxiosSecure";
import { useEffect, useState } from "react";


const AgentTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const axiosSecure = useAxiosSecure();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosSecure.get('/user-transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactions();
    }, [axiosSecure]);
    return (
        <>
            {
                transactions.length === 0 ? <div className="container mx-auto my-10 p-5">
                    <h2 className="text-2xl font-semibold mb-4">{user.status === 'blocked' ? '' : 'Transaction History'}</h2>
                    <div className="overflow-x-auto">
                        {
                            user.status === "blocked" ?
                                <h1 className="text-2xl font-semibold text-red-500">Your account is blocked. Please contact the admin</h1>
                                :
                                <table className="min-w-full bg-white border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 text-lg border">Transaction ID</th>
                                            <th className="py-2 px-4 text-lg border">Sender Number</th>
                                            <th className="py-2 px-4 text-lg border">Reciever Number</th>
                                            <th className="py-2 px-4 text-lg border">Type</th>
                                            <th className="py-2 px-4 text-lg border">Amount</th>
                                            <th className="py-2 px-4 text-lg border">Status</th>
                                            <th className="py-2 px-4 text-lg border">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="5" className="py-2 px-4 border text-center">No transaction history found</td>
                                        </tr>
                                    </tbody>
                                </table>
                        }
                    </div>
                </div>
                    :
                    <div className="container mx-auto my-10 p-5">
                        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 text-lg border">Transaction ID</th>
                                        <th className="py-2 px-4 text-lg border">Sender Number</th>
                                        <th className="py-2 px-4 text-lg border">Reciever Number</th>
                                        <th className="py-2 px-4 text-lg border">Type</th>
                                        <th className="py-2 px-4 text-lg border">Amount</th>
                                        <th className="py-2 px-4 text-lg border">Status</th>
                                        <th className="py-2 px-4 text-lg border">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.transactionId}>
                                            <td className="py-2 px-4 text-md text-center border text-green-500">{transaction.transactionId}</td>
                                            <td className="py-2 px-4 text-md text-center border text-pink-400">{transaction.senderInfo.phoneNum}</td>
                                            <td className="py-2 px-4 text-md text-center border text-purple-400">{transaction.receiverInfo.phoneNum}</td>
                                            <td className="py-2 px-4 text-md text-center border">{transaction.transactionType === 'cash-in'
                                                ? <span className="text-blue-500">Cash In</span>
                                                : transaction.transactionType === 'cash-out'
                                                    ? <span className="text-yellow-500">Cash Out</span>
                                                    : <span className="text-cyan-500">Send Money</span>
                                            }</td>
                                            <td className="py-2 px-4 text-md text-center border text-warning">{transaction.amount}</td>
                                            <td className="py-2 px-4 text-md text-center border">{transaction.status === 'success'
                                                ? <span className="text-green-500">Success</span>
                                                : <span className="text-red-500">Failed</span>
                                            }</td>
                                            <td className="py-2 px-4 text-md text-center border">{new Date(transaction.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    );
};

export default AgentTransactions;