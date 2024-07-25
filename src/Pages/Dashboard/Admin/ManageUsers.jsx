import useAxiosSecure from "@/Utilities/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";


const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const axiosSecure = useAxiosSecure();
    const user = JSON.parse(localStorage.getItem('user'));

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    const activateUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to activate this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, activate it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/users/${id}`, { status: 'active' });
                refetch();
                Swal.fire(
                    'Activated!',
                    'User has been activated.',
                    'success'
                )
            }
        })
    }



    const blockUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to block this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/users/${id}`, { status: 'blocked' });
                refetch();
                Swal.fire(
                    'Blocked!',
                    'User has been blocked.',
                    'success'
                )
            }
        })
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="w-full mx-auto p-8">
            <div className="flex flex-col mb-5 justify-around items-center ">

                <input
                    type="text"
                    placeholder="Search users by name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border-2 border-lime-500"
                />
                <div className="absolute right-5 top-2">
                    <span className="flex flex-wrap text-xl font-bold border-2 text-indigo-500 border-red-500 p-2 rounded-xl">
                        Total Users: {users.length}
                    </span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Balance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index} className="hover">
                                <th>
                                    <img className="w-14 h-14 border-2 rounded-full border-deep-purple-500 hover:p-1 hover:bg-deep-orange-100" src={user.photoUrl} alt="" />
                                </th>
                                <th className="text-light-green-600">
                                    {user.name}
                                </th>
                                <th className={`${user.role === 'user' ? 'text-info' : 'text-success'}`}>
                                    {user.email}
                                </th>
                                <th className={`text-error`}>
                                    {user.phoneNum}
                                </th>
                                <th className={`${user.role === 'user' ? 'text-info' : 'text-success'}`}>
                                    {user.role}
                                </th>
                                <th className={`mt-7 badge badge-xs ${user.status === 'pending' ? 'badge-warning' : user.status === 'active' ? 'badge-accent' : 'badge-error'
                                    }`}>
                                    {user.status}
                                </th>
                                <th className="text-warning">
                                    {user.balance}৳
                                </th>
                                <th className="flex flex-col justify-center items-center gap-2">
                                    {user.status === 'pending' ?
                                        <>
                                            <button className="btn btn-sm btn-success" onClick={() => activateUser(user._id)}>Activate</button>
                                            <button className="btn btn-sm btn-error" onClick={() => blockUser(user._id)}>Block</button>
                                        </>
                                        : user.status === 'active' ?
                                            <button className="btn btn-sm btn-error" onClick={() => blockUser(user._id)}>Block</button>
                                            : <></>
                                    }
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;