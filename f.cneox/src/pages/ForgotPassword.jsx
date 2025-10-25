import { useNavigate } from "react-router-dom";
import { Logo, ForgotImage, AuthImage, SignUpImage } from "../assets";
import { useState } from "react";
import { Button, PasswordInput } from "../components";
import authService from "../services/authService";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const handleNavigate = useNavigate();

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
          otp: Number(formData.otp),
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
    <div
      className="w-full flex justify-center items-center min-h-screen py-4 lg:py-10"
      style={{
        backgroundImage: `url(${AuthImage})`,
      }}
    >
      <div className="max-w-[90%] relative lg:max-w-[80%] flex flex-col md:flex-row items-stretch h-full justify-stretch w-full rounded-3xl bg-[#111111] ">
        <div className="absolute top-4 left-4 cursor-pointer h-14 p-2 w-14 rounded-full bg-white flex items-center justify-center">
          <img
            src={Logo}
            alt="Logo Image"
            className="w-full h-full object-contain"
            onClick={() => handleNavigate("/")}
          />
        </div>

        <div className="w-full md:w-1/2 flex h-full">
          <img
            src={SignUpImage}
            alt="SignUp Image"
            className="h-full w-full object-cover max-w-full"
          />
        </div>
        <div className="w-full md:w-1/2 h-full p-4 md:p-10">
          <h1 className="text-[#C0B088] text-3xl font-semibold">
            Forgot Password?
          </h1>
          <p className=" text-sm mt-1">
            Enter the user ID you used when you joined, and we'll send you
            instructions to reset your password.
          </p>
          <div className="flex flex-col w-full my-4">
            <label className="block text-textwhite">User ID</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={(e) => handleChange("userId", e.target.value)}
              className="w-full bg-transparent px-2.5 py-2 border rounded-md border-solid border-white mt-1 !ml-0 text-white"
            />
          </div>

          {formData.isOTPSent && (
            <div className="flex flex-col mb-4 w-full">
              <label className="block text-textwhite">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={(e) => handleChange("otp", e.target.value)}
                className="w-full bg-transparent px-2.5 py-2 border rounded-md border-solid border-white mt-1 !ml-0 text-white"
              />
            </div>
          )}

          {formData.isOTPSent && (
            <div className="flex flex-col mb-4 space-y-4 w-full">
              <PasswordInput
                label={"Enter New Password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              <PasswordInput
                label={"Confirm New Password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
            </div>
          )}

          <Button
            className="w-full my-2 py-2 rounded-lg"
            onClick={handleSubmit}
            loading={
              loadingStates.isForgotLoading || loadingStates.isOTPSentLoading
            }
          >
            {!formData.isOTPSent ? "Submit" : "Change Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
