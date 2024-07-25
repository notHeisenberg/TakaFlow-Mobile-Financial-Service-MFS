import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '@/Utilities/useAxiosSecure';
import { IoIosCheckbox, IoIosWarning } from 'react-icons/io';
import { BiBlock } from "react-icons/bi";
import Swal from 'sweetalert2';




const UserProfile = () => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        phoneNum: '',
        photoUrl: '',
        pin: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('access-token');

        if (!storedUser || !token) {
            navigate('/login');
            return;
        }

        setUser(storedUser);
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSave = async () => {
        console.log(user)
        document.getElementById('pin').value = null;
        if (user.pin == null || user.pin === '') {
            Swal.fire({
                title: "Enter PIN",
                text: "Please enter your PIN to update your profile",
                icon: "question"
            });
            return;
        }
        try {
            const response = await axiosSecure.patch('/update-profile', user);
            console.log(response)

            if (response.status === 200 && response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your prifile updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                const updatedUser = { ...user, pin: null };
                localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage

            }
            else if (response.status === 200 && response.data.modifiedCount === 0) {
                Swal.fire({
                    title: "No changes",
                    text: "No changes made to your profile",
                    icon: "info",
                    timer: 3000
                });
            }

        } catch (error) {
            console.error(error);
            if (error.response.status === 400) {
                Swal.fire({
                    title: error.response.data.message,
                    text: "Pin is incorrect",
                    icon: "error",
                    timer: 3000
                });
            }
            if (error.response.status === 500) {
                Swal.fire({
                    title: error.response.data.message,
                    text: "Internal server error",
                    icon: "error"
                });
            }

        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto my-10 p-5">
            <div className="relative bg-white shadow-md rounded p-14 mb-4">

                <p className={`absolute right-[35%] top-2 text-base badge ${user.status === 'pending' ? 'badge-warning' : user.status === 'active' ? 'badge-accent' : 'badge-error'
                    }`}>{
                        user.status === "pending" ? <>
                            <IoIosWarning></IoIosWarning> Pending
                        </>
                            : user.status === "active" ?
                                <>
                                    <IoIosCheckbox></IoIosCheckbox>   Active
                                </>
                                : <>
                                    <BiBlock />
                                    Blocked
                                </>
                    }</p>
                <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Update' : 'User'} Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 border-b">Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 text-gray-700"
                        />
                    ) : (
                        <p className="text-gray-700 text-base">{user.name}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 border-b">Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 text-gray-700 bg-blue-gray-100"
                            readOnly
                        />
                    ) : (
                        <p className="text-gray-700 text-base">{user.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 border-b">Phone Number:</label>
                    {isEditing ? (
                        <input
                            type="number"
                            name="phoneNum"
                            value={user.phoneNum}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 text-gray-700"
                        />
                    ) : (
                        <p className="text-gray-700 text-base">{user.phoneNum}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 border-b">PhotoURL:</label>
                    {isEditing ? (
                        <textarea
                            type="text"
                            name="photoUrl"
                            value={user?.photoUrl}
                            onChange={handleInputChange}
                            className="border rounded w-full min-h-36 flex flex-wrap py-2 px-3 text-gray-700"
                        />
                    ) : (
                        <p className="text-gray-700 text-base">{user?.photoUrl}</p>
                    )}
                </div>
                <div className="mb-4">
                    {isEditing ? (
                        <></>
                    ) : (
                        <>
                            <label className="block text-gray-700 text-sm font-bold mb-2 border-b">Role:</label>
                            <p className="text-gray-700 text-base">*{user.role}</p>
                        </>
                    )}
                </div>
                <div className="mb-4">
                    {isEditing && (
                        <>
                            <label className="block text-green-500 text-sm font-bold mb-2 border-b-2 border-dashed border-b-cyan-200"><span className='text-red-500'>*</span> Enter Your PIN:</label>
                            <input
                                type="text"
                                name="pin"
                                id='pin'
                                onChange={handleInputChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                                required
                            />
                        </>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                type='submit'
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
