import React from "react";

const SearchBar = ({ userId, searchText, handleFilterChange }) => {
  return (
    <div className="mb-7">
      <label
        htmlFor="search"
        className="block mb-2 text-base font-normal text-subTextColor"
      >
        Search
      </label>
      <input
        name={"userId"}
        value={userId}
        onChange={handleFilterChange("userId")}
        type="text"
        className="bg-gray-50 border w-full max-w-[36rem] border-gray-300 text-textColor text-md  ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2 "
        placeholder={`Search by ${searchText}`}
      />
    </div>
  );
};

export default SearchBar;
