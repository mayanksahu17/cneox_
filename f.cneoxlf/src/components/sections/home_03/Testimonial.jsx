const Testimonial = () => {
  return (
    <section id="testimonial-section">
      <div className="bg-colorBlack text-white px-5 sm:px-[50px]">
        <div className="relative z-[1] mx-auto max-w-full rounded-[20px] bg-[#381FD1]">
          {/* Section Spacer */}
          <div className="py-16 sm:px-10 md:px-20 lg:py-20 xl:px-[100px] xl:py-[130px]">
            {/* Section Container */}
            <div className="global-container">
              {/* Section Content Block */}
              <div className="jos mb-10 md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[677px]">
                <h2 className="font-raleway text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[80px]">
                  Our clients share their experiences
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Testimonial  List */}
              <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                {/* Testimonial Item */}
                <li
                  className="jos flex flex-col gap-y-6 text-white md:gap-y-[30px]"
                  data-jos_delay="0.1"
                >
                  <div className="h-auto w-[146px]">
                    <img
                      src="assets/img/th-3/review-star.svg"
                      alt="review-star"
                      width={146}
                      height={24}
                    />
                  </div>
                  <p className="font-raleway text-lg font-bold leading-[1.33] lg:text-xl xl:text-2xl xxl:text-3xl">
                    "I can't believe the difference AI has made for our
                    marketing efforts and Thanks to AI-powered analytics and 30%
                    increase in conversion rates. Highly recommended!"
                  </p>
                  <div className="text-[21px] font-semibold leading-[1.42]">
                    -Jack Liamba
                    <span className="mt-[5px] block text-lg font-normal leading-[1.66]">
                      Marketing Manager
                    </span>
                  </div>
                </li>
                {/* Testimonial Item */}
                {/* Testimonial Item */}
                <li
                  className="jos flex flex-col gap-y-6 text-white md:gap-y-[30px]"
                  data-jos_delay="0.2"
                >
                  <div className="h-auto w-[146px]">
                    <img
                      src="assets/img/th-3/review-star.svg"
                      alt="review-star"
                      width={146}
                      height={24}
                    />
                  </div>
                  <p className="font-raleway text-lg font-bold leading-[1.33] lg:text-xl xl:text-2xl xxl:text-3xl">
                    "Our supply chain has never run smoother since we
                    implemented AI-driven logistics, and we've eliminated costly
                    delays. AI has truly future-proofed our operations."
                  </p>
                  <div className="text-[21px] font-semibold leading-[1.42]">
                    -Sarah Milan
                    <span className="mt-[5px] block text-lg font-normal leading-[1.66]">
                      Supply Chain Director
                    </span>
                  </div>
                </li>
                {/* Testimonial Item */}
              </ul>
              {/* Testimonial List */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 -z-[1] flex h-full w-full justify-evenly">
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
            <div className="h-full w-[1px] bg-[#F6F6EB1A] bg-opacity-10" />
          </div>
          {/* Vertical Line */}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
