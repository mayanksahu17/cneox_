import React from "react";

const CEOSection = () => {
  return (
    <section className="bg-black py-16 px-6 flex flex-col items-center justify-center">
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-cyan-400 uppercase tracking-widest">Team</h3>
        <h2 className="text-white text-4xl font-bold mt-2">Our C.E.O</h2>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center px-6 md:px-20">
        {/* CEO Image */}
        <div className="w-[600px]">
          <img src="assets/img/th-1/12.png" alt="CEO" className="rounded-lg" />
        </div>

        {/* CEO Quote Section */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-cyan-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11c.55 0 1 .45 1 1v7a1 1 0 01-1 1h-6v-6h3.293l-3.293 4h1v2h4v-8h-4V11zm-9.4 2.154a3.5 3.5 0 10-2.772 6.293 4.002 4.002 0 01-.405-1.003 4 4 0 01-1.645-.351V15c0-.55-.45-1-1-1H2v6c0 .55.45 1 1 1h6v-4.5H7.59l1.197-2.497a4.002 4.002 0 01-.186-1.85z"
              />
            </svg>
          </div>
          <p className="text-xl mb-6">
            At Crown Bankers, we’re focused on advancing solar energy and
            creating a sustainable future. Investing with us means supporting
            innovative projects that drive real change in the energy sector.
          </p>
          <p className="text-gray-400">
            As CEO, I’m committed to leading our efforts in harnessing solar
            power to benefit both businesses and communities. Your investment
            will play a key role in advancing our mission and achieving
            meaningful progress. Thank you for considering us as your partner in
            this important journey.
          </p>
          <div className="mt-6">
            <p className="text-cyan-400 text-lg">Adrian Cadiz</p>
            <p className="text-gray-400 text-sm">C.E.O</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
