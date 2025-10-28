// src/pages/auth/ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../../services/authService";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// background path (same as sign-in and sign-up)
const SIGNIN_BG_PATH = "/assets_/images/auth/signinbg.png";

const ResetPassword = () => {
  const handleNavigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    userId: "CROWN-",
    isOTPSent: false,
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loadingStates, setLoadingStates] = useState({
    isOTPSentLoading: false,
    isForgotLoading: false,
  });

  const handleChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const changeLoadingStates = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  const togglePasswordVisibility = () => setShowPassword((p) => !p);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((p) => !p);

  const handleSubmit = async () => {
    try {
      if (!formData.isOTPSent) {
        changeLoadingStates("isOTPSentLoading", true);
        const res = await authService.sendForgotPasswordOTP({
          userId: formData.userId,
        });
        if (res.status === 200) {
          toast.success("OTP sent successfully, please check your email");
          changeLoadingStates("isOTPSentLoading", false);
          handleChange("isOTPSent", true);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        changeLoadingStates("isForgotLoading", true);
        const res = await authService.resetForgotPassword({
          userId: formData.userId,
          password: formData.password,
          otp: formData.otp,
        });

        if (res.status === 200) {
          toast.success("Password changed successfully");
          handleNavigate("/login");
        }
      }
    } catch (error) {
      changeLoadingStates("isOTPSentLoading", false);
      changeLoadingStates("isForgotLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${SIGNIN_BG_PATH})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-gradient-to-b from-black to-[#020202] rounded-2xl shadow-2xl border border-[#0f0f0f] p-8">
          {/* Logo */}
          <div className="text-center mb-5">
            <img
              src="/assets/logo1.png"
              alt="CNEOX Logo"
              className="mx-auto h-20"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-2">
            Reset Password
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Enter your user ID to receive an OTP, then set your new password.
          </p>

          <div className="space-y-4">
            {/* User ID */}
            <div>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={(e) => handleChange("userId", e.target.value)}
                placeholder="User ID"
                className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* OTP field */}
            {formData.isOTPSent && (
              <div>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={(e) => handleChange("otp", e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

            {/* Password fields */}
            {formData.isOTPSent && (
              <>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="New Password"
                    className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm Password"
                    className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 transition-all duration-200 flex justify-center items-center"
          >
            {(loadingStates.isOTPSentLoading || loadingStates.isForgotLoading) && (
              <CgSpinner className="animate-spin mr-2" size={20} />
            )}
            {!formData.isOTPSent ? "Send OTP" : "Reset Password"}
          </button>

          <div className="text-center mt-6 text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-400 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>

          <div className="text-center mt-2 text-gray-300">
            <Link
              to="/login"
              className="text-sm text-yellow-400 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
