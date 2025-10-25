const Content_01 = () => {
  return (
    <>
      {/*...::: Content Section Start_1 :::... */}
      <section id="content-section-1">
        {/* Section Spacer */}
        <div className="pb-20 xl:pb-[150px]">
          {/* Section Container */}
          <div className="global-container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32">
              {/* Content Left Block */}
              <div
                className="jos order-2 overflow-hidden rounded-md md:order-1"
                data-jos_animation="fade-left"
              >
                <img
                  src="assets/img/th-1/Offering-Premier-Consulting-&-Finance-Services-with-Crown-Bankers..png"
                  alt="content-image-1"
                  width="526"
                  height="450"
                  className="h-auto w-full"
                />
              </div>
              {/* Content Left Block */}
              {/* Content Right Block */}
              <div
                className="jos order-1 md:order-2"
                data-jos_animation="fade-right"
              >
                {/* Section Content Block */}
                <div className="mb-6">
                  <h3 style={{ fontSize: "35px" }}>
                    Offering Premier Consulting & Finance Services with Crown
                    Bankers.
                  </h3>
                </div>
                {/* Section Content Block */}
                <div className="text-lg leading-[1.4] lg:text-[21px]">
                  <p className="mb-7 last:mb-0">
                    At Crown Bankers, we invest in the future by focusing on
                    high-growth sectors like EV, cryptocurrency, solar energy,
                    and Forbes Top 500 companies. With a market projected to
                    reach $1.8 trillion by 2030, EVs lead the charge towards
                    clean transportation. Cryptocurrencies like Bitcoin and
                    Ethereum harness blockchain's disruptive power for finance.
                    Our experts simplify solar investments by diversifying
                    portfolios in promising companies. Additionally, we leverage
                    our expertise to invest in Forbes Top 500 companies,
                    maximizing returns through market analysis and exclusive
                    deals. Invest with Crown Bankers and be part of the
                    innovation driving tomorrow's economy.
                  </p>
                </div>
              </div>
              {/* Content Right Block */}
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </section>
      {/*...::: Content Section End_1 :::... */}
    </>
  );
};

export default Content_01;
