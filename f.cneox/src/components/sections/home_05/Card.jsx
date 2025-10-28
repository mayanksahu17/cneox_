import { ArrowRight } from "lucide-react";

export default function SolarEnergycards() {
  return (
    <div className="w-full px-4 py-8 md:px-24 md:py-16 bg-black text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Left main panel */}
          <div className="bg-yellow-500 rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold text-black">
                Driving The Future Of Solar Energy
              </h2>
              <p className="font-medium text-black/80">
                With over 7 years of expertise, we are at the forefront of solar
                innovation and sustainable energy solutions, ensuring a greener
                and brighter future for all.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 z-0 opacity-20 text-black/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M4 6v10" />
                <path d="M20 6v10" />
                <path d="M12 3v18" />
                <path d="M10 6h8" />
                <path d="M8 12h8" />
                <path d="M6 18h12" />
              </svg>
            </div>
          </div>

          {/* Right 3 panels */}
          {[
            {
              title: "Strategic Innovation",
              desc: "Our state-of-the-art facilities adhere to the highest security and quality standards, ensuring certified and efficient solar energy production.",
            },
            {
              title: "Recognized Excellence",
              desc: "We take pride in our award-winning approach to renewable energy—navigating complex global supply chains while overcoming challenges to deliver unparalleled solutions.",
            },
            {
              title: "Precision & Reliability",
              desc: "Leveraging cutting-edge technology and decades of expertise, we ensure highly accurate solar energy solutions through advanced testing and rigorous quality control.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-black rounded-xl p-8 flex flex-col justify-between border-2 border-yellow-500 hover:bg-yellow-500 group transition-all duration-300"
            >
              <div>
                <label className="block mb-4 text-xl font-semibold text-yellow-500 group-hover:text-black">
                  {card.title}
                </label>
                <p className="text-white/80 group-hover:text-black/80">
                  {card.desc}
                </p>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full group-hover:bg-black transition-colors">
                  <ArrowRight className="w-5 h-5 text-black group-hover:text-yellow-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
