import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  value,
  onChange,
  name,
  label,
  onBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
        {label ? label : "Password"}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-2.5 py-2 border rounded-md border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-colors !ml-0"
          onBlur={onBlur}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-600 dark:text-gray-400" size={18} />
          ) : (
            <FaEye className="text-gray-600 dark:text-gray-400" size={18} />
          )}
        </div>
      </div>
    </div>
  );
}
