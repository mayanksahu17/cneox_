import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Main = ({ entries, initial, setFunc }) => {
  const [entry, setEntry] = useState(initial);

  const [showDropdown, setShowDropdown] = useState(false);

  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  window.addEventListener("click", (e) => {
    // console.log(e.target);
    // console.log(btnRef.current);
    if (e.target !== btnRef.current && e.target !== dropdownRef.current) {
      setShowDropdown(false);
    }
  });

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (
  //       event.target.id !== "dropdown-button" &&
  //       event.target.id !== "dropdown"
  //     ) {
  //       if (
  //         (btnRef.current && !btnRef.current.contains(event.target)) ||
  //         (dropdownRef.current && !dropdownRef.current.contains(event.target))
  //       ) {
  //         setShowDropdown(false);
  //       }
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  return (
    <div>
      <div className="flex flex-row items-center text-base text-textColor  justify-between w-fit gap-x-2.5">
        Show{" "}
        <div className="relative">
          <button
            className="flex flex-row items-center text-base ring-1 ring-gray-300 py-1 px-2.5 rounded-md gap-x-1.5 text-textColor"
            onClick={() => setShowDropdown((prev) => !prev)}
            ref={btnRef}
            id="dropdown-button"
          >
            {entry}{" "}
            <span>
              <FiChevronDown className="text-sm" />{" "}
            </span>
          </button>
          {showDropdown ? (
            <ul
              className="absolute bg-white w-full px-4 ring-1 ring-gray-300   py-2 top-10 rounded-lg shadow-md flex flex-col gap-0.5 text-textColor z-40"
              ref={dropdownRef}
              id="dropdown"
            >
              {entries.map((ele, i) => (
                <li
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    setEntry(ele);
                    setFunc(ele);
                    setShowDropdown(false);
                  }}
                >
                  {ele}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        Entries
      </div>
    </div>
  );
};

export default Main;
