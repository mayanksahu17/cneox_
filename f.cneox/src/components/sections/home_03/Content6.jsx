const Content6 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  FORBES 500
                </div>
                <h1 className="font-raleway text-6xl">
                  Forbes Top 500 Companies
                </h1>
                <div className="flex mt-2 flex-col md:flex-row gap-4">
                  <img
                    src="assets/img/plan/nature.png"
                    alt="hero-img"
                    className="relative h-auto w-full"
                  />
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                    Crown Bankers strategically invests in the Forbes Global
                    500, encompassing industry leaders such as Apple, Amazon,
                    and Microsoft. This selection represents a significant
                    portion of the global economy, with the Forbes 500
                    collectively generating trillions in revenue annually. By
                    blending innovation from burgeoning sectors with the
                    stability of established titans, we ensure sustained success
                    and risk mitigation for our investors. This approach not
                    only leverages the vast market size of the Forbes 500 but
                    also positions our portfolio to capitalize on diverse market
                    trends, providing a balanced and rewarding investment
                    landscape for our clients.
                  </p>
                </div>
              </div>
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/6.png"
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

export default Content6;
