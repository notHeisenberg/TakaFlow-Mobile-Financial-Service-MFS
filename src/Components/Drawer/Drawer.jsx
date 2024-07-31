import logout from '@/Hooks/Logout';
import useAxiosSecure from '@/Utilities/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const active = "bg-blue-400 text-yellow-300 font-xl border border-blue-400";
    const inactive = "text-blue-400 hover:bg-blue-400 hover:text-yellow-300";

    const user = JSON.parse(localStorage.getItem('user'));
    const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : "";

    const axiosSecure = useAxiosSecure();
    const { data: liveUser = [], refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (user && user.email) {
                const res = await axiosSecure.get(`/users/${user.email}`);
                return res.data;
            }
            return [];
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    // console.log(liveUser.user);

    const dashboardItems = <>
        {user &&
            <ul className="menu bg-inherit min-h-full w-80 h-screen p-4">
                <li>
                    <NavLink to={`/dashboard/${userType}-profile`} className={({ isActive }) => isActive ? active : inactive}>
                        {userType === "user" ? "User" : userType === "agent" ? "Agent" : "Admin"} Profile
                    </NavLink>
                </li>

                {/*  Normal user Routes */}
                {userType === "user" &&
                    <>
                        <li>
                            <NavLink to={`/dashboard/send-money`} className={({ isActive }) => isActive ? active : inactive}>
                                Send money
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/cash-out`} className={({ isActive }) => isActive ? active : inactive}>
                                Cash out
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/cash-in`} className={({ isActive }) => isActive ? active : inactive}>
                                Cash in
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/user-transactions`} className={({ isActive }) => isActive ? active : inactive}>
                                My transactions
                            </NavLink>
                        </li>
                    </>
                }
                {/* Agent specific routes */}
                {
                    userType === "agent" && <>
                        <li>
                            <NavLink to={`/dashboard/manage-transaction`} className={({ isActive }) => isActive ? active : inactive}>
                                Manage transactions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/agent-transactions`} className={({ isActive }) => isActive ? active : inactive}>
                                My transactions
                            </NavLink>
                        </li>
                    </>
                }
                {/* Admin specific routes */}
                {
                    userType === "admin" && <>
                        <li>
                            <NavLink to={`/dashboard/manage-users`} className={({ isActive }) => isActive ? active : inactive}>
                                Manage users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/all-transactions`} className={({ isActive }) => isActive ? active : inactive}>
                                All transactions
                            </NavLink>
                        </li>
                    </>
                }
                <li>
                    <NavLink to={`/`} className="text-green-500 font-bold hover:bg-green-400 hover:text-yellow-300">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/logout`} onClick={() => logout()} className="text-red-400 font-bold hover:bg-red-400 hover:text-yellow-300">
                        Logout
                    </NavLink>
                </li>
                {
                    userType !== "admin" &&
                    <li className='absolute bottom-2 left-20 z-10 text-lg border-deep-purple-500 rounded-xl badge badge-warning p-5'>
                        Balance: {""}
                        {parseFloat(liveUser?.user?.balance).toFixed(2)}৳
                    </li>
                }
            </ul>
        }
    </>

    return (
        <div className="relative drawer flex h-screen bg-gray-200">
            {/* Hamburger menu for small devices */}
            <div className={`md:hidden p-2 bg-blue-gray-700 ${!isOpen && 'bg-inherit'}`}>
                <button htmlFor="my-drawer-3" className="btn btn-square btn-ghost top-0" onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16"></path>
                    </svg>
                </button>
            </div>
            {/* Adjusted className to ensure drawer content is visible on large screens */}
            <div className={`drawer-content bg-blue-gray-700 flex flex-col ${isOpen ? 'block z-10' : 'hidden'} md:block lg:block`}>
                {dashboardItems}
            </div>
            <div className="p-4 flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Drawer;
