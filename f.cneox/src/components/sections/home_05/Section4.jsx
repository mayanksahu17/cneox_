import React from "react";
import { useNavigate } from "react-router-dom";

const CryptoCard = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  const cards = [
    {
      img: "https://res.cloudinary.com/dygdftjr8/image/upload/v1742887535/1_12_jpiwyg.png",
      alt: "Investment package 1",
    },
    {
      img: "https://res.cloudinary.com/dygdftjr8/image/upload/v1742811539/cards2_x8jow0.png",
      alt: "Investment package 2",
    },
    {
      img: "https://res.cloudinary.com/dygdftjr8/image/upload/v1742811539/cards1_ugv0p4.png",
      alt: "Investment package 3",
    },
  ];

  return (
    <section className="bg-black text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-yellow-500">
            Investment Packages and Return
          </h1>
          <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
            Unlock the power of renewable energy with{" "}
            <span className="text-yellow-500 font-semibold">CNEOX</span>. Explore
            our tailored investment plans designed to deliver sustainable energy
            returns while maximizing your financial growth. Invest in a cleaner,
            greener future with us today.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 justify-items-center mx-auto max-w-6xl">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col border-2 border-yellow-500 bg-gray-900 hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-xl rounded-xl w-full md:max-w-sm relative group overflow-hidden"
            >
              <div className="relative w-full h-48 md:h-56">
                <img
                  src={card.img}
                  alt={card.alt}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-t-xl group-hover:opacity-80 transition-opacity duration-300"
                />
                <button
                  onClick={handleRedirect}
                  aria-label={`Get ${card.alt}`}
                  role="button"
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-400 transition-all duration-300 z-20 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                >
                  Get Now
                </button>
              </div>

              {/* Optional: content area in card if you want description later */}
              <div className="p-4 text-center">
                {/* Placeholder title / description area — remove if not needed */}
                {/* <h3 className="text-lg font-semibold text-white group-hover:text-black mb-2">
                  Package title
                </h3>
                <p className="text-sm text-white/70 group-hover:text-black/80">
                  Short description of the package.
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptoCard;
