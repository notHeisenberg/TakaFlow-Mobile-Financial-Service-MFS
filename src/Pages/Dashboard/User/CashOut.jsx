import React, { useState } from 'react';
import useAxiosSecure from '@/Utilities/useAxiosSecure';
import Swal from 'sweetalert2';

const CashOut = () => {
    const [amount, setAmount] = useState('');
    const [agentEmail, setAgentEmail] = useState('');
    const [pin, setPin] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosSecure.post('/cash-out', { amount, agentEmail, pin });
            console.log(response.data)

            if (response.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Cash-out successful',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Clear form fields
                setAmount('');
                setAgentEmail('');
                setPin('');
            }
            setTimeout(() => {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.reload();
            }, 1500);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response ? error.response.data.message : 'Server error',
                icon: 'error',
                timer: 3000
            });
        }
    };

    return (
        <div className="container mx-auto my-10 p-10 border-2 bg-deep-purple-200 md:w-1/2 shadow-lg shadow-purple-200">
            <h2 className="text-2xl font-semibold mb-4">Cash Out</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Agent Email:</label>
                    <input
                        type="email"
                        value={agentEmail}
                        onChange={(e) => setAgentEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">PIN:</label>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cash Out
                </button>
            </form>
        </div>
    );
};

export default CashOut;
