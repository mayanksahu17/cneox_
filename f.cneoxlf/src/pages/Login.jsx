import React, { useMemo } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import Button from "../components/dashboard/global/Button";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { AuthImage, LoginImage, Logo } from "../assets";
import { ErrorMessage, PasswordInput } from "../components";

const Login = () => {
  const handleNavigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showOTPInput, setShowOTPInput] = useState(false);

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

  const handleSubmit = async () => {
    try {
      if (!showOTPInput) {
        changeLoadingStates("isSignInLoading", true);
        const response = await authService.sendLoginOTP({
          userId: `${formData.userId}`,
          password: formData.password,
        });

        if (response?.data?.success) {
          changeLoadingStates("isSignInLoading", false);
          // updateUser({
          //   user: response?.data?.data,
          //   token: response?.data?.token,
          // });
          // handleNavigate("/dashboard");
          setShowOTPInput(true);
        }
      } else {
        changeLoadingStates("isSignInLoading", true);
        const response = await authService.loginUser({
          userId: `${formData.userId}`,
          password: formData.password,
          otp: formData.otp,
        });

        if (response?.data?.success) {
          console.log(response);
          
          changeLoadingStates("isSignInLoading", false);
          updateUser({
            user: response?.data?.data,
            token: response?.data?.token,
          });
          handleNavigate("/dashboard");
        }
      }
    } catch (error) {
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

  return (
    <div
      className="w-full flex justify-center items-center min-h-screen py-4 lg:py-10"
      style={{
        backgroundImage: `url(${AuthImage})`,
      }}
    >
      <div className="max-w-[90%] relative lg:max-w-[80%] flex flex-col md:flex-row items-stretch h-full justify-stretch w-full rounded-3xl bg-[#111111] ">
        {/* Logo */}

        <div className="absolute top-4 left-4 cursor-pointer h-14 p-2 w-14 rounded-full bg-white flex items-center justify-center">
          <img
            src={Logo}
            alt="Logo Image"
            className="w-full h-full object-contain"
            onClick={() => handleNavigate("/")}
          />
        </div>

        <div className="w-full md:w-1/2 flex h-full">
          {/* {Array.from({ length: 3 }).map((_, index) => (
              <img
                src="./newimages/red-neon-light-background 1.png"
                className="sm:w-1/3 w-full h-full"
                key={index}
              />
            ))} */}
          <img
            src={LoginImage}
            alt="Login Image"
            className="h-full w-full object-cover max-w-full"
          />
        </div>
        <div className="w-full md:w-1/2 h-full p-4 md:p-10">
          <h1 className="text-[#C0B088] text-3xl font-semibold">Sign In</h1>
          <p className=" text-sm">Login if you have already an account</p>
          <div className="mt-4 space-y-4">
            <div className="w-full">
              <label className="block text-textwhite">User ID</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                onBlur={() => handleBlur("userId")}
              />
              <ErrorMessage error={errors.userId} touched={touched.userId} />
            </div>

            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
            />

            <ErrorMessage error={errors.password} touched={touched.password} />

            {showOTPInput && (
              <div className="w-full">
                <label className="block text-textwhite">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  onBlur={() => handleBlur("otp")}
                />
                <ErrorMessage error={errors.userId} touched={touched.userId} />
              </div>
            )}

            <div className="flex items-center justify-end">
              <p
                className="text-sm text-primary font-medium underline cursor-pointer"
                onClick={() => handleNavigate("/reset-password")}
              >
                Forgot Password ?
              </p>
            </div>

            <div className="w-full mt-6">
              <Button
                onClick={handleSubmit}
                loading={loadingStates.isSignInLoading}
                className="mt-3 !bg-[#B28D5B] hover:!bg-[#c7ad89] disabled:!bg-[#74624a]"
                disabled={isButtonDisabled}
              >
                Sign In
              </Button>
              <p className="text-center w-full text-white text-sm mt-2">
                Don't have an account ?{" "}
                <span
                  className="text-[#C0B088] font-medium underline cursor-pointer"
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
