const Content11 = () => {
  return (
    <section id="section-content-1">
      <div className="bg-colorBlack text-white">
        <div className="py-20 xl:py-[130px]">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-right">
                <img
                  src="assets/img/plan/11.1.png"
                  alt="hero-img"
                  className="relative h-auto w-full"
                />
              </div>
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Binary Bonus
                </div>
                <h1 className="text-colorOrangyRed font-raleway text-6xl">
                  Binary Bonus
                </h1>
                <h1 className="font-raleway text-6xl">at Crown bankers</h1>
                <div className="flex mt-2 flex-row gap-4">
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 mt-4">
                    The Binary Bonus at our company a rewarding incentive
                    designed for members who bring new investors into our
                    dynamic investment ecosystem. This bonus operates on a
                    binary structure, where each member possesses a left and a
                    right leg. Payments are determined by the investment volume
                    in each leg, encouraging a balanced and sustainable growth
                    strategy Let's say an investor on the left side contributes
                    $15,000, and another on the right side invests $20,000. The
                    binary bonus is calculated based on the lesser leg volume,
                    which is $15,000 in this case. Assuming a 10% binary bonus
                    rate, the bonus earned would be $1,500 However, since
                    there's a capping limit, let's say at $1,000, the actual
                    bonus paid out would be $1,000, providing a streamlined and
                    fair distribution of rewards.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="assets/img/plan/11.2.png"
              alt="hero-img"
              className="relative h-full w-full mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content11;
