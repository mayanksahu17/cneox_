import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer_05 from "../../components/footer/Footer_05";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AiFinance = () => {
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const benefitsRef = useRef(null);
  const useCasesRef = useRef(null);
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

    // Capabilities animation
    if (capabilitiesRef.current) {
      gsap.fromTo(
        capabilitiesRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: capabilitiesRef.current,
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
        benefitsRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Use Cases animation
    if (useCasesRef.current) {
      gsap.fromTo(
        useCasesRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: useCasesRef.current,
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
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80')",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-6xl px-4 mx-auto md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl text-white sm:text-5xl lg:text-6xl font-bold">
              AI in Finance & Automation
            </h1>
            <p className="mx-auto text-base leading-relaxed text-white sm:text-lg lg:text-xl">
              Transforming financial operations with AI-driven analytics, fraud detection, and intelligent 
              automation solutions for unparalleled efficiency and insights.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={solutionsRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Our AI Finance Solutions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#4CAF50] border-t-4">
              <div className="mb-4 text-5xl text-[#4CAF50] flex justify-center">🤖</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800 text-center">Intelligent Process Automation</h3>
              <p className="text-gray-600">
                Streamline repetitive financial processes with AI-powered automation that reduces errors, 
                increases efficiency, and frees your team to focus on strategic initiatives.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#4CAF50] border-t-4">
              <div className="mb-4 text-5xl text-[#4CAF50] flex justify-center">📊</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800 text-center">Predictive Analytics</h3>
              <p className="text-gray-600">
                Leverage advanced algorithms and machine learning to forecast market trends, predict 
                financial outcomes, and make data-driven investment decisions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#4CAF50] border-t-4">
              <div className="mb-4 text-5xl text-[#4CAF50] flex justify-center">🔐</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800 text-center">Fraud Detection & Prevention</h3>
              <p className="text-gray-600">
                Protect financial assets with AI systems that continuously monitor transactions, 
                identify suspicious patterns, and prevent fraud in real-time.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#4CAF50] border-t-4">
              <div className="mb-4 text-5xl text-[#4CAF50] flex justify-center">💼</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800 text-center">Automated Portfolio Management</h3>
              <p className="text-gray-600">
                Optimize investment portfolios through AI algorithms that analyze market conditions, 
                adjust allocations, and maximize returns based on risk profiles.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#4CAF50] border-t-4">
              <div className="mb-4 text-5xl text-[#4CAF50] flex justify-center">💬</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800 text-center">Conversational Finance</h3>
              <p className="text-gray-600">
                Enhance customer experience with AI-powered chatbots and virtual assistants that provide 
                24/7 financial guidance, account information, and personalized recommendations.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-[#4CAF50] border-t-4">
              <div className="mb-4 text-5xl text-[#4CAF50] flex justify-center">📱</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800 text-center">Personalized Banking Solutions</h3>
              <p className="text-gray-600">
                Deliver tailored financial products and services based on individual customer behavior, 
                preferences, and needs through sophisticated AI recommendation systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section
        ref={capabilitiesRef}
        className="py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #3a8c3c, #4CAF50)",
        }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                The Power of AI in Financial Services
              </h2>
              <p className="mb-8 text-white/90">
                At Crown Bankers, we harness cutting-edge artificial intelligence technology to 
                revolutionize financial operations. Our AI systems process vast amounts of data 
                in milliseconds, identify patterns invisible to the human eye, and execute 
                complex tasks with unmatched precision.
              </p>
              <div className="p-6 mb-6 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="mb-3 text-xl font-bold">Machine Learning</h3>
                <p className="text-white/80">
                  Our systems continuously learn from new data, adapting and improving over time 
                  to deliver increasingly accurate financial insights and predictions.
                </p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
                <h3 className="mb-3 text-xl font-bold">Natural Language Processing</h3>
                <p className="text-white/80">
                  Extract valuable insights from unstructured financial documents, news, and 
                  reports to inform decision-making and identify market opportunities.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="AI in Finance"
                className="object-cover w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Benefits of AI-Powered Finance
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF50] -top-6 -right-6 text-white text-xl font-bold">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Enhanced Efficiency</h3>
              <p className="text-gray-600">
                Automate manual, time-consuming tasks to reduce operational costs by up to 70% and 
                accelerate processing times from days to minutes.
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF50] -top-6 -right-6 text-white text-xl font-bold">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Superior Accuracy</h3>
              <p className="text-gray-600">
                Eliminate human error in financial processes with AI systems that maintain consistent 
                precision and reliability across millions of transactions.
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF50] -top-6 -right-6 text-white text-xl font-bold">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Uncover hidden patterns and correlations in financial data that drive strategic 
                decision-making and competitive advantage.
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF50] -top-6 -right-6 text-white text-xl font-bold">
                4
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Improved Risk Management</h3>
              <p className="text-gray-600">
                Identify potential financial risks before they materialize with predictive models that 
                analyze market conditions and historical patterns.
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF50] -top-6 -right-6 text-white text-xl font-bold">
                5
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Personalized Experience</h3>
              <p className="text-gray-600">
                Deliver customized financial solutions and services that meet the unique needs of 
                each client, enhancing satisfaction and loyalty.
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF50] -top-6 -right-6 text-white text-xl font-bold">
                6
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Scalable Operations</h3>
              <p className="text-gray-600">
                Handle growing transaction volumes and expanding business operations without 
                proportional increases in staff or operational costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesRef} className="py-12 sm:py-16 lg:py-20 bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 mr-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="text-2xl text-blue-500">🏦</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Global Investment Firm</h3>
              </div>
              <p className="mb-6 text-gray-600">
                A leading investment management company implemented our AI-powered portfolio 
                optimization system to enhance their investment strategies and decision-making process.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="mb-2 font-semibold text-[#4CAF50]">Results:</div>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Portfolio performance improved by 12.8%
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Analysis time reduced from days to hours
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Client satisfaction scores increased by 22%
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 mr-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="text-2xl text-purple-500">💳</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">International Payment Processor</h3>
              </div>
              <p className="mb-6 text-gray-600">
                A global payment processing company integrated our AI fraud detection system to 
                identify and prevent fraudulent transactions across their network in real-time.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="mb-2 font-semibold text-[#4CAF50]">Results:</div>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Fraud detection accuracy increased to 99.3%
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    False positives reduced by 83%
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#4CAF50]">✓</span>
                    Annual fraud losses reduced by $12.4 million
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mx-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#4CAF50]">
            Our Implementation Approach
          </h2>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#4CAF50] transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {/* Step 1 */}
              <div className="relative md:text-right">
                <div className="hidden md:block absolute top-6 -right-6 w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-xl font-bold z-10">
                  1
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md md:mr-12">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Assessment & Strategy</h3>
                  <p className="text-gray-600">
                    We analyze your current financial processes, identify automation opportunities, 
                    and develop a tailored AI integration strategy aligned with your business goals.
                  </p>
                </div>
              </div>
              
              {/* Empty div for spacing */}
              <div className="hidden md:block"></div>
              
              {/* Empty div for spacing */}
              <div className="hidden md:block"></div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="hidden md:block absolute top-6 -left-6 w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-xl font-bold z-10">
                  2
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md md:ml-12">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Solution Design</h3>
                  <p className="text-gray-600">
                    Our AI engineers design a custom solution architecture that integrates seamlessly 
                    with your existing systems and meets your specific financial requirements.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative md:text-right">
                <div className="hidden md:block absolute top-6 -right-6 w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-xl font-bold z-10">
                  3
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md md:mr-12">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Development & Training</h3>
                  <p className="text-gray-600">
                    We develop the AI solution and train the algorithms using your historical data 
                    to ensure optimal performance and accuracy for your specific use cases.
                  </p>
                </div>
              </div>
              
              {/* Empty div for spacing */}
              <div className="hidden md:block"></div>
              
              {/* Empty div for spacing */}
              <div className="hidden md:block"></div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="hidden md:block absolute top-6 -left-6 w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-xl font-bold z-10">
                  4
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md md:ml-12">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Implementation & Integration</h3>
                  <p className="text-gray-600">
                    We deploy the AI solution into your environment, integrating it with your existing 
                    financial systems and ensuring smooth data flow and operation.
                  </p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative md:text-right">
                <div className="hidden md:block absolute top-6 -right-6 w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-xl font-bold z-10">
                  5
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md md:mr-12">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Monitoring & Optimization</h3>
                  <p className="text-gray-600">
                    Our team continuously monitors the AI system's performance, fine-tunes algorithms, 
                    and implements improvements to maximize your ROI and efficiency gains.
                  </p>
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
            Ready to Transform Your Financial Operations with AI?
          </h2>
          <p className="mb-8 text-lg">
            Join Crown Bankers in leveraging cutting-edge artificial intelligence to revolutionize your 
            financial processes, enhance decision-making, and drive exceptional business results.
          </p>
          <button className="px-8 py-3 text-lg font-semibold text-[#4CAF50] bg-white rounded-md hover:bg-gray-100 transition duration-300">
            Schedule an AI Consultation
          </button>
        </div>
      </section>

      <Footer_05 />
    </div>
  );
};

export default AiFinance; 