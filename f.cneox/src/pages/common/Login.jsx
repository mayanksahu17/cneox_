import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../components";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { CgSpinner } from "react-icons/cg";
import RoundButton from "../../components/navbar/RoundButton";

const Login = () => {
  const handleNavigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    userId: "CROWN-",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    userId: "",
    password: "",
  });

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateInput(name, formData[name]);
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "userId":
        error = value.trim() === "" ? `User ID is required` : "";
        break;
      case "password":
        error = value ? "" : "Password is required";
        break;
      case "otp":
        error = value ? "" : "OTP is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const [loadingStates, setLoadingStates] = useState({
    isSignInLoading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      validateInput(name, value);
    }
  };

  const changeLoadingStates = (name, value) => {
    setLoadingStates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      changeLoadingStates("isSignInLoading", true);
      const response = await authService.loginUser({
        userId: `${formData.userId}`,
        password: formData.password,
      });
      
      if (response?.data?.success) {
        changeLoadingStates("isSignInLoading", false);
        updateUser({
          user: response?.data?.data,
          token: response?.data?.token,
        });
        handleNavigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      changeLoadingStates("isSignInLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const validationFilteredStates = showOTPInput
    ? Object.keys(formData)
    : Object.keys({ userId: formData.userId, password: formData.password });

  const isButtonDisabled = useMemo(
    () =>
      Object.values(errors).some((error) => error !== "") ||
      validationFilteredStates.filter((el) => formData[el] === "")?.length > 0,
    [errors, formData]
  );

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-grow flex py-4">
        {/* Left Column - Form */}
        <div
          className="w-full items-center justify-center md:w-1/2 flex flex-col p-8 md:p-16"
        >
          <div className="mb-8 ml-2">
            <div className="flex items-center">
                <img
              className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto"
              src="/assets/logo1.png"
              alt="Crown Bankers Logo"
            />

              {/* <span className="ml-2 text-2xl font-bold text-white">BankCo</span> */}
            </div>
          </div>

          <div className="flex-grow flex flex-col px-4 rounded-md justify-center max-w-md border border-green-800 animate-">
            <div className="p-4 rounded-t-md">
              <h2 className="text-3xl font-bold text-white">
                Sign in to Crown Bankers.
              </h2>
            </div>

            <div className="bg-gray-900 py-8">
              <div className="flex items-center justify-center mb-6">
                {/* <div className="flex-grow border-t border-gray-700"></div> */}
                {/* <div className="flex-grow border-t border-gray-700"></div> */}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <input
                      name="userId"
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400"
                      placeholder="Username or email"
                      value={formData.userId}
                      onChange={handleChange}
                      onBlur={() => handleBlur("userId")}
                    />
                    {errors.userId && touched.userId && (
                      <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
                    )}
                  </div>

                  {!showOTPInput && (
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur("password")}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        <svg
                          xmlns=""
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                          {!showPassword && <line x1="4" y1="20" x2="20" y2="4"></line>}
                        </svg>
                      </button>
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>
                  )}

                  {showOTPInput && (
                    <div>
                      <input
                        name="otp"
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={handleChange}
                      />
                      {errors.otp && (
                        <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-green-500 focus:ring-green-500"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 text-sm text-white"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/reset-password"
                      className="text-sm font-medium text-green-500 hover:text-green-400"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <RoundButton
                    text={loadingStates.isSignInLoading ? (
                      <span className="flex items-center justify-center">
                        <CgSpinner className="animate-spin mr-2" size={18} />
                        {!showOTPInput ? "Signing in..." : "Verifying..."}
                      </span>
                    ) : !showOTPInput ? "Sign in" : "Verify OTP"}
                    type="submit"
                    className="w-full py-3 text-sm"
                    disabled={isButtonDisabled || loadingStates.isSignInLoading}
                  />
                  
                  <p className="mt-1 flex items-center text-base text-gray-300">
                    Create account? {/* Or{" "} */}
                    <Link
                      to="/signup"
                      className="font-medium text-[#4CAF50] hover:text-[#3d9140] ml-1"
                    >
                      sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:flex md:w-1/2 bg-white">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/assets/img/solar.jpg"
              alt="Secure Banking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;