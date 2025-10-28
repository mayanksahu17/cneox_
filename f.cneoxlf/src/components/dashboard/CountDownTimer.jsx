import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // Set the target date and time to June 22, 12 PM England time (BST)
  const targetDate = new Date(Date.UTC(2024, 5, 22, 11, 0, 0, 0)); // June 22, 12 PM BST is 11 AM UTC

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="countdown-timer h-[40px] md:h-[80px] p-2 bg-transparent mt-[-100px] md:mt-[-10px] text-black flex flex-col items-center justify-center text-thin md:text-2xl">
      <div className="font-semibold">Time Left Until Launch</div>
      <div className="timer text-black">
        <span>{timeLeft.days}d </span>
        <span>{timeLeft.hours}h </span>
        <span>{timeLeft.minutes}m </span>
        <span>{timeLeft.seconds}s </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
