import React from "react";

const GradientLayout = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-black">
      {/* Top Square */}
      <div className="relative flex items-center justify-center mb-6">
        <div
          className="h-24 w-24 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #13D5FF 0%, #002968 100%)",
          }}
        >
          <img
            src="/assets/img/logoname.png"
            alt="center-icon"
            className="h-12 w-12"
          />
        </div>
        <div className="absolute right-48 top-12 w-0.5 h-[72px] bg-white"></div>
        <div className="absolute left-48 top-12 w-0.5 h-[72px] bg-white"></div>
        <div className="absolute left-24 h-0.5 w-[96px] bg-white"></div>
        <div className="absolute right-24 h-0.5 w-[96px] bg-white"></div>
      </div>

      {/* Vertical Line from Top to Middle */}

      {/* Middle Row */}
      <div className="relative flex gap-x-12 mb-6">
        <div
          className="relative h-24 w-24 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 148, 255, 0.45) 0%, #D5FFD4 100%)",
          }}
        >
          <img
            src="assets/img/th-1/1.png"
            alt="middle-icon-1"
            className="h-12 w-12"
          />
        </div>

        <div
          className="relative h-24 w-24 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 148, 255, 0.45) 0%, #D5FFD4 100%)",
          }}
        >
          <img
            src="assets/img/th-1/2.png"
            alt="middle-icon-2"
            className="h-12 w-12"
          />
          <div className="absolute  bottom-24 w-0.5 h-6 bg-white"></div>
          <div className="absolute  top-24 w-0.5 h-6 bg-white"></div>
        </div>

        <div
          className="relative h-24 w-24 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 148, 255, 0.45) 0%, #D5FFD4 100%)",
          }}
        >
          <img
            src="assets/img/th-1/3.png"
            alt="middle-icon-3"
            className="h-12 w-12"
          />
        </div>
      </div>

      {/* Bottom Square */}
      <div className="relative flex items-center justify-center">
        <div
          className="h-24 w-24 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #0094FF 0%, #D5FFD4 100%)",
          }}
        >
          <img
            src="assets/img/th-1/4.png"
            alt="bottom-icon"
            className="h-12 w-12"
          />
        </div>
        <div className="absolute right-48 bottom-12 w-0.5 h-[72px] bg-white"></div>
        <div className="absolute left-48 bottom-12 w-0.5 h-[72px] bg-white"></div>
        <div className="absolute left-24 h-0.5 w-[96px] bg-white"></div>
        <div className="absolute right-24 h-0.5 w-[96px] bg-white"></div>
      </div>
    </div>
  );
};

export default GradientLayout;
