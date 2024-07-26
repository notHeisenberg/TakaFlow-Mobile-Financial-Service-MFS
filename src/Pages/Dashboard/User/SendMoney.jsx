import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/Utilities/useAxiosSecure';

const SendMoney = () => {
    const [amount, setAmount] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSendMoney = async (e) => {
        e.preventDefault();
        if (amount < 50) {
            Swal.fire({
                title: "Invalid Amount",
                text: "Transaction amount must be at least 50 Taka",
                icon: "error",
                timer: 3000
            });
            return;
        }
        if (receiverEmail === '') {
            Swal.fire({
                title: "Invalid Receiver",
                text: "Receiver's email is required",
                icon: "error",
                timer: 3000
            });
            return;
        }
        if (pin === '') {
            Swal.fire({
                title: "Empty PIN",
                text: "PIN is required",
                icon: "error",
                timer: 3000
            });
            return;
        }

        const transactionData = {
            amount: Number(amount),
            receiverEmail,
            pin
        };
        // console.log(transactionData)

        try {
            const response = await axiosSecure.post('/send-money', transactionData);

            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Money sent successfully",
                    icon: "success",
                    timer: 3000
                });

                // Clear the form fields after successful transaction
                setAmount('');
                setReceiverEmail('');
                setPin('');
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error(error);
            if (error.response.status === 400) {
                Swal.fire({
                    title: error.response.data.message,
                    text: "Please provide correct PIN",
                    icon: "error",
                    timer: 3000
                });
                return;
            }
            if (error.response.status === 404) {
                Swal.fire({
                    title: error.response.data.message,
                    text: "Please provide correct receiver's email",
                    icon: "error",
                    timer: 3000
                });
                return;
            }
            if (error.response.status === 406) {
                Swal.fire({
                    title: error.response.data.message,
                    text: "Balance is not sufficient",
                    icon: "error",
                    timer: 3000
                });
                return;
            }
            if (error.response.status === 405) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                    timer: 3000
                });
                return;
            }

            if (error.response.status === 500) {
                Swal.fire({
                    title: error.response.data.message,
                    text: "Please try again later",
                    icon: "error",
                    timer: 3000
                });
                return;
            }
        }
    };

    return (
        <>
            {
                user.status === "blocked" ?
                    <div className="container mx-auto my-10 p-5">
                        <h1 className="text-2xl font-semibold text-red-500">Your account is blocked. Please contact the admin</h1>
                    </div>
                    :
                    <div className="container mx-auto my-10 p-5">
                        <form className="bg-white shadow-md rounded p-10">
                            <h2 className="text-2xl font-semibold mb-4">Send Money</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="border rounded w-full py-2 px-3 text-gray-700"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Receiver's Email:</label>
                                <input
                                    type="email"
                                    value={receiverEmail}
                                    onChange={(e) => setReceiverEmail(e.target.value)}
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
                                />
                            </div>
                            <button
                                onClick={handleSendMoney}
                                type='submit'
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Send Money
                            </button>
                        </form>
                    </div>
            }
        </>


    );
};

export default SendMoney;
