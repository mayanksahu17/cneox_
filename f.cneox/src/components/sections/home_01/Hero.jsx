import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Hero = () => {
  return (
    <>
      {/*...::: Hero Section Start :::... */}
      <section id="section-hero">
        <div className="relative z-[1] overflow-hidden rounded-bl-[30px] rounded-br-[30px] bg-colorLinenRuffle pb-20 pt-28 lg:rounded-bl-[50px] lg:rounded-br-[50px] lg:pb-24 lg:pt-32 xl:pt-40 xxl:pb-[133px] xxl:pt-[195px]">
          <div className="global-container">
            <div className="mb-14 flex flex-col items-center text-center lg:mb-20">
              <h1 className="jos slide-from-bottom mb-6 max-w-[510px] lg:max-w-[768px] xl:max-w-[1076px]">
                THINK WEALTH, <br />
                THINK CROWN BANKERS
              </h1>
              <p className="jos slide-from-bottom mb-11 max-w-[700px] text-lg font-semibold sm:text-xl xl:max-w-[980px]">
                Welcome to Crown Bankers, your gateway to the best investing
                platform. Experience seamless transactions, robust returns, and
                personalized service for a rewarding and stress-free financial
                journey.
              </p>
              <div
                className="jos flex flex-wrap justify-center gap-6"
                data-jos_animation="fade"
              >
                <Link
                  to="/login"
                  className="button rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white"
                >
                  Login
                </Link>
              </div>
            </div>
            <div
              className="jos hero-img overflow-hidden rounded-2xl bg-black"
              data-jos_animation="zoom"
            >
              <img
                src="assets/img/th-1/hero-dashboard.png"
                alt="hero-dashboard"
                width="1296"
                height="640"
                className="h-auto w-full"
              />
            </div>

            <div className="my-10 h-[1px] w-full bg-[#DBD6CF] lg:my-16 xl:my-20"></div>
            <div className="jos mx-auto mb-12 max-w-[715px] text-center lg:mb-16">
              <p
                className="text-lg"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  lineHeight: "35px",
                }}
              >
                Crown Bankers: Officially Partnered with Visa, Mastercard,
                Binance, and Alchemy Pay.
              </p>
            </div>
            <div className="jos brand-slider" data-jos_animation="fade">
              <Swiper
                slidesPerView={2}
                spaceBetween={105}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
              >
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/Mastercard-Logo-2016-2020.png"
                    alt="brand-1"
                    width="180"
                    height="38"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/alchemy-pay.png"
                    alt="brand-2"
                    width="183"
                    height="35"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/binance.png"
                    alt="brand-3"
                    width="172"
                    height="50"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/Visa-Symbol.png"
                    alt="brand-4"
                    width="175"
                    height="30"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/Mastercard-Logo-2016-2020.png"
                    alt="brand-5"
                    width="168"
                    height="36"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/alchemy-pay.png"
                    alt="brand-1"
                    width="180"
                    height="38"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/binance.png"
                    alt="brand-2"
                    width="183"
                    height="35"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/Visa-Symbol.png"
                    alt="brand-3"
                    width="172"
                    height="35"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/Mastercard-Logo-2016-2020.png"
                    alt="brand-4"
                    width="175"
                    height="30"
                    className="max-w-full"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="assets/img/th-1/Visa-Symbol.png"
                    alt="brand-5"
                    width="168"
                    height="36"
                    className="max-w-full"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="orange-gradient-1 absolute -right-[150px] top-[370px] -z-[1] h-[500px] w-[500px] animate-spin rounded-[500px]"></div>

          <div className="orange-gradient-2 absolute right-[57px] top-[620px] -z-[1] h-[450px] w-[450px] animate-spin rounded-[450px]"></div>
        </div>
      </section>
      {/*...::: Hero Section End :::... */}
    </>
  );
};

export default Hero;
