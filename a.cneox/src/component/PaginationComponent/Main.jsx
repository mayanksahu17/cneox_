import React from "react";

const Main = ({ pageIndex, numofPages, prevFunc, nextFunc }) => {
  return (
    <div className="flex flex-row items-center gap-x-5">
      <p className="text-sm text-subTextColor font-medium">
        Page <span className="text-primaryColor font-bold"> {pageIndex}</span>{" "}
        of{" "}
        <span className="text-primaryColor font-bold">
          {pageIndex > numofPages ? pageIndex : numofPages}
        </span>
      </p>
      <div className="flex gap-x-3">
        <button
          className={`flex items-center justify-center px-2  h-8 text-sm font-semibold text-subTextColor  bg-white border border-gray-300 rounded-lg ${
            pageIndex === 1
              ? "opacity-50 hover:border-none hover:text-subTextColor"
              : "hover:bg-gray-100  hover:border-primaryColor hover:text-primaryColor "
          } `}
          onClick={prevFunc}
          disabled={pageIndex === 1}
        >
          Previous
        </button>
        <button
          className={`flex items-center justify-center px-2  h-8 text-sm font-semibold text-subTextColor  bg-white border border-gray-300 rounded-lg ${
            pageIndex === numofPages || pageIndex > numofPages
              ? "opacity-50 hover:border-none hover:text-subTextColor"
              : "hover:bg-gray-100  hover:border-primaryColor hover:text-primaryColor "
          } `}
          onClick={() => {
            if (pageIndex < numofPages) {
              nextFunc();
            }
          }}
          disabled={pageIndex === numofPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Main;
