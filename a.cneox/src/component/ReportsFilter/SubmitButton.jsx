import React from "react";

const SubmitButton = ({handleFilterSubmit}) => {
  return (
    <button
      onClick={handleFilterSubmit}
      className="bg-greenColor text-white font-medium py-2 px-3 rounded-full"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
