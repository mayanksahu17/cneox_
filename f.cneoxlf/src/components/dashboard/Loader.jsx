import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto flex items-center justify-center">
        <FiLoader className="animate-spin text-blue-500" size={24} />
        <span className="ml-2">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;
