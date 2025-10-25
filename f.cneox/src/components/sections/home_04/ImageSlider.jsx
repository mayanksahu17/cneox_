import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const iconData = [
  {
    src: "assets/img/th-1/icon/1.png",
    alt: "brand-1",
    width: 180,
    height: 20,
    extraClass: "",
  },
  {
    src: "assets/img/th-1/icon/2.png",
    alt: "brand-2",
    width: 180,
    height: 20,
    extraClass: "",
  },
  {
    src: "assets/img/th-1/icon/3.png",
    alt: "brand-3",
    width: 180,
    height: 20,
    extraClass: "",
  },
  {
    src: "assets/img/th-1/icon/4.png",
    alt: "brand-4",
    width: 180,
    height: 20,
    extraClass: "",
  },
  {
    src: "assets/img/th-1/icon/5.png",
    alt: "brand-5",
    width: 180,
    height: 20,
    extraClass: "",
  },
  {
    src: "assets/img/th-1/icon/6.png",
    alt: "brand-6",
    width: 180,
    height: 20,
    extraClass: "",
  },
];
const ImageSlider = () => {
  return (
    <div className="">
      <div className="">
        <div className="jos brand-slider" data-jos_animation="fade">
          <div className="jos mx-auto m-12 text-center lg:mb-16 pt-4 w-full ">
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
              {iconData.map((icon, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    width={icon.width}
                    height={icon.height}
                    className={`max-w-full ${icon.extraClass}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="bg-colorBlack">
        <div className="jos mx-auto mb-12 max-w-[715px] text-center lg:mb-16 pt-4 ">
          <p className="text-lg md:text-2xl text-white">
            Crown Bankers: Officially Partnered with Visa, Mastercard, Binance,
            and Alchemy Pay.
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
                src="assets/img/th-1/binance.png"
                alt="brand-3"
                width="172"
                height="30"
                className="max-w-full mt-[-50px]"
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
                src="assets/img/th-1/binance.png"
                alt="brand-2"
                width="183"
                height="35"
                className="max-w-full mt-[-50px]"
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
    </div>
  );
};

export default ImageSlider;
