const Content_02 = () => {
  return (
    <section id="content-section-2">
      {/* Section Spacer */}
      <div className="pb-20 xl:pb-[150px]">
        {/* Section Container */}
        <div className="global-container">
          {/* Section Content Block */}
          <div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
            <div className="mx-auto md:max-w-xl lg:max-w-4xl xl:max-w-[950px]">
              <h2>Extra Income Opportunities at Crown Bankers</h2>
            </div>
          </div>
          {/* Section Content Block */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,_1fr)_1.2fr] xl:gap-28 xxl:gap-32">
            {/* Content Left Block */}
            <div
              className="jos order-2 overflow-hidden rounded-md md:order-1"
              data-jos_animation="fade-left"
            >
              <img
                src="assets/img/th-1/refrral.png"
                alt="content-image-4"
                width={529}
                height={500}
                className="h-auto w-full"
              />
            </div>
            {/* Content Left Block */}
            {/* Content Right Block */}
            <div
              className="jos order-1 md:order-2"
              data-jos_animation="fade-right"
            >
              <ul className="flex flex-col gap-y-6">
                <li>
                  <h4 className="mb-[10px]">Referral bonus</h4>
                  <p className="mb-7 last:mb-0">
                    At Crown Bankers, we value the power of community and shared
                    success. Our Referral Bonus program is designed to reward
                    your efforts in bringing new investors into our network. By
                    referring others, you not only help them unlock financial
                    growth but also earn a bonus of 7% to 9% as a thank-you for
                    growing our investment family. Together, we can achieve
                    more!
                  </p>
                </li>
              </ul>
            </div>
            {/* Content Right Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>

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
                src="assets/img/th-1/binary.png"
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
              {/* Section Content Block */}

              <br />
              <br />
              <div>
                <h3 style={{ fontSize: "30px" }}>Binary bonus</h3>
              </div>
              <br />
              <br />

              <p>
                Binary Bonus at Crown bankers The Binary Bonus at our company a
                rewarding incentive designed for members who bring new investors
                into our dynamic investment ecosystem. This bonus operates on a
                binary structure, where each member possesses a left and a right
                leg. Payments are determined by the investment volume in each
                leg, encouraging a balanced and sustainable growth strategy
              </p>
              <p>
                Let's say an investor on the left side contributes $15,000, and
                another on the right side invests $20,000. The binary bonus is
                calculated based on the lesser leg volume, which is $15,000 in
                this case. Assuming a 10% binary bonus rate, the bonus earned
                would be $1,500 However, since there's a capping limit, let's
                say at $1,000, the actual bonus paid out would be $1,000,
                providing a streamlined and fair distribution of rewards.
              </p>
            </div>
            {/* Content Right Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>
      <div className="w-full flex items-center justify-center mb-20">
        <img src="assets/img/plan/11.2.png" alt="" className="" />
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_02;
