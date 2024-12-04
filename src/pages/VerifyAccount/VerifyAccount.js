import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      setError("Both email and OTP are required.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7295/api/Authen/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setSuccessMsg("Account verified successfully! Redirecting to sign in...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Verification failed. Please try again.");
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
            <h1 className="font-titleFont text-xl font-medium">Verify your account</h1>
            <p className="text-base">Enter the email and OTP sent to your email address.</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Fast and secure verification
              </span>
              <br />
              Complete your account setup in seconds.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © OREBI
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
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
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center" onSubmit={handleVerify}>
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Verify your account
              </h1>
              {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}
              <div className="flex flex-col gap-3">
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
                {/* OTP */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Enter OTP</p>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primeColor hover:bg-black hover:text-white w-full text-gray-200 text-base font-medium h-10 rounded-md mt-4 duration-300"
                >
                  Verify Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium mt-4">
                  Didn't receive the OTP?{" "}
                  <span className="hover:text-blue-600 duration-300 cursor-pointer">
                    Resend OTP
                  </span>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
