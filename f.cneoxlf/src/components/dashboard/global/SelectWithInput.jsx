import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SelectWithInput({
  allOptions,
  defaultOption,
  handleOptionSelect,
  handleInputChange,
  value,
  placeHolder,
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropDown = () => setIsDropDownOpen((prev) => !prev);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  return (
    <div className="flex items-center relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md">
      <div
        className="flex items-center space-x-2 py-2 px-2 cursor-pointer"
        onClick={toggleDropDown}
      >
        <IoMdArrowDropdown
          className={clsx(
            {
              "rotate-180": isDropDownOpen,
              "rotate-0": !isDropDownOpen,
            },
            "transition-transform duration-250 ease-in-out text-gray-500 dark:text-gray-400"
          )}
          size="20"
        />
        <p className="text-gray-900 dark:text-gray-100">{selectedOption}</p>
      </div>

      <div className="w-[1px] h-full bg-gray-300 dark:bg-gray-600" />

      {isDropDownOpen && (
        <div className="bg-white dark:bg-gray-800 absolute w-16 top-12 left-2 z-[999999] rounded-md py-1 border border-gray-300 dark:border-gray-600 shadow-lg">
          {allOptions.map((el, index) => (
            <p
              key={index}
              className="px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
              onClick={() => {
                setSelectedOption(el);
                handleOptionSelect(el);
                setIsDropDownOpen((prev) => !prev);
              }}
            >
              {el}
            </p>
          ))}
        </div>
      )}

      <input
        type="text"
        className="px-2 flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
        autoFocus
        placeholder={placeHolder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
