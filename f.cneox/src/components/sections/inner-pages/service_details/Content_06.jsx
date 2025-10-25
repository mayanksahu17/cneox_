const Content_06 = () => {
  return (
    <section id="content-section-1">
      {/* Section Spacer */}
      <div className="pb-20 xl:pb-[150px]">
        {/* Section Container */}
        <div className="global-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28">
            {/* Content Left Block */}
            <div
              className="jos order-2 overflow-hidden rounded-md"
              data-jos_animation="fade-left"
            >
              <img
                src="assets/img/th-1/24.jpg"
                alt="content-image-2"
                className="h-auto w-full"
              />
            </div>
            {/* Content Left Block */}
            {/* Content Right Block */}
            <div className="jos order-1" data-jos_animation="fade-right">
              {/* Section Content Block */}
              {/* Section Content Block */}

              <br />
              <br />
              <div>
                <h3 style={{ fontSize: "30px" }}>
                  Embracing Crypto: Crown Bankers' Strategic Approach
                </h3>
              </div>
              <br />
              <br />

              <p>
                At Crown Bankers, we integrate cryptocurrency investments
                alongside traditional ones. With meticulous research, we
                identify promising crypto assets to diversify portfolios and
                achieve high returns. From Bitcoin to DeFi projects, we navigate
                this frontier, aiming to harness blockchain's disruptive
                potential while offering innovative investment opportunities
              </p>

              <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2">
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/trending-up-icon.svg"
                      alt="trending-up-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h5>Comprehensive Research</h5>
                  <p className="text-lg">
                    We conduct thorough research to identify promising crypto
                    assets, ensuring informed investment decisions.{" "}
                  </p>
                </li>
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/cog-icon.svg"
                      alt="cog-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h5>Diversification</h5>
                  <p className="text-lg">
                    Crypto investments are integrated with traditional
                    portfolios to mitigate risk and maximize returns.
                  </p>
                </li>
              </ul>
              <br />
              <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2">
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/trending-up-icon.svg"
                      alt="trending-up-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h5>Innovation and Disruption</h5>
                  <p className="text-lg">
                    Investing in blockchain technology and DeFi projects to
                    capitalize on their transformative potential.
                  </p>
                </li>
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/cog-icon.svg"
                      alt="cog-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h5> High Returns</h5>
                  <p className="text-lg">
                    Aim to achieve high returns through strategic allocation and
                    proactive management in the crypto space.
                  </p>
                </li>
              </ul>
              <br />
              <h4>Explore Crypto Opportunities with Crown Bankers!</h4>
              <p className="text-lg">
                Join us to leverage the potential of cryptocurrency investments
                in your portfolio.
              </p>
            </div>
            {/* Content Right Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_06;
