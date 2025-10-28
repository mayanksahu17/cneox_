const Content_02 = () => {
  return (
    <section id="section-content-2">
      <div className="bg-colorBlack text-white">
        {/* Section Spacer */}
        <div className="py-20 xl:py-[130px]">
          {/* Section Container */}
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[1.3fr_minmax(0,_1fr)] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos order-2" data-jos_animation="fade-left">
                <div className="overflow-hidden rounded-[10px]">
                  <img
                    src="assets/img/th-3/content-img-2.jpg"
                    alt="content-img-2"
                    width={526}
                    height={550}
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <div className="jos order-1" data-jos_animation="fade-right">
                {/* Section Content Block */}
                <div className="mb-6">
                  <h2 className="font-raleway text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[80px]">
                    AI is reshaping all future-proofing work activities
                  </h2>
                </div>
                {/* Section Content Block */}
                <div className="">
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl">
                    AI is indeed reshaping &amp; future-proofing work
                    activities. AI is playing a crucial role in automating
                    decision-making.
                  </p>
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl">
                    <span className="font-semibold text-[#381FD1]">
                      Adaptive Workforces:
                    </span>
                    Adapt to changing market conditions by providing insights
                    into workforce needs and skill gaps.
                  </p>
                  <p className="mb-8 text-lg leading-[1.33] last:mb-0 lg:text-xl xl:text-2xl">
                    <span className="font-semibold text-[#381FD1]">
                      Learning and Development:
                    </span>
                    AI-powered platforms offer personalized learning experiences
                    and skill development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </div>
    </section>
  );
};

export default Content_02;
