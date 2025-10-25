const Content_02 = () => {
  return (
    <section id="section-content-2">
      {/* Section Spacer */}
      <div className="py-20 xl:py-[130px]">
        {/* Section Container */}
        <div className="global-container">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_minmax(0,_1fr)] lg:gap-[60px] xl:gap-x-[110px]">
            <div className="jos order-2" data-jos_animation="fade-left">
              <video autoPlay loop muted className="relative w-full h-full">
                <source src="/assets/img/th-1/cc.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="jos order-1" data-jos_animation="fade-right">
              {/* Section Content Block */}
              <div className="mb-6">
                <h2 className="text-colorBlue text-4xl mb-2">Crypto card</h2>

                <h2 className="font-spaceGrotesk text-4xl font-medium leading-[1.06] -tracking-[2px] text-white sm:text-[44px] lg:text-[56px] xl:text-[70px]">
                  Crown Bankers Crypto card
                </h2>
              </div>
              {/* Section Content Block */}
              <div className="">
                <p className="mb-8 text-lg leading-[1.42] last:mb-0 lg:text-[21px]">
                  Unlock the power of your crypto assets with Crown Bankers!
                  Choose our Virtual Card for seamless online purchases or the
                  Physical Card for global spending flexibility. Activate a
                  package of $1,000 for the Virtual Card or $20,000 for the
                  Physical Card and experience effortless, secure transactions
                  anytime, anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_02;
