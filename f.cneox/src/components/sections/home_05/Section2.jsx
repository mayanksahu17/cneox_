import { ArrowRight } from "lucide-react";
import WhiteRoundButton from "../../navbar/WhiteRoundButton";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const services = [
  {
    title: "EV Infrastructure & Mobility Innovation",
    description:
      "Explore advancements in electric vehicle technology, smart mobility systems, and sustainable transportation infrastructure shaping the future of mobility.",
    icon: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
    alt: "Electric Vehicle Icon",
    link: "/services/ev-investments",
    attribution: "https://www.flaticon.com/free-icons/electric-car",
  },
  {
    title: "Strategic Wealth Structuring",
    description:
      "Tailored financial structuring and advisory services designed to support long-term goals, estate planning, and portfolio alignment with evolving needs.",
    icon: "https://cdn-icons-png.flaticon.com/512/2300/2300424.png",
    alt: "Wealth Management Icon",
    link: "/services/wealth-management",
    attribution: "https://www.flaticon.com/free-icons/wealth-management",
  },
  {
    title: "Crypto & Blockchain Innovation",
    description:
      "Discover secure and transparent blockchain frameworks and explore digital asset strategies for navigating the evolving landscape of decentralized finance.",
    icon: "https://cdn-icons-png.flaticon.com/512/2152/2152349.png",
    alt: "Blockchain Icon",
    link: "/services/crypto-blockchain",
    attribution: "https://www.flaticon.com/free-icons/blockchain",
  },
  {
    title: "Solar & Clean Energy Solutions",
    description:
      "Engage with cutting-edge developments in solar energy systems and technologies driving the transition to a cleaner, more resilient energy future.",
    icon: "https://cdn-icons-png.flaticon.com/512/5341/5341450.png",
    alt: "Solar Energy Icon",
    link: "/services/solar-energy",
    attribution: "https://www.flaticon.com/free-icons/solar-panel",
  },
  {
    title: "AI-Driven Financial Transformation",
    description:
      "Leverage artificial intelligence to enhance financial workflows, streamline operations, and enable data-driven decision-making across financial services.",
    icon: "https://cdn-icons-png.flaticon.com/512/3081/3081478.png",
    alt: "AI Robot Icon",
    link: "/services/ai-finance",
    attribution: "https://www.flaticon.com/free-icons/artificial-intelligence",
  },
];


// Clone the services list to simulate an infinite loop
const loopedServices = [...services, ...services];

const BankingInvestmentSection = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    const scrollSpeed = 1; // pixels per step
    const scrollDelay = 20; // ms per step

    if (scrollContainer) {
      scrollInterval = setInterval(() => {
        // Move scroll position forward
        scrollContainer.scrollLeft += scrollSpeed;

        // When we reach halfway, reset back to the start seamlessly
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }, scrollDelay);
    }

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="px-6 py-12 bg-white md:px-24">
      <h3 className="text-[#4CAF50] text-5xl font-bold">
        Fostering The Growth Of Financial Innovation
      </h3>
      <h2 className="mt-2 text-3xl font-semibold text-gray-900 md:text-3xl">
        A Leading Provider Of Banking & Investment Solutions
      </h2>
      <p className="max-w-3xl mt-4 text-gray-600">
        Crown Bankers is focused on delivering modern financial solutions that
        reduce operational costs, enhance banking efficiency, and improve the
        overall financial ecosystem.
      </p>

      <div className="flex gap-4 mt-6 place-items-end">
        <Link to="/login">
          <WhiteRoundButton className="" text="Get Started ->" />
        </Link>
      </div>

      {/* Looping horizontal scroll */}
      <div
        className="mt-10 overflow-x-auto scrollbar-hide"
        ref={scrollRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="flex space-x-6 px-2 md:px-0">
          {loopedServices.map((service, index) => (
            <div
            key={index}
            className="min-w-[300px] max-w-sm flex-shrink-0 bg-green-50 shadow-xl p-6 rounded-lg text-center border-4 border-[#4CAF50] hover:bg-[#4CAF50] group transition-all duration-300 flex flex-col justify-between h-[360px]"
          >
            <div>
              <div className="mb-3 flex justify-center items-center h-16">
                <img 
                  src={service.icon} 
                  alt={service.alt} 
                  className="h-12 w-auto object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300" 
                />
              </div>
              <h4
                  className="text-lg font-semibold text-gray-900 group-hover:text-white leading-snug"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />

              <p className="mt-2 text-sm text-gray-500 group-hover:text-white whitespace-normal break-words leading-relaxed">
                {service.description}
              </p>

            </div>
            <Link
              to={service.link}
              className="flex items-center justify-center mt-4 font-semibold text-green-600 group-hover:text-white"
            >
              <span>Explore More</span>
              <ArrowRight className="ml-1" />
            </Link>
          </div>
          
          ))}
        </div>
      </div>
      {/* Attribution notice at the bottom */}
      <div className="mt-8 text-xs text-gray-400 text-center">
        <p>Icons provided by <a href="https://www.flaticon.com/" className="underline hover:text-gray-600">Flaticon</a></p>
      </div>
    </div>
  );
};

export default BankingInvestmentSection;
