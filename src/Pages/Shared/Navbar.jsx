import logout from "@/Hooks/Logout";
import { Link } from "react-router-dom";


const Navbar = () => {
    const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : "";
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return (
        <div className="navbar bg-gray-300 border-b shadow-lg">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl text-red-500">EasyTaka</Link>
            </div>
            <div className="flex-none">
                {user &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-20 rounded-full border-2 border-blue-400 p-0.5 hover:p-1">
                                <img
                                    className="rounded-full w-full h-full"
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={`/dashboard/${userType}-profile`} className="justify-between">
                                    Dashboard
                                    <span className="badge badge-neutral">{userType}</span>
                                </Link>
                            </li>
                            <li><Link onClick={() => logout()}>Logout</Link></li>
                        </ul>
                    </div>
                }
                {!user &&
                    <div className="flex gap-2 ">

                        <Link to="/login" className="flex w-full bg-white hover:bg-blue-300 shadow rounded-lg py-4 px-10 items-center justify-between">
                            <p className="text-xl font-semibold leading-7 text-center text-gray-800">Login</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>

                        <Link to="/register"
                            class="flex text-gray-100 justify-center transition duration-200 ease-in-out transform px-8 py-3 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px"
                            style={{ boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)" }}>
                            <span className="font-bold">Register</span>
                        </Link>
                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;