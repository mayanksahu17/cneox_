import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import authService from "../../services/authService";
import useKeyboardFilterSubmit from "../../hooks/useKeyboardFilterSubmit";

const Login = () => {
  const handleNavigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
    security_pin: "",
  });

  const [loadingStates, setLoadingStates] = useState({
    isSignInLoading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeLoadingStates = (name, value) => {
    setLoadingStates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      changeLoadingStates("isSignInLoading", true);
      const response = await authService.loginAdmin(LoginForm);

      // console.log(response?.data?.role);
      if (response?.data?.success) {
        changeLoadingStates("isSignInLoading", false);
        await updateUser({
          email: response?.data?.email,
          name: response?.data?.name,
          role: response?.data?.role,
          token: response?.data?.token,
        });

        toast.success("Logged in successfully");
        handleNavigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useKeyboardFilterSubmit(handleSubmit);

  if (user) {
    console.log("user h bhai ")
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="max-w-screen-xl w-full flex flex-col justify-center p-4 items-center min-h-screen mx-auto">
      <div className="flex flex-col items-center rounded-xl shadow-2xl justify-center p-4">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-textColor text-3xl font-semibold">Sign In</h1>
          <p className=" text-sm text-textColor">
            Login if you have already an account for check
          </p>
          <div className="mt-4 space-y-4">
            <div className="w-full">
              <label className="block text-subTextColor">Email</label>
              <input
                type="email"
                name="email"
                value={LoginForm.email}
                onChange={handleChange}
                className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-gray-300 mt-1 !ml-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none text-textColor"
              />
            </div>
            <div className="w-full">
              <label className="block text-subTextColor">Password</label>
              <input
                type="password"
                name="password"
                value={LoginForm.password}
                onChange={handleChange}
                className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-gray-300 mt-1 !ml-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none text-textColor"
              />
            </div>
            <div className="w-full">
              <label className="block text-subTextColor">Security Pin</label>
              <input
                type="text"
                name="security_pin"
                value={LoginForm.security_pin}
                onChange={handleChange}
                className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-gray-300 mt-1 !ml-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none text-textColor"
              />
            </div>
            <div className="w-full mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-primaryColor text-white px-6 py-2 rounded-lg"
                loading={loadingStates.isSignInLoading}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
