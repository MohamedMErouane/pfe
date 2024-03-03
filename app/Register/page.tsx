"use client"
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdSchool } from 'react-icons/io';

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
          // Handle error response
        } else {
          // Handle generic error
        }
      });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex h-screen">
      {/* First Side - Logo, Name, Video Background */}
     

      {/* Second Side - Signup Form */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-4 font-poppins font-semibold text-center text-black">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md py-3 font-semibold transition duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p><a href="#" className="font-medium text-black hover:underline">Forget password?</a></p>
          </div>
          <div className="my-4 flex items-center border-t border-gray-300">
            <p className="mx-4 text-center flex-1">OR</p>
          </div>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 font-semibold transition duration-300 hover:bg-gray-100">
            <img className="w-6 h-6 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google Logo" />
            <span className="text-black">Sign Up with Google</span>
          </button>
        </div>
      </div>


      <div className="flex-1 relative">
        {/* Video background */}
        <video autoPlay muted loop className="object-cover object-center w-full h-full absolute inset-0 z-0">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          {/* Logo and Name */}
          <div className="text-white text-center mb-8">
            <IoMdSchool size={80} />
            <h1 className="text-4xl font-poppins font-semibold"><strong>Study With Me</strong> </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
