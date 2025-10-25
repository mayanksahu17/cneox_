const Content10 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Referral Bonus
                </div>
                <div className="flex mt-2 flex-row gap-4">
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                    At Crown Bankers, we value the power of community and shared
                    success. Our Referral Bonus program is designed to reward
                    your efforts in bringing new investors into our network. By
                    referring others, you not only help them unlock financial
                    growth but also earn a bonus of 7% to 9% as a thank-you for
                    growing our investment family. Together, we can achieve
                    more!
                  </p>
                </div>
              </div>
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/10.png"
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

export default Content10;
