import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import countryList from "react-select-country-list";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { baseURL } from "../../constants/baseURL";
import authService from "../../services/authService";
import { Select } from "../../components";
import RoundButton from "../../components/navbar/RoundButton";

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
  
  const [formData, setFormData] = useState({
    hasSponsor: false,
    position: "left",
    sponsorId: "CROWN-",
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
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
  });
  
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    country: false,
    phoneNumber: false,
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false,
  });
  
  const [loadingStates, setLoadingStates] = useState({
    isSignUpLoading: false,
  });
  
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };
  
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateInput(name, formData[name]);
  };
  
  const validateInput = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstName":
      case "lastName":
        error = value.trim() === "" ? `${name} is required` : "";
        break;
      case "country":
        error = value ? "" : "Please select a country";
        break;
      case "phoneNumber":
        error = value.trim() === "" ? "Phone number is required" : "";
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address";
        break;
      case "confirmEmail":
        error = value === formData.email ? "" : "Emails do not match";
        break;
      case "password":
        error = value.length >= 3 ? "" : "Password must be at least 3 characters";
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
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateInput(name, value);
    }
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    validateInput(name, checked);
  };
  
  const handleRadioChange = (e) => {
    const { name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  
  const changeLoadingStates = (name, value) => {
    setLoadingStates(prev => ({ ...prev, [name]: value }));
  };
  
  useEffect(() => {
    if (formData.sponsorId.length === 12) {
      fetchSponsorName(formData.sponsorId);
    }
  }, [formData.sponsorId]);
  
  useEffect(() => {
    if (paramSponsorId) {
      setFormData(prev => ({
        ...prev,
        sponsorId: paramSponsorId,
        hasSponsor: true,
      }));
    }
    
    if (paramPosition) {
      setFormData(prev => ({ 
        ...prev, 
        position: paramPosition 
      }));
    }
  }, [paramPosition, paramSponsorId]);
  
  const fetchSponsorName = async (id) => {
    try {
      const { data } = await axios.get(baseURL + "/users/name/" + id);
      if (data?.success) {
        setFormData(prev => ({ ...prev, sponsorName: data?.data?.name }));
      }
    } catch (error) {
      setFormData(prev => ({ ...prev, sponsorName: "CROWN" }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    Object.keys(formData).forEach(key => {
      validateInput(key, formData[key]);
      setTouched(prev => ({ ...prev, [key]: true }));
    });
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error !== "")) {
      return;
    }
    
    try {
      changeLoadingStates("isSignUpLoading", true);
      const response = await authService.signUpUser({
        ...formData,
        referrer_id: formData.sponsorId ? `${formData.sponsorId}` : "CROWN-100012",
        phone: formData.phoneNumber,
        username: `${formData.firstName} ${formData.lastName}`,
        country: formData?.country?.label,
        state: state,
        city: city,
      });
      
      if (response?.data?.success) {
        setFormData({
          hasSponsor: false,
          position: "left",
          sponsorId: "CROWN-",
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
        toast.success("Welcome to Crown Bankers! Check your email for credentials.");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while registering with us. Please try again later.");
    } finally {
      changeLoadingStates("isSignUpLoading", false);
    }
  };
  
  const validationFilteredStates = Object.keys(formData).filter(
    el => el !== "hasSponsor" && el !== "sponsorId" && el !== "sponsorName"
  );
  
  const isButtonDisabled = Object.values(errors).some(error => error !== "") ||
    validationFilteredStates.some(key => !formData[key]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex-grow flex bg-gray-900">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:mx-24">
          <div className="mt-1">
            <img
              className="h-24 w-auto"
              src="/assets/logo1.png"
              alt="Crown Bankers Logo"
            />
          </div>
          
          <div className="w-full max-w-lg px-6">
            <form
              className="space-y-1 border border-green-400 px-4 py-2 rounded-md"
              onSubmit={handleSubmit}
            >
              <h2 className="text-4xl font-bold text-white">Create a new account</h2>
              
              <div className="mt-2 rounded-md shadow-sm space-y-2">
                {/* Sponsor Section */}
                <div className="flex items-center">
                  <p className="text-white text-sm mr-2">Do you have a sponsor?</p>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="hasSponsor"
                        checked={formData.hasSponsor}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-green-500 focus:ring-green-500"
                      />
                      <span className="ml-2 text-white text-xs">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="hasSponsor"
                        checked={!formData.hasSponsor}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-green-500 focus:ring-green-500" 
                      />
                      <span className="ml-2 text-white text-xs">No</span>
                    </label>
                  </div>
                </div>
                
                {formData.hasSponsor && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="sponsorId"
                      type="text"
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="Sponsor ID"
                      value={formData.sponsorId}
                      onChange={handleChange}
                    />
                    <input
                      name="sponsorName"
                      type="text"
                      readOnly
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="Sponsor Name"
                      value={formData.sponsorName}
                    />
                  </div>
                )}
                
                {/* Position selection */}
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm mr-2">Position:</p>
                  <div className="flex items-center space-x-8">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="position"
                        value="left"
                        checked={paramPosition === "left"}
                        onChange={() =>
                          setSearchParams({
                            sponsorId: paramSponsorId || "",
                            position: "left"
                          })
                        }
                        className="h-4 w-4 text-green-500 focus:ring-green-500"
                      />
                      <span className="ml-2 text-white text-xs">Left</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="position"
                        value="right"
                        checked={paramPosition === "right"}
                        onChange={() =>
                          setSearchParams({
                            sponsorId: paramSponsorId || "",
                            position: "right"
                          })
                        }
                        className="h-4 w-4 text-green-500 focus:ring-green-500"
                      />
                      <span className="ml-2 text-white text-xs">Right</span>
                    </label>
                  </div>
                </div>

                
                {/* Name inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      name="firstName"
                      type="text"
                      required
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("firstName")}
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      name="lastName"
                      type="text"
                      required
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("lastName")}
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                {/* Phone and Country */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      name="phoneNumber"
                      type="tel"
                      required
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="Phone"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phoneNumber")}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <Select
                      options={options}
                      value={formData.country}
                      onChange={(value) => {
                        setFormData(prev => ({ ...prev, country: value }));
                        if (touched.country) {
                          validateInput("country", value);
                        }
                      }}
                      onBlur={() => handleBlur("country")}
                      placeHolder="Select Country"
                      customStyles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#1f2937",
                          border: "1px solid #6b7280",
                          borderRadius: "4px",
                          padding: "1px",
                          color: "white",
                          height: "42px"
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#f9fafb"
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#f9fafb"
                        }),
                        option: (provided) => ({
                          ...provided,
                          backgroundColor: "#1f2937",
                          color: "#f9fafb"
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#1f2937"
                        })
                      }}
                    />
                    {touched.country && errors.country && (
                      <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
                
                {/* State and City for Nigeria */}
                {formData.country?.value === "NG" && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="state"
                      type="text"
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <input
                      name="city"
                      type="text"
                      className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                )}
                
                {/* Email fields */}
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    name="confirmEmail"
                    type="email"
                    required
                    className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm"
                    placeholder="Confirm Email"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmEmail")}
                  />
                  {touched.confirmEmail && errors.confirmEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmEmail}</p>
                  )}
                </div>
                
                {/* Password fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm pr-10"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur("password")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="appearance-none bg-gray-800 block w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] sm:text-sm pr-10"
                        placeholder="Confirm"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={() => handleBlur("confirmPassword")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Terms and conditions checkbox */}
              <div className="flex items-center mt-4">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                  onBlur={() => handleBlur("acceptTerms")}
                  className="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-2 text-xs text-white">
                  I agree to{" "}
                  <Link to="/TermsandCondition?tab=terms" className="text-[#4CAF50] hover:text-[#3d9140]">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link to="/TermsandCondition?tab=privacy" className="text-[#4CAF50] hover:text-[#3d9140]">
                    Privacy
                  </Link>
                </label>
              </div>
              {touched.acceptTerms && errors.acceptTerms && (
                <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
              )}
              
              {/* Submit button */}
              <RoundButton
                 text={
                   loadingStates.isSignUpLoading ? (
                     <span className="flex items-center justify-center gap-2">
                       <CgSpinner className="animate-spin h-5 w-5" />
                       Creating...
                     </span>
                   ) : (
                     "Create Account"
                   )
                 }
                 type="submit"
                 disabled={isButtonDisabled || loadingStates.isSignUpLoading}
                 className={`w-full py-3 text-sm ${
                   isButtonDisabled || loadingStates.isSignUpLoading
                     ? "bg-green-500"
                     : "bg-[#4CAF50] hover:bg-[#3d9140]"
                 } transition duration-150 ease-in-out text-white`}
               />

              
              <p className="text-xs text-gray-300 mt-4 text-center">
                Have an account?{" "}
                <Link to="/login" className="font-medium text-[#4CAF50] hover:text-[#3d9140]">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
        
        {/* Right Column - Image */}
        <div className="hidden md:flex md:w-1/2 bg-white">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dcqnkr06e/image/upload/v1747167193/sbg_mb8isz.jpg"
              alt="Secure Banking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;