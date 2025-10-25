import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer_05 from "../../components/footer/Footer_05";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SolarEnergy = () => {
  const heroRef = useRef(null);
  const whyInvestRef = useRef(null);
  const opportunitiesRef = useRef(null);
  const marketRef = useRef(null);
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

    // Why Choose section animation
    if (whyInvestRef.current) {
      gsap.fromTo(
        whyInvestRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: whyInvestRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Opportunities section animation
    if (opportunitiesRef.current) {
      gsap.fromTo(
        opportunitiesRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: opportunitiesRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Market section animation
    if (marketRef.current) {
      gsap.fromTo(
        marketRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: marketRef.current,
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
          backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742822995/2-Renewable_energy_sources.width-600_pufyyq.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-6xl px-4 mx-auto md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl text-white sm:text-5xl lg:text-6xl font-bold">
              Solar Energy Solutions & Green Futures
            </h1>
            <p className="mx-auto text-base leading-relaxed text-white sm:text-lg lg:text-xl">
              Explore strategic opportunities in solar energy, from utility-scale solar farms to 
              innovative renewable technologies for sustainable growth and environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Solar Section */}
      <section ref={whyInvestRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Why Choose Solar Energy
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">☀️</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Exceptional Growth</h3>
              <p className="text-gray-600">
                The global solar energy market is experiencing unprecedented expansion, with capacity 
                installations breaking records year after year across developed and emerging markets.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">📈</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Long-Term Stability</h3>
              <p className="text-gray-600">
                Solar energy provides decades of stable operation with minimal maintenance requirements 
                and predictable performance throughout the asset's lifetime.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🌍</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">ESG Impact</h3>
              <p className="text-gray-600">
                Align your portfolio with environmental and social governance goals while 
                contributing meaningfully to the transition to a low-carbon economy.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🔋</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Technological Advancements</h3>
              <p className="text-gray-600">
                Ongoing innovations in efficiency, storage solutions, and materials science 
                continue to enhance the performance and economics of solar technology.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">📋</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Policy Support</h3>
              <p className="text-gray-600">
                Government incentives, tax benefits, and renewable energy mandates create a 
                favorable environment for solar development worldwide.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🧩</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Portfolio Diversification</h3>
              <p className="text-gray-600">
                Solar energy assets offer low correlation with traditional market assets, 
                providing valuable diversification benefits for your portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section 
        ref={marketRef}
        className="py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #3a8c3c, #4CAF50)",
        }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl">
            Solar Energy Market Insights
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="text-6xl font-bold">77%</div>
              <p className="mt-4 text-lg">Cost Reduction in Solar PV Systems Since 2010</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="text-6xl font-bold">25.9%</div>
              <p className="mt-4 text-lg">Compound Annual Growth Rate Through 2028</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="text-6xl font-bold">$1.5T</div>
              <p className="mt-4 text-lg">Projected Market Size by 2028</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="text-6xl font-bold">20+</div>
              <p className="mt-4 text-lg">Years of Reliable Operation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section ref={opportunitiesRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Solar Energy Opportunities
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Solar Farms"
                className="object-cover w-full h-64"
              />
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Utility-Scale Solar Farms</h3>
                <p className="mb-4 text-gray-600">
                  Strategic opportunities in large-scale solar installations that generate power for utilities and 
                  the electric grid. These projects typically feature:
                </p>
                <ul className="mb-6 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Long-term power purchase agreements (PPAs)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Stable, predictable operational performance
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Professional management and maintenance
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Customizable participation options
                  </li>
                </ul>
                <div className="font-semibold text-[#4CAF50]">Consultation Required</div>
              </div>
            </div>
            <div className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559302995-f8d7c50a89fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Solar Technology Companies"
                className="object-cover w-full h-64"
              />
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Solar Technology Ventures</h3>
                <p className="mb-4 text-gray-600">
                  Opportunities in innovative enterprises driving technological advancements in the solar industry,
                  from panel manufacturers to energy storage solutions:
                </p>
                <ul className="mb-6 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Access to high-growth potential companies
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Exposure to cutting-edge solar technologies
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Carefully vetted opportunities with strong fundamentals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Tailored strategies based on client goals
                  </li>
                </ul>
                <div className="font-semibold text-[#4CAF50]">Consultation Required</div>
              </div>
            </div>
            <div className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1592833159057-6fdc11e5a1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Community Solar Projects"
                className="object-cover w-full h-64"
              />
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Community Solar Projects</h3>
                <p className="mb-4 text-gray-600">
                  Participate in shared solar installations that provide clean energy to multiple
                  subscribers in a community, offering:
                </p>
                <ul className="mb-6 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Accessible entry points for solar participation
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Community impact and local economic benefits
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Regular income from energy production
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Flexible participation options
                  </li>
                </ul>
                <div className="font-semibold text-[#4CAF50]">Consultation Required</div>
              </div>
            </div>
            <div className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1605980625600-88179dffadc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Solar Green Bonds"
                className="object-cover w-full h-64"
              />
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Solar Financing Solutions</h3>
                <p className="mb-4 text-gray-600">
                  Fixed-income opportunities that fund solar energy projects and installations,
                  providing:
                </p>
                <ul className="mb-6 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Predictable payment schedules
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Lower risk profile than equity opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Potential tax advantages
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Custom-structured participation options
                  </li>
                </ul>
                <div className="font-semibold text-[#4CAF50]">Consultation Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Guidance Section */}
      <section 
        className="py-16 bg-gray-100"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#4CAF50] sm:text-4xl">
                Expert Guidance & Personalized Solutions
              </h2>
              <p className="mb-8 text-gray-600">
                At Crown Bankers, our solar energy specialists bring decades of industry experience 
                to help you navigate the complexities of renewable energy opportunities. Our approach 
                combines thorough market analysis with your specific goals to create customized strategies.
              </p>
              <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-3xl text-[#4CAF50]">🔍</div>
                  <h3 className="text-xl font-bold text-gray-800">Thorough Due Diligence</h3>
                </div>
                <p className="text-gray-600">
                  We conduct comprehensive assessment of each opportunity, evaluating technical specifications, 
                  regulatory compliance, and long-term viability factors.
                </p>
              </div>
              <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-3xl text-[#4CAF50]">🛠️</div>
                  <h3 className="text-xl font-bold text-gray-800">Customized Strategy Development</h3>
                </div>
                <p className="text-gray-600">
                  We work closely with you to develop a tailored approach that aligns with your goals, 
                  timeline, and sustainability objectives.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-3xl text-[#4CAF50]">📊</div>
                  <h3 className="text-xl font-bold text-gray-800">Ongoing Performance Monitoring</h3>
                </div>
                <p className="text-gray-600">
                  Our team provides continuous oversight and regular reporting to ensure your 
                  solar assets perform as expected throughout their lifecycle.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Solar Energy Specialists"
                className="w-full rounded-lg shadow-lg"
              />
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
            Ready to Explore Solar Energy Opportunities?
          </h2>
          <p className="mb-8 text-lg">
            Join Crown Bankers in participating in the solar energy revolution. Our expert team
            will guide you through opportunities that align with your financial goals
            and values.
          </p>
          <button className="px-8 py-3 text-lg font-semibold text-[#4CAF50] bg-white rounded-md hover:bg-gray-100 transition duration-300">
            Schedule a Consultation Today
          </button>
        </div>
      </section>

      <Footer_05 />
    </div>
  );
};

export default SolarEnergy;