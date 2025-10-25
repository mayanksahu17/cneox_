import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer_05 from "../../components/footer/Footer_05";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CryptoBlockchain = () => {
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const benefitsRef = useRef(null);
  const technologiesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Common animation settings
    const defaults = {
      ease: "power3.out",
      duration: 1.2,
    };

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // Solutions animation
    if (solutionsRef.current) {
      gsap.fromTo(
        solutionsRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: solutionsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Benefits animation
    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Technologies animation
    if (technologiesRef.current) {
      gsap.fromTo(
        technologiesRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: technologiesRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // CTA animation
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
        className="relative inset-0 h-full py-16 text-white bg-center bg-cover sm:py-20 lg:py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')",
        }}
      >
        <div className="relative max-w-6xl px-4 mx-auto md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl text-white sm:text-5xl lg:text-6xl font-bold">
              Crypto & Blockchain Solutions
            </h1>
            <p className="mx-auto text-base leading-relaxed text-white sm:text-lg lg:text-xl">
              Experience the future of finance with our blockchain-powered financial systems that ensure
              secure transactions, smart contracts, and innovative DeFi solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={solutionsRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Our Blockchain & Crypto Solutions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-blue-900">
                <div className="flex items-center justify-center h-full">
                  <div className="text-6xl text-white">🔗</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">Secure Blockchain Infrastructure</h3>
                <p className="text-gray-600">
                  Enterprise-grade blockchain networks with advanced encryption and consensus mechanisms
                  for maximum security and performance.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-indigo-900">
                <div className="flex items-center justify-center h-full">
                  <div className="text-6xl text-white">📝</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">Smart Contract Development</h3>
                <p className="text-gray-600">
                  Custom smart contracts that automate complex financial transactions, ensuring
                  transparency, efficiency, and reduced counterparty risk.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-purple-900">
                <div className="flex items-center justify-center h-full">
                  <div className="text-6xl text-white">💰</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">DeFi Investment Solutions</h3>
                <p className="text-gray-600">
                  Access to decentralized finance protocols that offer yield farming, liquidity pools,
                  and other innovative investment vehicles.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-green-900">
                <div className="flex items-center justify-center h-full">
                  <div className="text-6xl text-white">🔐</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">Crypto Asset Security</h3>
                <p className="text-gray-600">
                  Institutional-grade custody solutions with multi-signature technology, cold storage,
                  and hardware security modules to safeguard digital assets.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-red-900">
                <div className="flex items-center justify-center h-full">
                  <div className="text-6xl text-white">📊</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">Tokenization Services</h3>
                <p className="text-gray-600">
                  Convert real-world assets into blockchain tokens, creating new markets, improving
                  liquidity, and expanding access to previously illiquid assets.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-yellow-800">
                <div className="flex items-center justify-center h-full">
                  <div className="text-6xl text-white">🔄</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">Cross-Border Payment Systems</h3>
                <p className="text-gray-600">
                  Blockchain-powered payment networks that facilitate instant, low-cost international
                  transfers without traditional banking intermediaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #3a8c3c, #4CAF50)",
        }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl">
            Benefits of Blockchain Technology
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="mb-4 text-4xl">🔒</div>
              <h3 className="mb-3 text-xl font-bold">Enhanced Security</h3>
              <p className="text-white/90">
                Decentralized architecture and cryptographic techniques make blockchain virtually 
                impervious to tampering and fraud.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="mb-4 text-4xl">👁️</div>
              <h3 className="mb-3 text-xl font-bold">Transparency</h3>
              <p className="text-white/90">
                Public ledgers provide immutable records of all transactions, ensuring complete 
                transparency and auditability.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-3 text-xl font-bold">Efficiency</h3>
              <p className="text-white/90">
                Smart contracts automate processes, reducing administrative overhead and 
                eliminating intermediaries to speed up transactions.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="mb-4 text-4xl">🌐</div>
              <h3 className="mb-3 text-xl font-bold">Global Accessibility</h3>
              <p className="text-white/90">
                Blockchain services are accessible to anyone with internet access, expanding financial 
                inclusion to the unbanked population.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={technologiesRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Our Blockchain Technologies
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">Public Blockchains</h3>
                <div className="w-20 h-1 mb-4 bg-[#4CAF50]"></div>
                <p className="text-gray-600">
                  We work with established public blockchain networks like Ethereum, Solana, and Polkadot
                  to provide reliable, decentralized infrastructure for your applications.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">Private & Consortium Chains</h3>
                <div className="w-20 h-1 mb-4 bg-[#4CAF50]"></div>
                <p className="text-gray-600">
                  For enterprise solutions, we implement customized private blockchain networks with
                  controlled access and optimized performance for sensitive financial data.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-gray-800">Layer 2 Solutions</h3>
                <div className="w-20 h-1 mb-4 bg-[#4CAF50]"></div>
                <p className="text-gray-600">
                  We leverage state-of-the-art scaling solutions like Optimistic Rollups and Zero-Knowledge
                  technology to provide high throughput at minimal cost.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] md:h-full">
              <img
                src="https://images.unsplash.com/photo-1639815188546-c43c240ff4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                alt="Blockchain Technology"
                className="object-cover w-full h-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 rounded-lg shadow-inner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 overflow-hidden bg-blue-100 rounded-full">
                  <div className="flex items-center justify-center w-full h-full text-blue-500 text-xl">
                    🏦
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Global Financial Institution</h3>
              </div>
              <p className="mb-4 text-gray-600">
                Implemented a private blockchain network for cross-border payments, reducing settlement
                times from 3 days to under 10 seconds and cutting operational costs by 65%.
              </p>
              <div className="flex items-center">
                <div className="text-[#4CAF50] font-semibold">Results:</div>
                <div className="ml-2 text-gray-700">
                  <span className="font-medium">65%</span> cost reduction,
                  <span className="font-medium">99.9%</span> faster settlements
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 overflow-hidden bg-purple-100 rounded-full">
                  <div className="flex items-center justify-center w-full h-full text-purple-500 text-xl">
                    🏢
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Real Estate Investment Trust</h3>
              </div>
              <p className="mb-4 text-gray-600">
                Developed a tokenization platform for commercial real estate, enabling fractional ownership
                of premium properties and increasing investor participation by 300%.
              </p>
              <div className="flex items-center">
                <div className="text-[#4CAF50] font-semibold">Results:</div>
                <div className="ml-2 text-gray-700">
                  <span className="font-medium">300%</span> increase in investors,
                  <span className="font-medium">40%</span> improved liquidity
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-16 bg-[#4CAF50] text-white"
      >
        <div className="px-4 mx-auto text-center max-w-5xl">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Ready to Transform Your Business with Blockchain Technology?
          </h2>
          <p className="mb-8 text-lg">
            Join Crown Bankers in embracing the future of finance. Our blockchain experts will guide
            you through implementing innovative solutions for your business challenges.
          </p>
          <button className="px-8 py-3 text-lg font-semibold text-[#4CAF50] bg-white rounded-md hover:bg-gray-100 transition duration-300">
            Schedule a Blockchain Consultation
          </button>
        </div>
      </section>

      <Footer_05 />
    </div>
  );
};

export default CryptoBlockchain; 