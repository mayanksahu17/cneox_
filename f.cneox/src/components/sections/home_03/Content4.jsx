import { Link } from "react-router-dom";

const Content4 = () => {
  return (
    <section id="section-working-process">
      <div className="bg-colorBlack text-white px-5 sm:px-[50px]">
        <div className="relative z-[1] mx-auto max-w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
                <div className="jos" data-jos_animation="fade-left">
                  <div className="mb-4">
                    <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                    SOLAR ENERGY
                  </div>
                  <div className="font-raleway text-2xl text-white">
                    Navigating the Solar Landscape: We're Your Guiding Light
                  </div>
                  <div className="flex flex-row justify-between items-center w-full gap-4 mt-4">
                    <div className=" text-white">
                      The solar industry can seem complex, but with Crown
                      Bankers, you don't need to be a solar expert to
                      participate. Our team of dedicated professionals, with a
                      deep understanding of the solar market, meticulously
                      researches and invests in a diversified portfolio of
                      promising companies across the industry. We focus on
                      companies at the forefront of technological advancements,
                      developing and producing high-efficiency solar panels;
                      businesses specializing in the installation, operation,
                      and maintenance of solar energy systems for homes and
                      businesses; and companies that design, finance, and build
                      large-scale solar power plants, contributing to the
                      expansion of solar energy infrastructure.
                    </div>
                  </div>
                </div>

                <div className="jos" data-jos_animation="fade-right">
                  {/* Section Content Block */}

                  {/* Section Content Block */}
                  <div className="">
                    <img
                      src="assets/img/plan/workers.png"
                      alt="hero-img"
                      className="relative h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content4;
