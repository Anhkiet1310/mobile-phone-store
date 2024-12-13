import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [checked, setChecked] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // ============= API Call =============
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!checked) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (!userName || !fullName || !address || !phoneNumber || !email || !passwordHash) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7295/api/Authen/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          fullName,
          address,
          phoneNumber,
          email,
          passwordHash,
        }),
      });

      if (response.ok) {
        setSuccessMsg("Registration successful! Redirecting to verify your account...");
        setTimeout(() => {
          navigate("/verify-account", { state: { email } });
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      {/* Left Section */}
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">Get started for free</h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with FPT
              </span>
              <br />
              Join our platform in just a few steps.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © All rights reserved. Powered by FPT University.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center" onSubmit={handleSignUp}>
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              {error && (
                <p className="text-red-500 mb-4 font-medium">{error}</p>
              )}
              <div className="flex flex-col gap-3">
                {/* Username */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Username</p>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter your username"
                  />
                </div>
                {/* Full Name */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Full Name</p>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Email</p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Phone Number</p>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
                {/* Address */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Address</p>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter your address"
                  />
                </div>
                {/* Password */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Password</p>
                  <input
                    onChange={(e) => setPasswordHash(e.target.value)}
                    value={passwordHash}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                {/* Checkbox */}
                <div className="flex items-start gap-2 mt-4">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the OREBI{" "}
                    <span className="text-blue-500">Terms of Service </span>
                    and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 cursor-not-allowed"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md mt-4 duration-300`}
                  disabled={!checked}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium mt-4">
                  Already have an account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
