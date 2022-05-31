import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Register = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password == cpassword) {
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST1}/api/auth/local/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({first_name, last_name, email, username, password})
            });
            let data = await res.json();

            if (data.user) {
                toast.success('Your Account has been created Please login Now', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(()=>{
                    router.push('/login');
                }, 3000)
            }
            else if (data.error) {
                toast.error(data.error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(()=>{
                    router.push('/register');
                }, 3000)
            }
        }
        else {
            toast.error("Passwords does not match", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <div className="flex justify-center">
                    <img src="/logo.png" alt="logo" width={'42px'} className="mb-3" />
                </div>
                <h3 className="text-2xl font-bold text-center">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="Name">
                                Fist Name
                                <label>
                                    <input
                                        onChange={(e) => { setFirstName(e.currentTarget.value) }}
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        id='first_name'
                                    />
                                </label>
                            </label>
                        </div>

                        <div>
                            <label className="block mt-3" htmlFor="Name">
                                Last Name
                                <label>
                                    <input
                                        onChange={(e) => { setLastName(e.currentTarget.value) }}
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        id='last_name'
                                    />
                                </label>
                            </label>
                        </div>
                        <div className="mt-4">
                            <label className="block" htmlFor="email">
                                Email
                                <label>
                                    <input
                                        onChange={(e) => { setEmail(e.currentTarget.value) }}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        id='email'
                                    />
                                </label>
                            </label>
                        </div>

                        <div className="mt-4">
                            <label className="block" htmlFor="email">
                                Username
                                <label>
                                    <input
                                        onChange={(e) => { setUsername(e.currentTarget.value) }}
                                        type="text"
                                        placeholder="Username"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        id='username'
                                    />
                                </label>
                            </label>
                        </div>
                        <div className="mt-4">
                            <label className="block">
                                Password
                                <label>
                                    <input
                                        onChange={(e) => { setPassword(e.currentTarget.value) }}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        id='password'
                                    />
                                </label>
                            </label>
                        </div>
                        <div className="mt-4">
                            <label className="block">
                                Confirm Password
                                <label>
                                    <input
                                        onChange={(e) => { setCPassword(e.currentTarget.value) }}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        id='cpassword'
                                    />
                                </label>
                            </label>
                        </div>

                        <div className="flex">
                            <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                Create Account
                            </button>
                        </div>
                        <div className="mt-6 text-grey-dark">
                            Already have an account?
                            <Link href="/login">
                                <a className="text-blue-600 hover:underline">
                                    &nbsp;Log in
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register
