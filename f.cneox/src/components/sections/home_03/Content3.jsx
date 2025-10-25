const Content3 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Solar Energy
                </div>
                <h1 className="font-raleway text-6xl">
                  Invest in the Future of Solar Energy with Crown bankers
                </h1>
                <div className="flex mt-2 flex-col md:flex-row gap-4">
                  <img
                    src="assets/img/plan/nature.png"
                    alt="hero-img"
                    className="relative h-auto w-full"
                  />
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                    The sun shines bright, not only in the sky but also in the
                    world of renewable energy. Solar panel technology is
                    experiencing a surge in demand, driven by growing
                    environmental concerns and the increasing affordability of
                    solar installations. At our company, we believe in the power
                    of the sun and are here to help you capitalize on this
                    exciting opportunity by investing in the future of solar
                    energy.
                  </p>
                </div>
              </div>
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/roof.png"
                  alt="hero-img"
                  className="relative h-auto w-full"
                />
                <h1 className="font-raleway mt-2 text-4xl">
                  Why Solar? A Brighter Tomorrow Starts Here
                </h1>{" "}
                <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                  Solar energy is a clean, renewable resource with immense
                  potential to power our homes, businesses, and entire
                  communities. As the world transitions towards a more
                  sustainable future, the demand for solar energy is expected to
                  skyrocket. The global solar energy market is projected to
                  reach a staggering $1.3 trillion by 2027 [Source: Grand View
                  Research]. By investing in solar panel technology, you're not
                  just investing in a company; you're investing in a cleaner,
                  more sustainable future for generations to come
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content3;
