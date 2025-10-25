const Content_01 = () => {
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
                src="assets/img/th-1/21.jpg"
                alt="content-image-2"
                width={526}
                height={450}
                className="h-auto w-full"
              />
            </div>
            {/* Content Left Block */}
            {/* Content Right Block */}
            <div className="jos order-1" data-jos_animation="fade-right">
              {/* Section Content Block */}
              <div className="mb-6">
                <h2> Ride the Wave to Financial Freedom with Crown Bankers</h2>
              </div>
              {/* Section Content Block */}
              <div className="text-lg leading-[1.4] lg:text-[21px]">
                <p className="mb-7 last:mb-0">
                  At Crown bankers, we're dedicated to helping you capitalize on
                  the most exciting investment opportunities in today's market.
                  Our platform simplifies investing in high-growth sectors,
                  ensuring your portfolio benefits from cutting-edge
                  advancements. Explore the sectors we focus on.
                </p>
              </div>
              <br />
              <br />
              <div>
                <h3 style={{ fontSize: "30px" }}>
                  Why Invest in the Solar Sector with Crown Bankers
                </h3>
              </div>
              <br />
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

                  <h5>High Growth Potential</h5>
                  <p className="text-lg">
                    The global solar energy market is projected to reach $1.3
                    trillion by 2027, driven by growing environmental concerns
                    and the affordability of solar installations.
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
                  <h5>Sustainable Future</h5>
                  <p className="text-lg">
                    Solar energy is a clean, renewable resource with immense
                    potential to power homes, businesses, and communities,
                    contributing to a more sustainable future for generations.
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

                  <h5>Technological Advancements</h5>
                  <p className="text-lg">
                    We invest in companies at the forefront of solar technology,
                    including high-efficiency solar panels and innovative
                    solutions for installation, operation, and maintenance.
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
                  <h5>Expert Guidance</h5>
                  <p className="text-lg">
                    Crown Bankers' dedicated professionals meticulously research
                    and diversify portfolios in promising solar companies,
                    ensuring informed and profitable investments without needing
                    to be a solar expert.
                  </p>
                </li>
              </ul>
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

export default Content_01;
