import clsx from "clsx";

export default function ToggleSwitch({ isChecked, handleToggle }) {
  return (
    <label
      htmlFor="toggleTwo"
      className="flex items-center cursor-pointer select-none text-gray-900"
      onClick={handleToggle}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={Boolean(isChecked)}
        />
        <div
          className={clsx(
            "block h-8 rounded-full  w-14",
            isChecked ? "bg-red-300" : "bg-gray-300"
          )}
        ></div>
        <div
          className={`absolute w-6 h-6 transition bg-white  border-1 rounded-full dot dark:bg-dark-4 left-1 top-1 ${
            isChecked
              ? "peer-checked:translate-x-full peer-checked:bg-primary"
              : ""
          }`}
        ></div>
      </div>
    </label>
  );
}
