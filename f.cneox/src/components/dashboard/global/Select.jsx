import ReactSelect from "react-select";
import { useTheme } from "../theme-provider"; // adjust if needed

export default function Select({
  options,
  placeHolder = "Select...",
  customStyles,
  onChange,
  value,
  defaultValue,
  defaultInputValue,
  onBlur,
  className,
  isSearchable = true,
  isClearable = false,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "42px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderColor: state.isFocused
        ? "#3b82f6"
        : isDark
        ? "#4b5563"
        : "#d1d5db",
      boxShadow: state.isFocused ? `0 0 0 1px #3b82f6` : "none",
      backgroundColor: isDark ? "#111827" : "#ffffff",
      color: isDark ? "#ffffff" : "#111827",
      "&:hover": {
        borderColor: isDark ? "#6b7280" : "#9ca3af",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#111827" : "#ffffff",
      borderColor: isDark ? "#4b5563" : "#d1d5db",
      borderWidth: "1px",
      borderRadius: "8px",
      boxShadow: isDark
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.7)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? isDark
          ? "#1f2937"
          : "#f3f4f6"
        : "transparent",
      color: state.isSelected
        ? "#ffffff"
        : isDark
        ? "#f3f4f6"
        : "#111827",
      "&:active": {
        backgroundColor: isDark ? "#374151" : "#e5e7eb",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? "#ffffff" : "#111827",
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? "#ffffff" : "#111827",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": {
        color: isDark ? "#d1d5db" : "#4b5563",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": {
        color: isDark ? "#d1d5db" : "#4b5563",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#4b5563" : "#d1d5db",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#374151" : "#e5e7eb",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDark ? "#f3f4f6" : "#111827",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": {
        backgroundColor: isDark ? "#6b7280" : "#d1d5db",
        color: isDark ? "#ffffff" : "#111827",
      },
    }),
  };

  const mergedStyles = customStyles
    ? { ...baseStyles, ...customStyles }
    : baseStyles;

  return (
    <ReactSelect
      options={options}
      styles={mergedStyles}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      defaultInputValue={defaultInputValue}
      onBlur={onBlur}
      className={className}
      isSearchable={isSearchable}
      isClearable={isClearable}
      classNamePrefix="react-select"
      theme={(selectTheme) => ({
        ...selectTheme,
        colors: {
          ...selectTheme.colors,
          primary: "#3b82f6",
          primary25: isDark ? "#1f2937" : "#f3f4f6",
          primary50: isDark ? "#4b5563" : "#e5e7eb",
          neutral0: isDark ? "#111827" : "#ffffff",
          neutral5: isDark ? "#1f2937" : "#f3f4f6",
          neutral10: isDark ? "#374151" : "#e5e7eb",
          neutral20: isDark ? "#4b5563" : "#d1d5db",
          neutral30: isDark ? "#9ca3af" : "#9ca3af",
          neutral40: isDark ? "#d1d5db" : "#6b7280",
          neutral50: isDark ? "#9ca3af" : "#6b7280",
          neutral60: isDark ? "#d1d5db" : "#4b5563",
          neutral70: isDark ? "#e5e7eb" : "#374151",
          neutral80: isDark ? "#f3f4f6" : "#1f2937",
          neutral90: isDark ? "#f9fafb" : "#111827",
        },
      })}
    />
  );
}
