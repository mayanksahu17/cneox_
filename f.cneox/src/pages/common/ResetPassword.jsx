import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ResetPassword = () => {
  const handleNavigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
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

  const handleLoadingStatesChange = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  const handleChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    try {
      if (!formData.isOTPSent) {
        handleLoadingStatesChange("isOTPSentLoading", true);
        const res = await authService.sendForgotPasswordOTP({
          userId: formData.userId,
        });

        if (res.status === 200) {
          handleLoadingStatesChange("isOTPSentLoading", false);
          toast.success("OTP sent successfully, Please check your email");
          handleChange("isOTPSent", true);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        handleLoadingStatesChange("isForgotLoading", true);
        const res = await authService.resetForgotPassword({
          userId: formData.userId,
          password: formData.password,
          otp: formData.otp,
        });

        if (res.status === 200) {
          handleLoadingStatesChange("isForgotLoading", false);
          toast.success("Password changed successfully");
          handleNavigate("/login");
        }
      }
    } catch (error) {
      handleLoadingStatesChange("isOTPSentLoading", false);
      handleLoadingStatesChange("isForgotLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row h-full  bg-gray-900">
      <div className="mx-auto w-full md:w-1/2 text-center flex flex-col justify-center px-4 md:px-32 mt-4 md:mt-0">
        <div className=" text-center flex flex-row justify-center gap-6 mb-12 items-center ">
          <a href="/">
            {/* <img src="/assets/logo1.png" className="w-30 h-20" /> */}
            
              <img
              className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto"
              src="/assets/logo1.png"
              alt="Crown Bankers Logo"
            />
          </a>
          <a href="/">
            <div className="font-bold text-white text-4xl">Crown Bankers</div>
          </a>
        </div>
        <div className="block rounded-lg bg-gray-900 px-[30px] py-[50px] text-left sm:px-10">
          {/* Login Form */}
          {/* Form Group */}
          <div className="grid grid-cols-1 gap-6">
            {/* Form Single Input */}
            <div className="flex flex-col gap-y-[10px]">
              <label
                htmlFor="login-email"
                className="text-lg font-bold leading-[1.6] text-white"
              >
                User ID
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={(e) => handleChange("userId", e.target.value)}
                className="rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
              />
            </div>
            {formData.isOTPSent && (
              <div className="flex flex-col mb-4 w-full">
                <label
                  htmlFor="login-email"
                  className="text-lg font-bold leading-[1.6]"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={(e) => handleChange("otp", e.target.value)}
                  className="rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                />
              </div>
            )}

            {formData.isOTPSent && (
              <div className="flex flex-col mb-4 space-y-4 w-full">
                <label
                  htmlFor="signup-password"
                  className="text-lg font-bold leading-[1.6]"
                >
                  Password
                </label>
                <div className="flex flex-column justify-between rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="............"
                    className="outline-none"
                    required=""
                  />
                  <div
                    className="  flex items-center pr-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash color="#000" size={18} />
                    ) : (
                      <FaEye color="#000" size={18} />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-y-[10px]">
                  <label
                    htmlFor="signup-password"
                    className="text-lg font-bold leading-[1.6]"
                  >
                    Confirm Password
                  </label>
                  <div className="flex flex-column justify-between rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      placeholder="............"
                      className="outline-none"
                    />
                    <div
                      className="  flex items-center pr-2 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash color="#000" size={18} />
                      ) : (
                        <FaEye color="#000" size={18} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="button mt-7 block rounded-[50px] border-2 border-white bg-primary w-full text-2xl py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white"
          >
            {loadingStates.isSignInLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <CgSpinner className="animate-spin" size={20} />
              </span>
            )}
            {!formData.isOTPSent ? "Reset Password" : "Verify OTP"}
          </button>

          <div className="mt-10 text-center">
            Don't have an account? &nbsp;
            <Link
              to="/signup"
              className="text-base font-semibold hover:text-colorOrangyRed"
            >
              Sign Up here
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-1/2 h-[600px] md:h-screen ">
        {/* Background Image */}
        {/* <img
          src="/assets/LoginBg.png"
          className="w-full h-full"
          alt="Background"
        /> */}

        {/* Overlayed Login Image */}
        <img
          src="/assets/img/solar.jpg"
          className="absolute top-[6%] left-[10%] w-[80%] h-[88%]"
          alt="Login"
        />
      </div>
      {/* Section Container */}
    </div>
  );
};

export default ResetPassword;
