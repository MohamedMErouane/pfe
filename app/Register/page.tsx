'use client';
import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Reset 
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Password validation
    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must be at least 8 characters long and contain special characters");
      return;
    }

    axios({
      method: "post",
      baseURL: "http://localhost:3003",
      url: "/register",
      data: {
        username,
        email,
        password,
      },
    })
      .then((result) => {
        console.log(result);
        router.push("../login");
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.error || err.message);
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="bg-gradient-to-b from-red-950 to-transparent h-screen relative">
      <main className="absolute inset-0 flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl mb-4 font-poppins font-semibold"> Sign up </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-b border-white p-2 focus:outline-none bg-transparent text-white font-poppins text-base"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "transparent" }} // Ensure transparent background
                className={`border-b border-${emailError ? 'red' : 'white'} p-2 focus:outline-none bg-transparent text-white font-poppins text-base`}
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: "transparent" }} // Ensure transparent background
                className={`border-b border-${passwordError ? 'red' : 'white'} p-2 focus:outline-none bg-transparent text-white font-poppins text-base`}
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="bg-black relative inline-flex w-48 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-base font-medium text-white rounded-lg group"
            >
              <span className="relative px-5 py-2.5 w-48 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-gradient-to-br group-hover:from-red-950 group-hover:via-red-800">
                SIGN UP
              </span>
            </button>
          </form>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
          </div>

          <button className="px-5 py-2 inline-flex items-center justify-center border gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>SIGN UP with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
