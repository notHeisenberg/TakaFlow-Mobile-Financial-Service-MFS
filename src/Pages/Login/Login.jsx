import {
    Card,
    Input,
    Button,
    Typography,

} from "@material-tailwind/react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "@/Utilities/useAxiosSecure";


const Login = () => {


    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [pin, setPin] = useState("");

    const axiossecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userInfo = {
            emailOrPhone: emailOrPhone,
            pin: parseInt(pin),
        }
        console.log(userInfo)

        axiossecure.post('/login', userInfo)
            .then((response) => {
                console.log(response.data)
                if (response.data.status === "success") {
                    localStorage.setItem('access-token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('role', response.data.user.role)
                    if (response.data.user.role === 'admin') {
                        navigate('/dashboard/admin-profile')
                    } else if (response.data.user.role === 'agent') {
                        navigate('/dashboard/agent-profile')
                    } else {
                        navigate('/dashboard/user-profile')
                    }
                } else {
                    toast.error(response.data.message);
                }
            }
            ).catch((error) => {
                console.log(error)
                toast.error("An error occured, please try again later");
            })

        setEmailOrPhone("")
        setPin("")



    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <Link to={'/'} className="absolute z-10 mtop-2 right-2 top-2 md:right-[48%] p-4 btn btn-outline border-2 border-green-500 text-red-500 rounded-full">
                    <IoIosArrowBack></IoIosArrowBack>Go back
                </Link>
                <Card color="transparent" shadow={false} className="mx-auto w-96 p-10  bg-brown-400 border-2 border-red-200 text-blue-400 " >
                    <Typography variant="h4">
                        Login
                    </Typography>
                    <Typography color="blue" className="mt-1 font-normal">
                        Enter your details to login.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2  max-w-screen-lg w-full">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email / Phone Number
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Enter your email or phone number"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                required
                            />

                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                PIN
                            </Typography>

                            <div className="relative flex items-center">
                                <Input
                                    type="number"
                                    min={10000}
                                    max={99999}
                                    size="lg"
                                    placeholder="99999"
                                    className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    required
                                />

                            </div>

                        </div>

                        <Button type="submit" className="mt-6 btn btn-primary" fullWidth>
                            Login
                        </Button>

                        <Typography color="deep-orange" className="mt-4 text-center font-normal">
                            Don't  have an account?{" "}
                            <a href="/register" className="font-medium text-green-500 hover:text-blue-500">
                                Sign up
                            </a>
                        </Typography>
                    </form>
                    {/* <Link className="text-center btn bg-green-500 text-black" to={"/"}> Go Home</Link> */}
                </Card>
            </div>
            <ToastContainer />

        </>
    );
};

export default Login;