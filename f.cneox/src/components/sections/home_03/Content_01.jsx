const Content_01 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Electronic vehicles
                </div>
                <h1 className="font-raleway text-6xl">
                  Navigating the EV Landscape: We Take the Wheel
                </h1>
                <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                  Investing in the EV sector can be complex. But with our
                  Platform, you don't have to be an automotive expert. Our team
                  of financial professionals conducts thorough research to
                  identify promising EV companies across the industry. We invest
                  in established car manufacturers like Tesla and General Motors
                  who are electrifying their fleets, as well as innovative
                  battery technology companies and charging infrastructure
                  providers that are powering the EV ecosystem.
                </p>
              </div>
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/car.png"
                  alt="hero-img"
                  className="relative h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content_01;
