import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const active = "bg-blue-400 text-yellow-300 font-xl border border-blue-400";
    const inactive = "text-blue-400 hover:bg-blue-400 hover:text-yellow-300";

    const userType = "user";

    const dashboardItems = <>
        <ul className="menu bg-slate-300 min-h-full w-80 h-screen p-4">
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
                            Agent transactions
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
                <NavLink to={`/logout`} className="text-red-400 font-bold hover:bg-red-400 hover:text-yellow-300">
                    Logout
                </NavLink>
            </li>
        </ul>
    </>

    return (
        <div className="drawer flex">
            <div>
                {/* Hamburger menu for small devices */}
                <div className={`md:hidden p-4 bg-slate-300 ${!isOpen && 'bg-inherit'}`}>
                    <button htmlFor="my-drawer-3" className="btn btn-square btn-ghost" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16"></path>
                        </svg>
                    </button>
                </div>
                {/* Adjusted className to ensure drawer content is visible on large screens */}
                <div className={`drawer-content flex flex-col ${isOpen ? 'lg:flex' : 'hidden lg:flex'}`}>

                    {dashboardItems}

                </div>
                {/* New div for md and larger devices */}
                <div className="hidden md:block drawer-content lg:flex flex-col">

                    {dashboardItems}

                </div>
            </div>
            <div>
                <div className="content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
