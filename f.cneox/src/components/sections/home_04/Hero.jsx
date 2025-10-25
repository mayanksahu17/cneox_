import { Link } from "react-router-dom";

const Hero = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section id="hero-section">
      <div className="relative z-[1] overflow-hidden text-white">
        {/* Section Spacer */}
        <div className="bg-[url('/assets/img/th-1/5.png')] bg-cover bg-no-repeat pb-20 pt-28 md:pb-[265px] md:pt-40 lg:pt-44 xl:pt-[224px]">
          {/* Section Container */}
          <div className="global-container">
            <h2 className="text-colorBlue text-4xl mb-2">
              About Crown Bankers
            </h2>

            <h1 className="jos mb-6 font-spaceGrotesk text-3xl md:text-6xl text-left text-white">
              We Are Experts In <br />
              The World Of Solar <br />& Renewable Energy
            </h1>
            <div className=" ">
              <p className="leading-[1.33] lg:text-xl xl:text-2xl text-left md:max-w-[60%]">
                Harness the power of the sun with our expertise. At Crown
                Bankers, we lead the way in solar and renewable energy,
                providing innovative solutions for a sustainable future.
              </p>
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Background Gradient */}
        <div className="absolute left-1/2 top-[80%] -z-[1] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#39FF14] to-[#37ff1467] blur-[250px]"></div>
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Hero;
