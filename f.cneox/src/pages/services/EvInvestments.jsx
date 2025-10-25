import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer_05 from "../../components/footer/Footer_05";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const EvInvestments = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // Features section animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Stats section animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // CTA section animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="pt-28 bg-gray-50">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative inset-0 h-full py-16 text-white bg-center bg-cover sm:py-20 lg:py-24 bg-green/50"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742815841/electric-car-charging-city-park-autumn-sunset_ogtide.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0"></div>
        <div className="relative max-w-6xl px-4 mx-auto md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl text-white sm:text-5xl lg:text-6xl font-bold">
              EV Investments & Infrastructure Growth
            </h1>
            <p className="mx-auto text-base leading-relaxed text-white sm:text-lg lg:text-xl">
              Capitalize on the electric vehicle revolution with our strategic investment opportunities
              in charging networks, battery technology, and smart mobility solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Why Invest in Electric Vehicle Technology
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🚗</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Rapidly Growing Market</h3>
              <p className="text-gray-600">
                The global EV market is projected to reach $1.8 trillion by 2030, with a compound
                annual growth rate of over 21.7%.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🔋</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Battery Innovation</h3>
              <p className="text-gray-600">
                Investments in advanced battery technology are creating opportunities for higher
                energy density, faster charging, and longer lifespans.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🔌</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Charging Infrastructure</h3>
              <p className="text-gray-600">
                Investments in charging networks are essential as global markets aim to expand
                accessibility for the growing number of electric vehicles.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">💼</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Government Support</h3>
              <p className="text-gray-600">
                Favorable policies, tax incentives, and subsidies worldwide are accelerating
                the adoption of electric vehicles and related technologies.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🌍</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Environmental Impact</h3>
              <p className="text-gray-600">
                ESG-focused investments in sustainable transportation solutions offer both
                financial returns and positive environmental impact.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">📊</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Diverse Investment Avenues</h3>
              <p className="text-gray-600">
                From established automakers to emerging startups, the EV ecosystem offers
                various entry points for investors of all risk profiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #3a8c3c, #4CAF50)",
        }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl">
            The Electric Vehicle Revolution in Numbers
          </h2>
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-4xl font-bold sm:text-5xl">21.7%</div>
              <p className="mt-2 text-lg">Annual Growth Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold sm:text-5xl">$1.8T</div>
              <p className="mt-2 text-lg">Market Size by 2030</p>
            </div>
            <div>
              <div className="text-4xl font-bold sm:text-5xl">145M+</div>
              <p className="mt-2 text-lg">EVs Expected by 2030</p>
            </div>
            <div>
              <div className="text-4xl font-bold sm:text-5xl">40%</div>
              <p className="mt-2 text-lg">Reduction in Battery Costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="mb-8 lg:w-1/2 lg:mb-0">
              <h2 className="mb-6 text-3xl font-bold text-[#4CAF50] sm:text-4xl">
                Our Investment Approach
              </h2>
              <p className="mb-6 text-gray-600">
                At Crown Bankers, we take a strategic approach to EV investments, focusing on high-growth
                opportunities across the electric vehicle ecosystem. Our comprehensive strategy includes:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Established Manufacturers:</strong> Investments in major automakers 
                    transitioning to electric vehicle production.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Battery Technology:</strong> Companies pioneering advancements in battery
                    capacity, charging speed, and sustainability.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Charging Infrastructure:</strong> Fast-charging networks and innovative
                    charging solution providers expanding global infrastructure.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Materials & Supply Chain:</strong> Critical mineral suppliers and sustainable 
                    material innovators essential to EV production.
                  </p>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742815719/electric-vehicle-charging-night_jfiyhy.png"
                alt="Electric Vehicle Charging"
                className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-16 bg-gray-100"
      >
        <div className="px-4 mx-auto text-center max-w-5xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Invest in the Future of Transportation?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Join Crown Bankers in investing in the electric vehicle revolution. Our expert team
            will guide you through investment opportunities that match your financial goals.
          </p>
          <button className="px-8 py-3 text-lg font-semibold text-white rounded-md bg-[#4CAF50] hover:bg-[#3d8b40] transition duration-300">
            Start Investing Today
          </button>
        </div>
      </section>

      <Footer_05 />
    </div>
  );
};

export default EvInvestments; 