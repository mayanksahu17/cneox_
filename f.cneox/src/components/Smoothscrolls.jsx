import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "./Smoothscrolls.css";

const Smoothscrolls = ({
  children,
  duration = 1.8,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation = "vertical",
  gestureOrientation = "vertical",
  smoothWheel = true,
  smoothTouch = false,
  touchMultiplier = 2,
  infinite = false,
  wrapperClassName = "",
  contentClassName = "",
}) => {
  const wrapperRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration,
      easing,
      orientation,
      gestureOrientation,
      smoothWheel,
      smoothTouch,
      touchMultiplier,
      infinite,
    });

    // Check if GSAP's ScrollTrigger is available and integrate with it
    if (typeof window !== "undefined") {
      // Try to get ScrollTrigger if it exists
      const ScrollTrigger =
        window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger);

      if (ScrollTrigger) {
        // Connect Lenis scroll with ScrollTrigger
        lenisRef.current.on("scroll", ScrollTrigger.update);
      }
    }

    // Set up the RAF loop for Lenis
    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on component unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [
    duration,
    easing,
    orientation,
    gestureOrientation,
    smoothWheel,
    smoothTouch,
    touchMultiplier,
    infinite,
  ]);

  // Method to expose the Lenis instance to parent components if needed
  const getLenis = () => lenisRef.current;

  return (
    <div
      ref={wrapperRef}
      className={`smooth-wrapper ${wrapperClassName}`}
      data-lenis-ref={getLenis}
    >
      <div className={`smooth-content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default Smoothscrolls;
