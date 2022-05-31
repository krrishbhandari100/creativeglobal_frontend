import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST1}/api/auth/local`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: document.getElementById('email').value,
        password: document.getElementById('password').value,
      })
    });
    let data = await res.json();
    if (data.user) {
      localStorage.setItem('token', data.jwt);
      router.push('/');
    }
    else {
      toast.error("Invalid Username or Password", {
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
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Name">
                Email
                <label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id='email'
                  />
                </label>
              </label>
            </div>

            <div className="mt-4">
              <label className="block">
                Password
                <label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id='password'
                  />
                </label>
              </label>
            </div>

            <div className="flex">
              <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Don't have account?
              <Link href="/register">
                <a className="text-blue-600 hover:underline">
                  &nbsp;Register
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login
