import React from "react";

export default function GoldCard() {
  return (
    <div className="mx-auto w-[360px] h-52 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-xl p-4 shadow-lg text-white relative overflow-hidden">
      {/* Premium Badge */}
      <div className="absolute -right-8 top-6 bg-red-600 text-white text-xs font-bold px-10 py-1 transform rotate-45 shadow-md">
        PREMIUM
      </div>
      
      {/* Bank Name */}
      <div className="text-lg font-bold mb-4">Crown bankers</div>

      {/* Card Pattern */}
      <div className="bg-yellow-500 bg-opacity-20 p-4 rounded-lg relative">
        <div className="absolute top-4 right-4">
          {/* Contactless Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.828 9.172a4 4 0 11-5.656 5.656 4 4 0 015.656-5.656z"
            />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 text-xs">OMI GUSTY</div>
        <div className="absolute bottom-4 right-4 text-xs">06/24</div>
        <div className="absolute bottom-1/2 transform translate-y-1/2 left-4 text-sm tracking-widest">
          1234 1234 1234 1234
        </div>
        <div className="absolute bottom-14 left-4">
          {/* Small Chip */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8 text-white"
          >
            <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5-9h-1V8h-2v2H9V8H7v2H6V6h12v4z" />
          </svg>
        </div>
        <div className="absolute top-4 left-4">
          {/* Gold Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4c1.86 0 3.41 1.28 3.86 3H8.14c.45-1.72 2-3 3.86-3zm0 6c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm-6 0c0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.67-2.73 7.03-6 7.96-3.27-.93-6-4.29-6-7.96z" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-14">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-white"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15.25H7v-1.5h4v1.5zm6 0h-4v-1.5h4v1.5zm.5-3.5H7v-1.5h10.5v1.5zm0-3H7v-1.5h10.5v1.5z" />
          </svg>
        </div>
      </div>
      
      {/* Premium Benefits Tag */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
        Unlimited Withdrawals
      </div>
    </div>
  );
} 