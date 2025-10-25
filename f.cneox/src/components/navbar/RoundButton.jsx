import { useRef } from "react";
import { gsap } from "gsap";
import { useEffect } from "react";

const RoundButton = ({ text = "Click Me!", className = "" }) => {
  const xTo = useRef();
  const yTo = useRef();
  const buttonRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    xTo.current = gsap.quickTo(divRef.current, "x", {
      duration: 0.8,
      ease: "power3",
    });
    yTo.current = gsap.quickTo(divRef.current, "y", {
      duration: 0.8,
      ease: "power3",
    });

    gsap.set(divRef.current, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
      zIndex: -10,
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(divRef.current, {
      scale: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(divRef.current, {
      scale: 0,
      duration: 0.3,
    });
  };

  const handleMouseMove = (e) => {
    if (buttonRef.current && xTo.current && yTo.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const { top, left } = rect;
      xTo.current(e.clientX - left);
      yTo.current(e.clientY - top);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`relative border-2 border-solid border-[#4CAF50] px-5 py-2 rounded-3xl text-white overflow-hidden hover:text-[#4CAF50] hover:border-white bg-[#4CAF50] z-0 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={divRef}
        className="absolute w-[200px] h-[150px] bg-white left-0 top-0 wrapperElement -z-10 pointer-events-none rounded-[50%]"
      ></div>
      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default RoundButton;
