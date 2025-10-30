import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import countryList from "react-select-country-list";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { baseURL } from "../../constants/baseURL";
import authService from "../../services/authService";
import { Select } from "../../components";
import RoundButton from "../../components/navbar/RoundButton";

const SIGNIN_BG_PATH = "/assets_/images/auth/signinbg.png";

function Signup() {
  const [searchParams, setSearchParams] = useSearchParams({
    sponsorId: "",
    position: "left",
  });
  const paramSponsorId = searchParams.get("sponsorId");
  const paramPosition = searchParams.get("position");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hasSponsor: false,
    position: paramPosition || "left",
    sponsorId: paramSponsorId || "CROWN-",
    sponsorName: "",
    firstName: "",
    lastName: "",
    country: null,
    phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loadingStates, setLoadingStates] = useState({
    isSignUpLoading: false,
  });
  const options = useMemo(() => countryList().getData(), []);

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    validateInput(name, formData[name]);
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        error = value?.trim?.() === "" ? `${name} is required` : "";
        break;
      case "country":
        error = value ? "" : "Please select a country";
        break;
      case "phoneNumber":
        error = value?.trim?.() === "" ? "Phone number is required" : "";
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "confirmEmail":
        error = value === formData.email ? "" : "Emails do not match";
        break;
      case "password":
        error =
          value && value.length >= 3
            ? ""
            : "Password must be at least 3 characters";
        break;
      case "confirmPassword":
        error = value === formData.password ? "" : "Passwords do not match";
        break;
      case "acceptTerms":
        error = value ? "" : "You must accept the terms and conditions";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateInput(name, value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    validateInput(name, checked);
  };

  const handleRadioChangeHasSponsor = (value) =>
    setFormData((prev) => ({
      ...prev,
      hasSponsor: value,
      sponsorId: value ? prev.sponsorId : "",
      sponsorName: value ? prev.sponsorName : "",
    }));

  const handlePositionChange = (position) => {
    setFormData((prev) => ({ ...prev, position }));
    setSearchParams({ sponsorId: formData.sponsorId || "", position });
  };

  const changeLoadingStates = (name, value) =>
    setLoadingStates((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (formData.sponsorId && formData.sponsorId.length >= 6)
      fetchSponsorName(formData.sponsorId);
  }, [formData.sponsorId]);

  const fetchSponsorName = async (id) => {
    try {
      const { data } = await axios.get(baseURL + "/users/name/" + id);
      if (data?.success) {
        setFormData((prev) => ({ ...prev, sponsorName: data?.data?.name }));
      }
    } catch (error) {
      setFormData((prev) => ({ ...prev, sponsorName: "CROWN" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keysToValidate = [
      "firstName",
      "lastName",
      "country",
      "phoneNumber",
      "email",
      "confirmEmail",
      "password",
      "confirmPassword",
      "acceptTerms",
    ];
    keysToValidate.forEach((key) => {
      validateInput(key, formData[key]);
      setTouched((prev) => ({ ...prev, [key]: true }));
    });
    if (Object.values(errors).some((err) => err !== "")) return;
    try {
      changeLoadingStates("isSignUpLoading", true);
      const response = await authService.signUpUser({
        ...formData,
        referrer_id: formData.sponsorId
          ? `${formData.sponsorId}`
          : "CROWN-100012",
        phone: formData.phoneNumber,
        username: `${formData.firstName} ${formData.lastName}`,
        country: formData?.country?.label,
        state,
        city,
      });
      if (response?.data?.success) {
        toast.success("Welcome to CNEOX! Check your email for credentials.");
        navigate("/login");
      }
    } catch {
      toast.error("Error while registering. Please try again later.");
    } finally {
      changeLoadingStates("isSignUpLoading", false);
    }
  };

  const isButtonDisabled =
    Object.values(errors).some((error) => error !== "") ||
    !formData.acceptTerms ||
    loadingStates.isSignUpLoading;

  /* Animation Variants */
  const page = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.08 },
    },
  };
  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
  const field = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  };
  const social = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1 + i * 0.05 },
    }),
    hover: { scale: 1.15, rotate: 6 },
  };

  return (
    <motion.div
      className="min-h-screen relative bg-gray-900"
      variants={page}
      initial="hidden"
      animate="visible"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${SIGNIN_BG_PATH})` }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <motion.div
          className="w-full max-w-3xl mx-auto bg-gradient-to-b from-black to-[#020202] rounded-2xl shadow-2xl border border-[#0f0f0f] p-8"
          variants={card}
        >
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.img
              src="/assets/logo1.png"
              alt="CNEOX"
              className="mx-auto h-20"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-white text-center mb-2"
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Sign Up
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Create your CNEOX account below
          </motion.p>

          <form onSubmit={handleSubmit}>
            {/* Sponsor & Position */}
            <motion.div
              className="space-y-4 mb-6"
              variants={page}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center gap-4" variants={field}>
                <span className="text-gray-200 text-sm">Do you have a sponsor?</span>
                <label className="inline-flex items-center gap-2 text-gray-300 text-sm">
                  <input
                    type="radio"
                    name="hasSponsor"
                    checked={formData.hasSponsor === true}
                    onChange={() => handleRadioChangeHasSponsor(true)}
                    className="h-4 w-4 text-yellow-400"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-2 text-gray-300 text-sm">
                  <input
                    type="radio"
                    name="hasSponsor"
                    checked={formData.hasSponsor === false}
                    onChange={() => handleRadioChangeHasSponsor(false)}
                    className="h-4 w-4 text-yellow-400"
                  />
                  No
                </label>
              </motion.div>

              {formData.hasSponsor && (
                <AnimatePresence>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <div className="md:col-span-2">
                      <input
                        name="sponsorId"
                        type="text"
                        value={formData.sponsorId}
                        onChange={(e) => {
                          handleChange(e);
                          setSearchParams({
                            sponsorId: e.target.value || "",
                            position: formData.position,
                          });
                        }}
                        onBlur={() => handleBlur("sponsorId")}
                        placeholder="Sponsor ID (e.g., CROWN-123456)"
                        className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] placeholder:text-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {formData.sponsorName && (
                        <p className="text-xs text-gray-300 mt-1">
                          Sponsor: <span className="text-yellow-400">{formData.sponsorName}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center md:justify-end gap-4">
                      <label className="inline-flex items-center gap-2 text-gray-300 text-sm">
                        <input
                          type="radio"
                          name="position"
                          checked={formData.position === "left"}
                          onChange={() => handlePositionChange("left")}
                          className="h-4 w-4 text-yellow-400"
                        />
                        Left
                      </label>
                      <label className="inline-flex items-center gap-2 text-gray-300 text-sm">
                        <input
                          type="radio"
                          name="position"
                          checked={formData.position === "right"}
                          onChange={() => handlePositionChange("right")}
                          className="h-4 w-4 text-yellow-400"
                        />
                        Right
                      </label>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={page}
            >
              {[
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
                "password",
                "confirmPassword",
              ].map((fieldName, i) => (
                <motion.div
                  key={fieldName}
                  custom={i}
                  variants={field}
                  initial="hidden"
                  animate="visible"
                  whileFocus={{ scale: 1.02 }}
                >
                  <input
                    name={fieldName}
                    type={
                      fieldName.includes("password")
                        ? showPassword || showConfirmPassword
                          ? "text"
                          : "password"
                        : fieldName === "email"
                        ? "email"
                        : "text"
                    }
                    value={formData[fieldName]}
                    onChange={handleChange}
                    onBlur={() => handleBlur(fieldName)}
                    placeholder={
                      fieldName
                        .replace("confirm", "Confirm ")
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                    }
                    className="w-full rounded-lg px-4 py-3 bg-[#071022] border border-[#0b1726] placeholder:text-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {touched[fieldName] && errors[fieldName] && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors[fieldName]}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-2 mt-6"
              variants={field}
              initial="hidden"
              animate="visible"
            >
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-yellow-400 rounded"
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm text-gray-300 cursor-pointer"
              >
                I agree with the{" "}
                <Link
                  to="/TermsandCondition?tab=terms"
                  className="text-yellow-400 hover:underline"
                >
                  terms
                </Link>{" "}
                &{" "}
                <Link
                  to="/TermsandCondition?tab=privacy"
                  className="text-yellow-400 hover:underline"
                >
                  privacy
                </Link>
              </label>
            </motion.div>

            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <RoundButton
                  text={
                    loadingStates.isSignUpLoading ? (
                      <span className="flex items-center gap-2">
                        <CgSpinner className="animate-spin h-5 w-5" />
                        Creating...
                      </span>
                    ) : (
                      "Sign Up"
                    )
                  }
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-40 mx-auto block py-2 rounded-md ${
                    isButtonDisabled
                      ? "bg-yellow-300 text-black"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 mb-4">or sign in with others</p>
              <div className="flex justify-center gap-3 mb-4">
                {["G", "Fb", "In", "Tw"].map((s, i) => (
                  <motion.button
                    key={i}
                    variants={social}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="h-10 w-10 rounded-full bg-gray-200/30 text-yellow-400 flex items-center justify-center text-sm"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-yellow-400 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Signup;
