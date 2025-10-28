// Main.js

import React, { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";

const Main = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating some asynchronous actions, such as data fetching
    const fetchData = async () => {
      // Perform your async actions here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2-second delay
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <div className="text-4xl text-center text-blue-500 flex items-center justify-center h-screen">
          <FiLoader className="animate-spin" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Main;
