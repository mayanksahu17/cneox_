import { useState, useEffect, useRef } from "react";
export const Popup = ({ imageSrc, closePopup, nextPopup }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closePopup();
        if (nextPopup) nextPopup();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closePopup, nextPopup]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      style={{ zIndex: 100 }}
    >
      <div
        className="w-[85%] md:w-[35%] h-[45%] md:h-[70%] bg-white p-4 rounded relative"
        ref={modalRef}
      >
        <img src={imageSrc} alt="Popup Content" className="w-[100%] h-[100%]" />

        {/* Close Button */}
        <button
          onClick={() => {
            closePopup();
            if (nextPopup) nextPopup();
          }}
          className="absolute top-[-1.5rem] right-[-1.5rem] mt-2 mr-2 bg-colorOrangyRed rounded-full p-2"
        >
          <img src="assets/img/popups/close.png" className="w-8" alt="Close" />
        </button>
      </div>
    </div>
  );
};
