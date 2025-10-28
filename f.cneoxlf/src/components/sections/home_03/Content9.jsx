const Content9 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Income Stream
                </div>
                <h1 className="font-raleway text-6xl">Returns on</h1>
                <h1 className="font-raleway text-6xl text-colorOrangyRed">
                  Investment (ROI)
                </h1>
                <div className="flex mt-2 flex-row gap-4">
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                    Our service offers three investment packages - Solar Starter
                    Package, Power Growth, Elite Energy - each with varying
                    investment ranges, return rates, and durations. Investors
                    receive returns ranging from 1.5% to 2.4% over periods of
                    130 to 150 days. The principle is partially returned, with
                    higher-return packages providing a full return of the
                    initial investment. This income stream allows investors to
                    grow their wealth steadily, offering flexibility and
                    transparency in alignment with Our company commitment to
                    financial innovation and strategic investment in the digital
                    landscape
                  </p>
                </div>
              </div>
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/9.png"
                  alt="hero-img"
                  className="relative h-auto w-full"
                />
              </div>
            </div>
            {/* <img src="assets/img/th-1/table1.png" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content9;
