const Content1 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        {/* Section Spacer */}
        <div className="py-20 xl:py-[130px]">
          {/* Section Container */}
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  About us
                </div>
                <h1 className="font-raleway text-6xl">Know about</h1>
                <h1 className="font-raleway text-6xl">
                  <span className="text-colorOrangyRed">Crown</span> Bankers
                </h1>
              </div>

              <div className="jos" data-jos_animation="fade-right">
                {/* Section Content Block */}

                {/* Section Content Block */}
                <div className="">
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl">
                    Crown bankers, the financial stewards of the ultra-wealthy,
                    navigate a diverse investment landscape. From harnessing the
                    sun's power with solar energy to riding the wave of the EV
                    revolution, we seek stability in established giants like the
                    Forbes 500 and capitalize on transformative trends like
                    cloud computing. Real estate remains a cornerstone, offering
                    reliable income streams and long-term growth potential. By
                    understanding these strategies, individuals can gain
                    valuable insights for their own portfolios, remembering that
                    diversification and professional guidance are key to
                    navigating the complexities of the market.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </div>
    </section>
  );
};

export default Content1;
