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
import { Link } from "react-router-dom";
import { SelectDemo } from "@/Components/Select/SelectDemo";

import Swal from "sweetalert2";
import axiosPublic from "@/Utilities/useAxiosPublic";



const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [selectedRole, setSelectedRole] = useState('user');
    const [pin, setPin] = useState('')


    // const { signUp } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.warning("Invalid email address");
            return;
        }

        // Validate phone number starts with 01
        if (!/^01/.test(phoneNum)) {
            toast.warning("Phone number must start with 01");
            return;
        }

        // Validate the next digit is between 3 and 9
        if (!/^01[3-9]/.test(phoneNum)) {
            toast.warning("Phone number must have a valid operator code (01[3-9])");
            return;
        }

        // Validate overall phone number length (exactly 11 digits)
        if (!/^\d{11}$/.test(phoneNum)) {
            toast.warning("Phone number must be exactly 11 digits long");
            return;
        }


        // Validate name (only letters and spaces allowed, minimum 2 characters)
        if (!/^[a-zA-Z\s]{2,}$/.test(name)) {
            toast.warning("Invalid name. Only letters and spaces are allowed, with a minimum of 2 characters.");
            return;
        }

        const userInfo = {
            email: email,
            userName: name,
            phoneNum: phoneNum,
            role: selectedRole,
            pin: pin,
            photoUrl: "https://gravatar.com/avatar/646c21006665037c64d3af52c254fc3f?s=400&d=robohash&r=x",
            createdAt: new Date().toUTCString(),
            approvedBy: "",
        }
        // console.log(userInfo)

        axiosPublic.post('/register', userInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'User created successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                toast.success(
                    <>
                        Registration successful! Please wait for admin approval.
                        <Link to="/login" className="btn btn-sm bg-slate-200 text-center font-medium text-green-500 hover:text-blue-500">
                            <button className="">Log In
                            </button>
                        </Link>
                    </>
                );
            }
            ).catch(error => {
                console.log(error)
                if (error.response.status === 400) {
                    toast.error(error.response.data.message)
                }
                else if (error.response.status === 500) {
                    toast.error(error.response.data.message)
                }
            })


        setName("")
        setEmail("")
        setPin("")
        setPhoneNum("")
        setSelectedRole("user")


    };


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <Link to={'/'} className="absolute z-10 mtop-2 right-2 top-2 md:right-[48%] p-4 btn btn-outline border-2 border-green-500 text-red-500 rounded-full">
                    <IoIosArrowBack></IoIosArrowBack>Go back
                </Link>
                <Card color="transparent" shadow={false} className="mx-auto w-96 p-10  bg-brown-400 border-2 border-red-200 text-blue-400 " >
                    <Typography variant="h4">
                        Sign Up
                    </Typography>
                    <Typography color="blue" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2  max-w-screen-lg w-full">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Your name"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 w-full focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Phone Number
                            </Typography>
                            <Input
                                type="tel"
                                size="lg"
                                placeholder="Enter your 11 digit phone number"
                                className=" !border-t-blue-gray-200 rounded-xl p-2 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none rounder after:content-none",
                                }}
                                value={phoneNum}
                                onChange={(e) => setPhoneNum(e.target.value)}
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
                            <SelectDemo
                                setSelectedRole={setSelectedRole}
                                required
                            ></SelectDemo>
                        </div>

                        <Button type="submit" className="mt-6 btn btn-primary" fullWidth>
                            sign up
                        </Button>

                        <Typography color="deep-orange" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <a href="/login" className="font-medium text-green-500 hover:text-blue-500">
                                Log In
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

export default SignUp;