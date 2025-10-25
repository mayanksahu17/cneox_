import { Link } from "react-router-dom";

const Working = () => {
  return (
    <section id="section-working-process">
      <div className="bg-colorBlack px-5 sm:px-[50px]">
        <div className="relative z-[1] mx-auto max-w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
                <div className="jos" data-jos_animation="fade-left">
                  <div className=" mb-4 text-white">
                    <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                    Electronic vehicles
                  </div>
                  <div className="font-raleway text-2xl text-white">
                    Charge up your portfolio: How our platform van plug you into
                    the Electrifying EV Revolution
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-centerw-full gap-4">
                    <img
                      src="assets/img/plan/working.png"
                      alt="hero-img"
                      className="relative h-auto w-full"
                    />
                    <div className=" text-white">
                      The electric vehicle (EV) revolution is sparking a
                      transformation in transportation, and it's creating a
                      wealth of opportunities for forward-thinking investors. At
                      our Platform, we're here to help you jumpstart your
                      portfolio and become a part of this exciting future.
                    </div>
                  </div>
                </div>

                <div className="jos" data-jos_animation="fade-right">
                  {/* Section Content Block */}

                  {/* Section Content Block */}
                  <div className="">
                    <img
                      src="assets/img/plan/ev.png"
                      alt="hero-img"
                      className="relative h-auto w-full"
                    />
                    <div className="font-raleway text-2xl text-white mt-2">
                      Why EVs? Buckle Up for a Charged-Up Ride
                    </div>
                    <p className="mb-8  text-white  mt-2">
                      The world is shifting towards cleaner transportation
                      solutions, and EVs are leading the charge. Government
                      incentives, falling battery costs, and rising consumer
                      demand are all accelerating EV adoption. In fact, the
                      global EV market is expected to reach a staggering $1.8
                      trillion by 2030 [Source: Market Research Future]. This
                      unprecedented growth presents a compelling investment
                      opportunity you won't want to miss.
                    </p>
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

export default Working;
