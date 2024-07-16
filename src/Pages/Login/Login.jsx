import {
    Card,
    Input,
    Button,
    Typography,

} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
// import { updateProfile } from "firebase/auth";
// import { AuthContext } from "@/components/Provider/AuthProvider";
// import axiosPublic from "@/utilities/useAxiosPublic";


import Swal from "sweetalert2";


const Login = () => {


    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [pin, setPin] = useState(null);


    // const { signUp } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userInfo = {
            emailOrPhone: emailOrPhone,
            pin: parseInt(pin),
        }
        console.log(userInfo)

        // signUp(email, password)
        //     .then((result) => {

        //         const userInfo = {
        //             email: result.user.email,
        //             userName: name,
        //             photoURL: photoURL,
        //             role: selectedRole,
        //             createdAt: result.user.metadata.createdAt,
        //             lastLoginAt: result.user.metadata.lastLoginAt
        //         }
        //         // console.log(userInfo)
        //         axiosPublic.post('/users', userInfo)
        //             .then(res => {
        //                 console.log(res.data);
        //                 if (res.data.insertedId) {
        //                     Swal.fire({
        //                         position: 'top',
        //                         icon: 'success',
        //                         title: 'User created successfully.',
        //                         showConfirmButton: false,
        //                         timer: 1500
        //                     });
        //                 }
        //             })

        //         toast.success(
        //             <>
        //                 Account created succesfully
        //                 <Link to="/login" className="btn btn-sm bg-slate-200 text-center font-medium text-green-500 hover:text-blue-500">
        //                     <button className="">Log In
        //                     </button>
        //                 </Link>
        //             </>
        //         )
        //         updateProfile(result.user,
        //             {
        //                 displayName: name,
        //                 photoURL: photoURL
        //             })
        //         // sendEmailVerification(result.user)
        //         // .then(toast.success("Verification email sent"))
        //     })

        //     .catch(error => {
        //         if (error.code === "auth/email-already-in-use") {
        //             toast.error("Email already in use")
        //         }
        //         else if (error.code === "auth/invalid-email") {
        //             toast.error("Invalid email. Please provide a valid email")
        //         }
        //     }
        //     )

        toast.success('Registration successful! Please wait for admin approval.');

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