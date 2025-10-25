import React, { useEffect, useRef } from "react";
import Footer from "../../footer/Footer_05";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import greenBackground from "../../../assets/images/backgrounds/greenBackground.jpg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SolarAgreement = () => {
  // Refs for animation
  const titleRef = useRef(null);
  const agreementCardRef = useRef(null);
  const sectionsRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Common animation settings for smoothness
    const defaults = {
      ease: "power3.out",
      duration: 1,
    };

    // Title fade-in
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Agreement card fade-in
    if (agreementCardRef.current) {
      gsap.fromTo(
        agreementCardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          delay: 0.2,
        }
      );
    }

    // Sections staggered fade-in
    if (sectionsRef.current) {
      const sections = sectionsRef.current.children;
      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.2,
          delay: 0.4,
        }
      );
    }

    // Button bounce and fade-in
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 1,
        }
      );
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${greenBackground})` }}
      className="pt-32"
    >
      <section className="py-12">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2
            ref={titleRef}
            className="mb-12 text-4xl font-extrabold text-center text-white sm:text-4xl"
          >
            Solar Equipment Purchase Agreement
          </h2>

          {/* Agreement Card */}
          <div
            ref={agreementCardRef}
            className="bg-[#e8f5e9] backdrop-blur-md rounded-lg shadow-2xl p-6 sm:p-8"
          >
            <div ref={sectionsRef}>
              {/* Section 1: Commitment to Renewable Energy */}
              <div>
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Crown Bankers' Commitment to Renewable Energy
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  At Crown Bankers, our mission is to integrate sustainable
                  energy solutions with financial innovation. As part of our
                  ongoing efforts to expand our solar energy infrastructure, we
                  are proud to share details of a recent purchase agreement with
                  Wuxi Suntek New Energy Technology Co., Ltd. This acquisition
                  strengthens our goal of advancing solar energy adoption
                  globally.
                </p>
              </div>

              {/* Section 2: Agreement Summary */}
              <div>
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Agreement Summary
                </p>
                <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                  This agreement marks the procurement of key equipment required
                  for the expansion of our solar power plants. The purchase
                  includes:
                </p>
                <ul className="mb-6 text-base text-gray-700 list-disc list-inside sm:text-lg">
                  <li>
                    50,000 mono solar panels (400W capacity each) to enhance
                    energy production capacity.
                  </li>
                  <li>
                    Inverters, DC cables, batteries, and other necessary
                    components for efficient energy storage and distribution.
                  </li>
                  <li>
                    Shipment and delivery arrangements to ensure the timely
                    completion of the solar plant's expansion.
                  </li>
                </ul>
              </div>

              {/* Section 3: Impact on Our Solar Projects */}
              <div>
                <p className="mb-4 text-2xl font-semibold text-gray-900">
                  Impact on Our Solar Projects
                </p>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  The acquired equipment will contribute significantly to Crown
                  Bankers' solar energy projects, including those that will
                  power thousands of households and industries globally. This
                  procurement is part of our long-term plan to foster green
                  energy initiatives and reduce our carbon footprint.
                </p>
              </div>

              {/* Section 4: Supporting a Sustainable Future */}
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                  Supporting a Sustainable Future
                </h3>
                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  By investing in cutting-edge solar technologies, Crown Bankers
                  is driving the shift towards renewable energy. This purchase
                  will help us build more efficient solar plants, ensuring
                  sustainable energy supply for our growing network of partners
                  and clients.
                </p>
              </div>

              {/* View Button */}
              <div>
                <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                  You can view the detailed purchase document below:
                </p>
                <div className="flex justify-center">
                  <a
                    href="/assets/img/th-1/Solar Plant Purchase Invoice.pdf"
                    download
                    className="px-4 py-2 font-semibold text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SolarAgreement;
