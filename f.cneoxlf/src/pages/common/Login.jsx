// src/pages/auth/Login.jsx
import React, { useState, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import RoundButton from "../../components/navbar/RoundButton";
import { useAuth } from "../../hooks/useAuth";
import authService from "../../services/authService";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Public path for the background image
const SIGNIN_BG_PATH = "/assets_/images/auth/signinbg.png";

const Login = () => {
  const handleNavigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userId: "CROWN-",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    otp: "",
  });

  const [touched, setTouched] = useState({
    userId: false,
    password: false,
    otp: false,
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

  const changeLoadingStates = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (touched[name]) validateInput(name, value);
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
      console.error(error);
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
    [errors, formData, validationFilteredStates]
  );

  if (user) return <Navigate to="/dashboard" />;

  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  /* ----------------- Framer Motion Variants ----------------- */
  const page = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.06 } },
  };

  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const field = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  };

  const socialBtn = {
    hidden: { opacity: 0, y: 6, scale: 0.95 },
    visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.15 + i * 0.04 } }),
    hover: { scale: 1.12, rotate: 6 },
  };

  const cta = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.12 } },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div className="min-h-screen relative bg-gray-900" variants={page} initial="hidden" animate="visible">
      {/* Background image (coins) */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${SIGNIN_BG_PATH})`,
        }}
        aria-hidden="true"
      />
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content container - centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        {/* Centered card */}
        <motion.div
          className="w-full max-w-xl"
          variants={card}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-gradient-to-b from-black to-[#020202] rounded-2xl shadow-2xl border border-[#0f0f0f] p-8 mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <motion.div className="text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
              <motion.img
                src="/assets/logo1.png"
                alt="CNEOX"
                className="mx-auto h-20"
                whileHover={{ scale: 1.03 }}
              />
            </motion.div>

            <motion.h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-2" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              Sign In
            </motion.h2>
            <motion.p className="text-gray-300 text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.06 }}>
              Sign in your account
            </motion.p>

            <form onSubmit={handleSubmit}>
              <motion.div className="space-y-4">
                {/* Email / UserId */}
                <motion.div custom={0} variants={field} initial="hidden" animate="visible">
                  <motion.input
                    name="userId"
                    type="text"
                    value={formData.userId}
                    onChange={handleChange}
                    onBlur={() => handleBlur("userId")}
                    placeholder="Email"
                    className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] placeholder:text-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.userId && touched.userId && (
                    <motion.p className="text-red-400 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {errors.userId}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password */}
                {!showOTPInput && (
                  <motion.div className="relative" custom={1} variants={field} initial="hidden" animate="visible">
                    <motion.input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur("password")}
                      placeholder="Password"
                      className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] placeholder:text-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      whileFocus={{ scale: 1.01 }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      aria-label="toggle password"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && touched.password && (
                      <motion.p className="text-red-400 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {errors.password}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* OTP input (if used) */}
                <AnimatePresence>
                  {showOTPInput && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.35 }}
                    >
                      <motion.input
                        name="otp"
                        type="text"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] placeholder:text-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        whileFocus={{ scale: 1.01 }}
                      />
                      {errors.otp && <motion.p className="text-red-400 text-sm mt-1">{errors.otp}</motion.p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div className="flex items-center justify-between" custom={2} variants={field} initial="hidden" animate="visible">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-700 bg-[#071022] text-yellow-400"
                    />
                    <span className="text-sm text-gray-300">Remember Me?</span>
                  </label>

                  <Link to="/reset-password" className="text-sm text-yellow-400 hover:underline">
                    Forgot Password?
                  </Link>
                </motion.div>

                {/* CTA button */}
                <motion.div custom={3} variants={field} initial="hidden" animate="visible">
                  <motion.div variants={cta} initial="hidden" animate="visible">
                    <RoundButton
                      type="submit"
                      disabled={isButtonDisabled || loadingStates.isSignInLoading}
                      className="w-full py-3 text-sm rounded-lg"
                      text={
                        loadingStates.isSignInLoading ? (
                          <span className="flex items-center justify-center">
                            <CgSpinner className="animate-spin mr-2" size={18} />
                            {!showOTPInput ? "Signing in..." : "Verifying..."}
                          </span>
                        ) : !showOTPInput ? (
                          <span className="font-semibold text-black">Sign In</span>
                        ) : (
                          "Verify OTP"
                        )
                      }
                    />
                  </motion.div>
                </motion.div>

                {/* Or sign in with others */}
                <motion.div className="text-center mt-2" custom={4} variants={field} initial="hidden" animate="visible">
                  <motion.p className="text-gray-400 mb-4">or sign in with others account?</motion.p>

                  <motion.div className="flex justify-center gap-3 mb-3">
                    {["G", "Fb", "In", "Tw"].map((s, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        variants={socialBtn}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="h-10 w-10 rounded-full bg-gray-200/8 text-yellow-400 flex items-center justify-center text-sm shadow-sm"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.p className="text-gray-300">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-yellow-400 font-medium hover:underline">
                      Click here to sign up
                    </Link>
                  </motion.p>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
