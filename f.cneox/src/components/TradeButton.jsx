import React from "react";

/**
 * TradeButton
 * Props:
 *  - variant: "buy" | "sell"
 *  - onClick: function
 *  - disabled: boolean
 *  - size: "sm" | "md" | "lg"
 */
const VARIANTS = {
  buy: {
    bg: "bg-green-600 hover:bg-green-700",
    bgDisabled: "bg-green-400 cursor-not-allowed",
    text: "text-white",
    icon: (
      // upward arrow (buy)
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19V6"></path>
        <path d="M5 12l7-7 7 7"></path>
      </svg>
    ),
  },
  sell: {
    bg: "bg-red-600 hover:bg-red-700",
    bgDisabled: "bg-red-400 cursor-not-allowed",
    text: "text-white",
    icon: (
      // downward arrow (sell)
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v13"></path>
        <path d="M19 12l-7 7-7-7"></path>
      </svg>
    ),
  },
};

const SIZE_MAP = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-10 py-4 text-lg rounded-xl",
};

export default function TradeButton({
  onClick = () => {},
  disabled = false,
  size = "md",
  children,
  type = "button",
}) {
  const v =  VARIANTS.buy;
  const sizeCls = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    //   aria-label={variant === "buy" ? "Buy" : "Sell"}
      className={`inline-flex items-center justify-center ${sizeCls} font-semibold transition-all duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none bg-yellow-500 text-black shadow-sm`}
    >
      {v.icon}
      <span className="select-none">{children }</span>
    </button>
  );
}
