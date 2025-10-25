import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CryptoCard from "../../components/sections/home_05/Section4.jsx";
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function BusinessPlan() {
  // Refs for each section
  const heroRef = useRef(null);
  const investmentRef = useRef(null);
  const investmentCardsRef = useRef(null);
  const benefitsRef = useRef(null);
  const benefitsItemsRef = useRef(null);
  const portfolioRef = useRef(null);
  const ctaRef = useRef(null);
  // New refs for additional sections
  const termsRef = useRef(null);
  const termsCardsRef = useRef(null);
  const evRevolutionRef = useRef(null);
  const incomeStreamRef = useRef(null);
  const incomeCardsRef = useRef(null);

  // Card hover effect state
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Common animation settings for smoothness
    const defaults = {
      ease: "power3.out", // Smoother easing
      duration: 0.8, // Slightly longer duration for fluidity
    };

    // Hero fade-in on load (no scroll trigger for initial load)
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      // Hero content elements
      const heroElements = heroRef.current.querySelectorAll(".hero-animate");
      gsap.fromTo(
        heroElements,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.2,
          delay: 0.3,
        }
      );
    }

    // Investment section
    if (investmentRef.current) {
      gsap.fromTo(
        investmentRef.current,
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: investmentRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 0.8,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Investment Cards staggered fade-in
    if (investmentCardsRef.current) {
      gsap.fromTo(
        investmentCardsRef.current.children,
        { opacity: 0, y: 10 },
        {
          opacity: 2,
          y: 10,
          duration: 0.5, // Faster duration
          ease: "power2.out", // Quicker easing
          stagger: 0.01, // Much smaller stagger for faster sequence
          scrollTrigger: {
            trigger: investmentCardsRef.current,
            start: "top 100%", // Trigger earlier when scrolling
            end: "bottom 30%",
            scrub: 0.5, // Faster scrub for quicker animation
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Benefits section
    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current,
        { opacity: 0, y: 0 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.1,
            toggleActions: "play none none reverse",
          },
        }
      );

      // // Benefits image parallax
      // const benefitsImage = null
      //   benefitsRef.current.querySelector(".benefits-image");
      // if (benefitsImage) {
      //   gsap.fromTo(
      //     benefitsImage,
      //     { x: 60, opacity: 0 },
      //     {
      //       x: 0,
      //       opacity: 1,
      //       ...defaults,
      //       scrollTrigger: {
      //         trigger: benefitsRef.current,
      //         start: "top 85%",
      //         end: "bottom 30%",
      //         scrub: 0.5,
      //         toggleActions: "play none none reverse",
      //       },
      //     }
      //   );
      // }
    }

    // Benefits items staggered fade-in
    if (benefitsItemsRef.current) {
      const benefitsItems = benefitsItemsRef.current.children;
      gsap.fromTo(
        benefitsItems,
        { opacity: 0, x: 0 },
        {
          opacity: 1,
          x: 0,
          ...defaults,
          stagger: 0.2,
          scrollTrigger: {
            trigger: benefitsItemsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Portfolio section
    if (portfolioRef.current) {
      gsap.fromTo(
        portfolioRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Portfolio pie chart animation
      const portfolioChart =
        portfolioRef.current.querySelector(".portfolio-chart");
      if (portfolioChart) {
        gsap.fromTo(
          portfolioChart,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            ...defaults,
            delay: 0.3,
            scrollTrigger: {
              trigger: portfolioRef.current,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    // CTA section
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Terms section
    if (termsRef.current) {
      gsap.fromTo(
        termsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: termsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.8,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Terms cards animation
      if (termsCardsRef.current) {
        gsap.fromTo(
          termsCardsRef.current.children,
          { opacity: 0, y: 90 },
          {
            opacity: 2,
            y: 10,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.02,
            scrollTrigger: {
              trigger: termsCardsRef.current,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    // EV Revolution section
    if (evRevolutionRef.current) {
      const evElements =
        evRevolutionRef.current.querySelectorAll(".ev-animate");

      gsap.fromTo(
        evRevolutionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: evRevolutionRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.8,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate inner content elements
      gsap.fromTo(
        evElements,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          ...defaults,
          stagger: 0.15,
          scrollTrigger: {
            trigger: evRevolutionRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Benefits cards animation (enhance existing animation)
    if (benefitsRef.current) {
      const benefitsCards =
        benefitsRef.current.querySelectorAll(".benefit-card");

      gsap.fromTo(
        benefitsCards,
        { opacity: 0, y: 90 },
        {
          opacity: 2,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Income Stream section
    if (incomeStreamRef.current) {
      gsap.fromTo(
        incomeStreamRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: incomeStreamRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.8,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Income Stream cards
      if (incomeCardsRef.current) {
        gsap.fromTo(
          incomeCardsRef.current.children,
          { opacity: 0, y: 90 },
          {
            opacity: 2,
            y: 10,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.02,
            scrollTrigger: {
              trigger: incomeCardsRef.current,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden bg-white lg:pt-32">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden text-white bg-green-900 "
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742970515/bg_qjzu5g.jpg"
            alt="Solar and wind energy"
            className="object-cover w-full h-full transition-transform opacity-50 duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-/90 to-green-800/70"></div>
        </div>

        <div className="container relative z-10 px-6 py-24 mx-auto md:py-36">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-xl font-bold text-green-400 hero-animate md:text-3xl">
              CROWN BANKERS INVESTMENT PLAN
            </h2>
            <h1 className="mb-6 text-4xl leading-tight hero-animate md:text-7xl font-bethany">
              Go Green, Earn Green
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl hero-animate md:text-2xl text-green-50">
              Rule your portfolio: Invest in Forbes 500, EV, Solar, and Crypto
              with Crown Bankers!
            </p>
            <div className="flex flex-wrap justify-center gap-4 hero-animate">
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-all duration-300 font-medium hover:shadow-lg hover:translate-y-[-2px]"
              >
                <span>Start Investing Today</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-md transition-all duration-300 font-medium hover:shadow-lg hover:translate-y-[-2px]"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Opportunities Section */}
      <section ref={investmentRef} className="px-6 py-20 md:px-12 bg-gray-50">
        <div className="container mx-auto md:px-24">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-16 text-[#4CAF50]">
            Strategic Investment Opportunities
          </h2>

          <div
            ref={investmentCardsRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Solar Investment */}
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:translate-y-[-5px] border-4 border-[#4CAF50] "
              onMouseEnter={() => setHoveredCard("solar")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000"
                  alt="Solar panels"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === "solar" ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Solar Energy
                </h3>
                <p className="mb-4 text-gray-600">
                  Invest in our expanding solar infrastructure with returns
                  powered by sustainable energy production.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-600"></span>
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-green-500 hover:text-green-700 group"
                  >
                    Details{" "}
                    <span className="transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* EV Investment */}
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:translate-y-[-5px] border-4 border-[#4CAF50] "
              onMouseEnter={() => setHoveredCard("ev")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-48 overflow-hidden ">
                <img
                  src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742970494/car_fwgels.png"
                  alt="Electric Vehicle"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === "ev" ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Electric Vehicles
                </h3>
                <p className="mb-4 text-gray-600">
                  Drive your portfolio forward with investments in EV
                  manufacturers and infrastructure.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-600"></span>
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-green-500 hover:text-green-700 group"
                  >
                    Details{" "}
                    <span className="transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Crypto Investment */}
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:translate-y-[-5px] border-4 border-[#4CAF50] "
              onMouseEnter={() => setHoveredCard("crypto")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069"
                  alt="Cryptocurrency"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === "crypto" ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Cryptocurrency
                </h3>
                <p className="mb-4 text-gray-600">
                  Diversify with curated crypto investments, managed by our
                  expert financial advisors.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-600"></span>
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-green-500 hover:text-green-700 group"
                  >
                    Details{" "}
                    <span className="transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Forbes 500 Investment */}
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:translate-y-[-5px] border-4 border-[#4CAF50] "
              onMouseEnter={() => setHoveredCard("forbes")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2073"
                  alt="Corporate buildings"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === "forbes" ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Forbes 500
                </h3>
                <p className="mb-4 text-gray-600">
                  Balance your green investments with stable returns from
                  leading Fortune 500 companies.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-600"></span>
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-green-500 hover:text-green-700 group"
                  >
                    Details{" "}
                    <span className="transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="px-6 py-20 md:px-12"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742807676/4_tbowdb.jpg')`,
        }}
      >
        <div className="">
          <div className="container mx-auto md:px-24">
            <h2 className="mb-16 text-3xl font-bold text-center text-white md:text-6xl">
              Why Invest With Crown Bankers
            </h2>

            <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="overflow-hidden benefits-image rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
                  alt="Investment growth chart"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div ref={benefitsItemsRef} className="space-y-6">
                <div className="flex items-start gap-4 px-6 py-4 bg-white rounded-xl">
                  <div className="flex-shrink-0 p-2 transition-colors duration-300 bg-green-100 rounded-full hover:bg-green-200">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="">
                    <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-green-600">
                      Expert Portfolio Management
                    </h3>
                    <p className="text-gray-600">
                      Our team of financial experts carefully selects and
                      manages diverse investments to maximize returns while
                      managing risk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 px-6 py-4 bg-white rounded-xl">
                  <div className="flex-shrink-0 p-2 transition-colors duration-300 bg-green-100 rounded-full hover:bg-green-200">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-green-600">
                      Green Investment Focus
                    </h3>
                    <p className="text-gray-600">
                      We prioritize environmentally responsible investments that
                      deliver strong financial returns while supporting a
                      sustainable future.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 px-6 py-4 bg-white rounded-xl">
                  <div className="flex-shrink-0 p-2 transition-colors duration-300 bg-green-100 rounded-full hover:bg-green-200">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-green-600">
                      Diversified Risk Management
                    </h3>
                    <p className="text-gray-600">
                      Our investment strategy spreads risk across multiple
                      sectors, asset classes, and geographies to protect your
                      capital.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 px-6 py-4 bg-white rounded-xl">
                  <div className="flex-shrink-0 p-2 transition-colors duration-300 bg-green-100 rounded-full hover:bg-green-200">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-green-600">
                      Transparent Reporting
                    </h3>
                    <p className="text-gray-600">
                      Access detailed reports of your investment performance
                      with real-time updates through our secure online portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Allocation Section - Replaced with Solar Energy Investment */}
      <section
        ref={portfolioRef}
        className="px-6 py-20 text-black bg-white md:px-12"
      >
        <div className="container mx-auto md:px-24">
          <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span>Solar Energy</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold leading-tight text-[#4CAF50]">
                Invest in the Future of Solar Energy with Crown bankers
              </h2>

              <div className="relative w-full h-72">
                <img
                  src="https://i.pinimg.com/736x/b5/99/5a/b5995ac6f2359cfc8655fc69bf26eaa9.jpg"
                  alt="Solar panels at sunset"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              <p className="text-lg">
                The sun shines bright, not only in the sky but also in the world
                of renewable energy. Solar panel technology is experiencing a
                surge in demand, driven by growing environmental concerns and
                the increasing affordability of solar installations. At our
                company, we believe in the power of the sun and are here to help
                you capitalize on this exciting opportunity by investing in the
                future of solar energy.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6 portfolio-chart">
              <div className="relative w-full h-96">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000"
                  alt="Solar panels with sunset"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              <h3 className="text-4xl font-bold text-[#4CAF50]">
                Why Solar? A Brighter Tomorrow Starts Here
              </h3>

              <p className="text-lg">
                Solar energy is a clean, renewable resource with immense
                potential to power our homes, businesses, and entire
                communities. As the world transitions towards a more sustainable
                future, the demand for solar energy is expected to skyrocket.
                The global solar energy market is projected to reach a
                staggering $1.3 trillion by 2027 [Source: Grand View Research].
                By investing in solar panel technology, you're not just
                investing in a company; you're investing in a cleaner, more
                sustainable future for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EV Investment Section */}

      {/* CTA Section */}
      <section
        ref={evRevolutionRef}
        className="py-20 text-white"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742807676/4_tbowdb.jpg')`,
        }}
      >
        <div className="container px-6 mx-auto md:px-24">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center ev-animate">
                <span className="flex items-center gap-1 px-1 py-1 bg-white text-cyan-400 rounded-xl">
                  <div className="w-2 h-2 mr-2 rounded-full bg-cyan-400"></div>
                  Electronic vehicles
                </span>
              </div>

              <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl ev-animate">
                Charge up your portfolio: How our platform can plug you into the
                Electrifying EV Revolution
              </h2>

              <div className="relative w-full h-64 mt-6 mb-6 ev-animate">
                <img
                  src="https://crownbankers.com/assets/img/plan/ev.png"
                  alt="Man using EV charging station"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              <p className="text-lg ev-animate">
                The electric vehicle (EV) revolution is sparking a
                transformation in transportation, and it's creating a wealth of
                opportunities for forward-thinking investors. At our Platform,
                we're here to help you jumpstart your portfolio and become a
                part of this exciting future.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative w-full overflow-hidden h-96 rounded-xl ev-animate">
                <img
                  src="https://crownbankers.com/assets/img/plan/car.png"
                  alt="Family charging electric vehicle"
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="mt-6 text-3xl font-bold text-white ev-animate">
                Why EVs? Buckle Up for a Charged-Up Ride
              </h3>

              <p className="text-lg ev-animate">
                The world is shifting towards cleaner transportation solutions,
                and EVs are leading the charge. Government incentives, falling
                battery costs, and rising consumer demand are all accelerating
                EV adoption. In fact, the global EV market is expected to reach
                a staggering $1.8 trillion by 2030 [Source: Market Research
                Future]. This unprecedented growth presents a compelling
                investment opportunity you won't want to miss.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CryptoCard />

      {/* Income Streams Section */}
      <section
        ref={incomeStreamRef}
        className="relative px-6 py-20 overflow-hidden md:px-12"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742807676/4_tbowdb.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text visibility */}

        {/* Background decoration elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-gradient-to-r from-green-400 to-blue-500 blur-3xl"></div>
          <div className="absolute rounded-full bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-400 to-teal-500 blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto md:px-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Column - Intro */}
            <div className="lg:col-span-1">
              <div className="sticky space-y-8 top-32">
                <div className="flex items-center">
                  <span className="flex items-center gap-1 font-medium text-white">
                    <div className="w-2 h-2 mr-2 rounded-full bg-cyan-400"></div>
                    Ways of earning
                  </span>
                </div>

                <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                  Income Streams
                </h2>

                <p className="mt-8 text-lg leading-relaxed text-white/90">
                  At Crown Bankers, we provide four dynamic income streams to
                  maximize your financial growth: returns on investment in
                  high-growth sectors, a referral bonus for bringing new
                  investors on board, a binary bonus that rewards you for
                  building a strong network, and the My Crown Career program,
                  designed to enhance your professional journey.
                </p>

                <p className="text-lg leading-relaxed text-white/90">
                  With these diverse income opportunities, we ensure that your
                  investments are not only profitable but also rewarding in
                  multiple ways.
                </p>
              </div>
            </div>

            {/* Right Column - Income Cards */}
            <div
              ref={incomeCardsRef}
              className="grid grid-cols-1 gap-6 lg:col-span-2 md:grid-cols-2"
            >
              {/* Returns on investment */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:shadow-white/20 group border border-white/20">
                <div className="flex items-center mb-5">
                  <div className="p-3 mr-3 text-white transition-colors duration-300 rounded-lg bg-white/10 group-hover:bg-white/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 7V17M12 11V17M16 7V17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-300">
                    Returns on investment
                  </h3>
                </div>
                <p className="mb-4 text-white/80">
                  Choose from Solar Starter, Power Growth, Special packages with
                  returns of 1.5% to 2.4% over 130 to 150 days, ensuring steady
                  wealth growth.
                </p>
                <div className="flex justify-end">
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-white hover:text-green-300 group"
                  >
                    Learn more{" "}
                    <span className="ml-1 transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Referral bonus */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:shadow-white/20 group border border-white/20">
                <div className="flex items-center mb-5">
                  <div className="p-3 mr-3 text-white transition-colors duration-300 rounded-lg bg-white/10 group-hover:bg-white/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 15C16 13.3431 14.2091 12 12 12C9.79086 12 8 13.3431 8 15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-300">
                    Referral bonus
                  </h3>
                </div>
                <p className="mb-4 text-white/80">
                  Join our community-driven success at Crown Bankers! Refer new
                  investors, earn a 7% to 9% Referral Bonus, and grow together.
                </p>
                <div className="flex justify-end">
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-white hover:text-green-300 group"
                  >
                    Learn more{" "}
                    <span className="ml-1 transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Binary bonus */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:shadow-white/20 group border border-white/20">
                <div className="flex items-center mb-5">
                  <div className="p-3 mr-3 text-white transition-colors duration-300 rounded-lg bg-white/10 group-hover:bg-white/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 14C10.1046 14 11 13.1046 11 12C11 10.8954 10.1046 10 9 10C7.89543 10 7 10.8954 7 12C7 13.1046 7.89543 14 9 14Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 14C16.1046 14 17 13.1046 17 12C17 10.8954 16.1046 10 15 10C13.8954 10 13 10.8954 13 12C13 13.1046 13.8954 14 15 14Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-300">
                    Binary bonus
                  </h3>
                </div>
                <p className="mb-4 text-white/80">
                  Enhance rewards through referrals with our Binary Bonus,
                  calculated on balanced growth strategy, ensuring fair and
                  streamlined distribution.
                </p>
                <div className="flex justify-end">
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-white hover:text-green-300 group"
                  >
                    Learn more{" "}
                    <span className="ml-1 transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Crown Rewards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:shadow-white/20 group border border-white/20">
                <div className="flex items-center mb-5">
                  <div className="p-3 mr-3 text-white transition-colors duration-300 rounded-lg bg-white/10 group-hover:bg-white/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-300">
                    Crown Rewards
                  </h3>
                </div>
                <p className="mb-4 text-white/80">
                  In My Crown Career, earn rewards based on investments made by
                  those you bring into the network. Grow together with us!
                </p>
                <div className="flex justify-end">
                  <Link
                    to="/services"
                    className="flex items-center font-medium text-white hover:text-green-300 group"
                  >
                    Learn more{" "}
                    <span className="ml-1 transition-transform duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-12 sm:py-16 lg:py-20 "
        // style={{
        //   background: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742807676/4_tbowdb.jpg') no-repeat center center/cover`,
        // }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <img
            src="https://res.cloudinary.com/dygdftjr8/image/upload/v1742979263/cards_mbfp31.png"
            alt="Crown Bankers"
            className="object-contain w-full h-auto"
          />
        </div>
      </section>

      {/* Terms Section */}
      <section
        ref={termsRef}
        className="px-6 py-20 text-black bg-white md:px-12"
      >
        <div className="container mx-auto md:px-24">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-16 text-[#4CAF50]">
            Terms
          </h2>

          <div
            ref={termsCardsRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {/* First row */}
            <div className="bg-[#4CAF50] rounded-lg p-6 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-700/40">
                  <svg
                    className="w-6 h-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                Return on Investment (ROI) credited Mon-Fri.
              </h3>
            </div>

            <div className="bg-[#4CAF50] rounded-lg p-6 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-700/40">
                  <svg
                    className="w-6 h-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                Referral and binary withdrawals are available 24/7.
              </h3>
            </div>

            <div className="bg-[#4CAF50] rounded-lg p-6 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-700/40">
                  <svg
                    className="w-6 h-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                Monthly ROI withdrawals are allowed up to 5 times.
              </h3>
            </div>

            {/* Second row */}
            <div className="bg-[#4CAF50] rounded-lg p-6 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-700/40">
                  <svg
                    className="w-6 h-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                Once a withdrawal is placed, it will be approved and paid within
                0 to 8 hours.
              </h3>
            </div>

            <div className="bg-[#4CAF50] rounded-lg p-6 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-700/40">
                  <svg
                    className="w-6 h-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                Withdrawal charges for ROI income range from 3% to 7%.
              </h3>
            </div>

            <div className="bg-[#4CAF50] rounded-lg p-6 border border-green-600/30 hover:border-green-400/50 transition-all duration-300 text-white">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-700/40">
                  <svg
                    className="w-6 h-6 text-green-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                Binary capping limit ranges from $1,000 to $7,000.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative px-6 py-20 text-white md:px-12"
        style={{
          background: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742807676/4_tbowdb.jpg') no-repeat center center/cover`,
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="container relative z-10 mx-auto md:px-24">
          <h2 className="mb-16 text-3xl font-bold text-center text-white md:text-6xl">
            Benefits
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* First row */}
            <div className="p-6 text-gray-800 transition-all duration-300 bg-white border rounded-lg shadow-lg benefit-card border-white/20 hover:border-white/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                24/7 unlimited access to our live support.
              </h3>
            </div>

            <div className="p-6 text-gray-800 transition-all duration-300 bg-white border rounded-lg shadow-lg benefit-card border-white/20 hover:border-white/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                Zero withdrawal charges for referral and binary incomes.
              </h3>
            </div>

            <div className="p-6 text-gray-800 transition-all duration-300 bg-white border rounded-lg shadow-lg benefit-card border-white/20 hover:border-white/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                Referral earnings will be credited instantly.
              </h3>
            </div>

            {/* Second row */}
            <div className="p-6 text-gray-800 transition-all duration-300 bg-white border rounded-lg shadow-lg benefit-card border-white/20 hover:border-white/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                Referral rewards up to 9%.
              </h3>
            </div>

            <div className="p-6 text-gray-800 transition-all duration-300 bg-white border rounded-lg shadow-lg benefit-card border-white/20 hover:border-white/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                Binary bonus of 10% on the weaker leg.
              </h3>
            </div>

            <div className="p-6 text-gray-800 transition-all duration-300 bg-white border rounded-lg shadow-lg benefit-card border-white/20 hover:border-white/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                Progress through Sunstone to Celestial levels in Crown rewards.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BusinessPlan;
