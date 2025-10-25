import { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Button from "../global/Button";
import userService from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SecuritySettings() {
  const { user, updateUserDetails, logOutUser } = useAuth();
  const navigate = useNavigate();

  const [allStates, setAllStates] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    currentSecurityPin: "",
    newSecurityPin: "",
    confirmSecurityPin: "",
    isSaveButtonLoading: false,
    isPinSaveButtonLoading: false,
  });

  const handleStatesChange = (name, value) =>
    setAllStates((prev) => ({ ...prev, [name]: value }));

  const inputData = [
    {
      label: "Current Password",
      name: "currentPassword",
    },

    {
      label: "New Password",
      name: "newPassword",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
    },
  ];
  const inputDataPin = [
    {
      label: "Current Security Pin",
      name: "currentSecurityPin",
    },
    {
      label: "New Security Pin",
      name: "newSecurityPin",
    },
    {
      label: "Confirm Security Pin",
      name: "confirmSecurityPin",
    },
  ];

  const handleSavePassword = async () => {
    try {
      if (allStates?.newPassword !== allStates?.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (allStates.newPassword) {
        handleStatesChange("isSaveButtonLoading", true);
        const passwordResponse = await userService.updateUserPassword(
          {
            newPassword: allStates.newPassword,
            currentPassword: allStates.currentPassword,
          },
          user
        );

        if (passwordResponse?.data?.success) {
          toast.success("Password updated successfully");
          logOutUser();
          toast.success("logout successful");
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      handleStatesChange("isSaveButtonLoading", false);
      setAllStates({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        currentSecurityPin: "",
        newSecurityPin: "",
        confirmSecurityPin: "",
        isSaveButtonLoading: false,
        isPinSaveButtonLoading: false,
      });
    }
  };

  const handleSavePin = async () => {
    try {
      if (allStates?.newSecurityPin !== allStates?.confirmSecurityPin) {
        toast.error("Security pins do not match");
        return;
      }
      if (allStates.newSecurityPin) {
        handleStatesChange("isPinSaveButtonLoading", true);
        const securityPinResponse = await userService.updateUserSecurityPin(
          {
            newPin: allStates.newSecurityPin,
            currentPin: allStates.currentSecurityPin,
          },
          user
        );

        if (securityPinResponse?.data?.isPinSaveButtonLoading)
          handleStatesChange("isSaveButtonLoading", false);

        if (securityPinResponse?.data?.success) {
          const updatedUserResponse = await userService.getUserData(user);
          if (updatedUserResponse?.data?.success) {
            console.log(updatedUserResponse?.data?.data);
            updateUserDetails(updatedUserResponse?.data?.data);
            toast.success("Security Pin updated successfully");
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      handleStatesChange("isPinSaveButtonLoading", false);
      setAllStates({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        currentSecurityPin: "",
        newSecurityPin: "",
        confirmSecurityPin: "",
        isSaveButtonLoading: false,
        isPinSaveButtonLoading: false,
      });
    }
  };

  return (
    <div className="my-4 space-y-4 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col gap-8 mb-8">
        <div className="flex flex-col gap-4 w-full items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Password Settings</h1>
          {inputData.map(({ label, name }, index) => (
            <PasswordInput
              key={index}
              label={label}
              name={name}
              value={allStates[name]}
              onChange={(e) => handleStatesChange(name, e.target.value)}
            />
          ))}
          <div className="w-full md:flex md:items-center md:justify-end">
            <Button
              className="w-full sm:!w-[10%]"
              onClick={handleSavePassword}
              loading={allStates.isSaveButtonLoading}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pin Settings</h1>
          {inputDataPin.map(({ label, name }, index) => (
            <PasswordInput
              key={index}
              label={label}
              name={name}
              value={allStates[name]}
              onChange={(e) => handleStatesChange(name, e.target.value)}
            />
          ))}
          <div className="w-full md:flex md:items-center md:justify-end">
            <Button
              className="w-full sm:!w-[10%]"
              onClick={handleSavePin}
              loading={allStates.isPinSaveButtonLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const PasswordInput = ({ label, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="w-full px-2.5 py-2 border rounded-md border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-colors !ml-0"
          value={value}
          onChange={onChange}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <RiEyeCloseLine className="text-gray-600 dark:text-gray-400" />
          ) : (
            <RiEyeLine className="text-gray-600 dark:text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};
