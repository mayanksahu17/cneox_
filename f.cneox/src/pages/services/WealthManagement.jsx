import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer_05 from "../../components/footer/Footer_05";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const WealthManagement = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // Services section animation
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Process section animation
    if (processRef.current) {
      gsap.fromTo(
        processRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Testimonials section animation
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
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
          backgroundImage: `url('https://res.cloudinary.com/dygdftjr8/image/upload/v1742812051/85f1175cfb48fa3a74dfea6e01c2e404_ko29xs.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-6xl px-4 mx-auto md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl text-white sm:text-5xl lg:text-6xl font-bold">
              Investment & Wealth Management
            </h1>
            <p className="mx-auto text-base leading-relaxed text-white sm:text-lg lg:text-xl">
              Comprehensive wealth management services tailored to help clients maximize returns, 
              preserve capital, and achieve long-term financial objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Our Wealth Management Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">📈</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Investment Planning</h3>
              <p className="text-gray-600">
                Strategic investment advisory tailored to your risk profile, financial goals, and time horizon,
                with diversified portfolios designed to maximize returns.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🏦</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Retirement Planning</h3>
              <p className="text-gray-600">
                Comprehensive retirement strategies to ensure financial security during your golden years,
                with tax-efficient withdrawal plans and income generation solutions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">📊</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Portfolio Management</h3>
              <p className="text-gray-600">
                Active portfolio management with regular rebalancing, performance monitoring, and tactical
                adjustments to capture market opportunities and mitigate risks.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🏛️</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Estate Planning</h3>
              <p className="text-gray-600">
                Strategic estate planning to preserve and efficiently transfer wealth to future generations,
                minimizing tax implications and ensuring your legacy endures.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">💰</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Tax Optimization</h3>
              <p className="text-gray-600">
                Strategic tax planning to minimize liabilities through tax-efficient investment vehicles,
                timing of capital gains, and utilization of available tax incentives.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-[#4CAF50]">
              <div className="mb-4 text-3xl text-[#4CAF50]">🛡️</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Risk Management</h3>
              <p className="text-gray-600">
                Comprehensive risk assessment and mitigation strategies, including insurance solutions
                and defensive investment approaches to protect your wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section 
        ref={processRef}
        className="py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #3a8c3c, #4CAF50)",
        }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl">
            Our Wealth Management Process
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-[#4CAF50] bg-white rounded-full">1</div>
              <h3 className="mb-3 text-xl font-bold">Discovery</h3>
              <p className="text-white/90">
                We begin with an in-depth consultation to understand your financial situation, goals, risk tolerance, and time horizon.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-[#4CAF50] bg-white rounded-full">2</div>
              <h3 className="mb-3 text-xl font-bold">Strategy Development</h3>
              <p className="text-white/90">
                Our experts craft a personalized wealth management plan aligned with your financial objectives and risk profile.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-[#4CAF50] bg-white rounded-full">3</div>
              <h3 className="mb-3 text-xl font-bold">Implementation</h3>
              <p className="text-white/90">
                We execute your customized plan, allocating assets across diverse investment vehicles to optimize returns.
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-[#4CAF50] bg-white rounded-full">4</div>
              <h3 className="mb-3 text-xl font-bold">Monitoring & Adjusting</h3>
              <p className="text-white/90">
                Regular performance reviews and strategy adjustments ensure your portfolio remains aligned with your evolving goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="mb-8 lg:w-1/2 lg:mb-0">
              <h2 className="mb-6 text-3xl font-bold text-[#4CAF50] sm:text-4xl">
                Why Choose Crown Bankers?
              </h2>
              <p className="mb-6 text-gray-600">
                At Crown Bankers, we combine industry expertise with personalized service to deliver exceptional
                wealth management solutions tailored to your unique needs and aspirations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Client-Centric Approach:</strong> Your financial goals and concerns are at the 
                    center of every decision we make.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Industry Expertise:</strong> Our team comprises seasoned financial professionals
                    with extensive experience across market cycles.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Holistic Approach:</strong> We consider all aspects of your financial life to
                    create a comprehensive wealth strategy.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 p-1 mr-4 text-white bg-[#4CAF50] rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Transparent Communication:</strong> Regular updates and clear explanations ensure
                    you're always informed about your investments.
                  </p>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Wealth Management Team"
                className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-16 bg-gray-100"
      >
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex mb-4 text-yellow-500">
                ★★★★★
              </div>
              <p className="mb-4 italic text-gray-600">
                "Crown Bankers' wealth management services have been instrumental in growing my retirement 
                portfolio. Their personalized approach and expert guidance have given me confidence in my 
                financial future."
              </p>
              <div className="font-semibold text-gray-800">- Michael R., Client since 2018</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex mb-4 text-yellow-500">
                ★★★★★
              </div>
              <p className="mb-4 italic text-gray-600">
                "The team at Crown Bankers took the time to understand my family's financial goals and 
                created a wealth management strategy that has consistently delivered results. Their 
                attention to detail is unmatched."
              </p>
              <div className="font-semibold text-gray-800">- Sarah K., Client since 2019</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex mb-4 text-yellow-500">
                ★★★★★
              </div>
              <p className="mb-4 italic text-gray-600">
                "As a business owner, I needed a wealth management partner who understood the unique 
                challenges I face. Crown Bankers has exceeded my expectations with their strategic 
                investment approach and tax optimization strategies."
              </p>
              <div className="font-semibold text-gray-800">- David L., Client since 2020</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#4CAF50] text-white">
        <div className="px-4 mx-auto text-center max-w-5xl">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="mb-8 text-lg">
            Schedule a consultation with our wealth management experts today and discover how
            Crown Bankers can help you achieve your financial goals.
          </p>
          <button className="px-8 py-3 text-lg font-semibold text-[#4CAF50] bg-white rounded-md hover:bg-gray-100 transition duration-300">
            Schedule a Consultation
          </button>
        </div>
      </section>

      <Footer_05 />
    </div>
  );
};

export default WealthManagement; 