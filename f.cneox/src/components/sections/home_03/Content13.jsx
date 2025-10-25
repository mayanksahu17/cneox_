const Content13 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Virtual Card
                </div>
                <h1 className="font-raleway text-6xl">Virtual Card</h1>
                <div className="flex mt-2 flex-row gap-4">
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                    For purchases online. Instantly create your card and enjoy
                    secure and hassle free shopping with the virtual card. A
                    virtual card will be given to users who activate a single
                    package of $1,000 or more.
                  </p>
                </div>
              </div>
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/13.png"
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

export default Content13;
