import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7295/api/Authen/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
        }),
      });

      if (response.ok) {
        setSuccessMsg("Password reset successful! You can now sign in.");
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">Reset your password</h1>
            <p className="text-base">Enter your email to reset your password.</p>
          </div>
        </div>
      </div>
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
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center" onSubmit={handleResetPassword}>
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Reset Password
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
                {/* New Password */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">New Password</p>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Confirm Password</p>
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300 mt-4"
                >
                  Reset Password
                </button>
                <p className="text-sm text-center font-titleFont font-medium mt-4">
                  Remembered your password?{" "}
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

export default ResetPassword;
