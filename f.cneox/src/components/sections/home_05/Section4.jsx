import React from "react";
import { useNavigate } from "react-router-dom";

const CryptoCard = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <section className="bg-green text-black py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-xl sm:text-2xl text-[#4CAF50] lg:text-5xl font-bold mb-6">
            Investment Packages and Return
          </h1>
          <p className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed">
            Unlock the power of renewable energy with Crown Bankers. Explore our
            tailored investment plans designed to deliver sustainable energy
            returns while maximizing your financial growth. Invest in a cleaner,
            greener future with us today.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 justify-items-center mx-auto max-w-6xl">
          {/* Card 1 */}
          <div className="bg-white flex flex-col border-green-500 border-4 shadow-xl rounded-xl w-full max-w-xs relative">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742887535/1_12_jpiwyg.png"
                alt=""
                className="w-full h-auto rounded-t-xl"
              />
              <button
                onClick={handleRedirect}
                className="mb-5 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent text-white px-4 py-2 rounded"
              >
                Get Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white flex flex-col border-green-500 border-4 shadow-xl rounded-xl w-full max-w-xs relative">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742811539/cards2_x8jow0.png"
                alt=""
                className="w-full h-auto rounded-t-xl"
              />
              <button
                onClick={handleRedirect}
                className="mb-5 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent text-white px-4 py-2 rounded"
              >
                Get Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white flex flex-col border-green-500 border-4 shadow-xl rounded-xl w-full max-w-xs relative">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742811539/cards1_ugv0p4.png"
                alt=""
                className="w-full h-auto rounded-t-xl"
              />
              <button
                onClick={handleRedirect}
                className="mb-5 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent text-white px-4 py-2 rounded"
              >
                Get Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoCard;
