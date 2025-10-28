import React from "react";

const ResetButton = ({handleReset}) => {
  // Implement the ResetButton component
  return (
    <button
      onClick={handleReset}
      className="bg-redColor text-white font-medium py-2 px-3 rounded-full"
    >
      Reset
    </button>
  );
};

export default ResetButton;
