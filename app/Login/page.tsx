"use client"
// pages/login.js
import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3003/auth/login', { email, password });
            const { token } = response.data;
            console.log(response.data); // Log the response data


            // Store token in local storage
            localStorage.setItem('token', token);

            // Redirect to Video page
            window.location.href = '/Video';
        } catch (err) {
            console.error(err);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="bg-gradient-to-b from-red-950 to-transparent h-screen relative">
            <main className="absolute inset-0 flex items-center justify-center text-white text-center">
                <div>
                    <h1 className="text-4xl mb-4 font-poppins font-semibold">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-b border-white p-2 focus:outline-none bg-transparent text-white font-poppins text-base"
                            />
                        </div>
                        <br />
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-b border-white p-2 focus:outline-none bg-transparent text-white font-poppins text-base"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Forget password? <a href="#" className="font-medium text-white hover:underline">Click here</a>.
                            </p>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="bg-black relative inline-flex w-48 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-base font-medium text-white rounded-lg group"
                        >
                            <span className="relative px-5 py-2.5 w-48 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-gradient-to-br group-hover:from-red-950 group-hover:via-red-800">
                                Login
                            </span>
                        </button>
                    </form>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                            OR
                        </p>
                    </div>
                    <button className="px-5 py-2 inline-flex items-center justify-center  border  gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                        <span>Login with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
