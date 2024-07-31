import { useState } from 'react';
import useAxiosSecure from '@/Utilities/useAxiosSecure';
import Swal from 'sweetalert2';

const CashIN = () => {
    const [amount, setAmount] = useState('');
    const [agentEmail, setAgentEmail] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosSecure.post('/cash-in-request', { amount, agentEmail });

            if (response.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Cash-in request sent successfully',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Clear form fields
                setAmount('');
                setAgentEmail('');
            }
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
        <div className="container mx-auto my-10 p-10 bg-orange-200 border-2 md:w-1/2 shadow-lg shadow-deep-orange-200">
            <h2 className="text-2xl font-semibold mb-4">Cash In Request</h2>
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
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Request Cash In
                </button>
            </form>
        </div>
    );
};

export default CashIN;
