import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';

const Testimonial = () => {
  const swiperRef = useRef(null);
  return (
    <section id='testimonial-section'>
      {/* Section Spacer */}
      <div className='py-20 xl:py-[130px]'>
        {/* Section Container */}
        <div className='global-container'>
          {/* Section Content Block */}
          <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]'>
            <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
              Check user reviews using our AI chatbot
            </h2>
          </div>
          {/* Section Content Block */}

          {/* Testimonial Carousel */}
          <Swiper
            modules={[Navigation]}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className='jos testimonial-slider relative z-[1]'
          >
            <SwiperSlide>
              <div className='flex flex-col gap-x-16 md:flex-row lg:gap-x-28 items-center xxl:items-baseline xl:gap-x-[134px]'>
                <div className='h-auto w-[300px] self-center overflow-hidden rounded-[10px] lg:w-[375px] xl:h-[494px] xl:w-[526px]'>
                  <img
                    src='assets/img/th-2/testimonial-user-img-1.jpg'
                    alt='testimonial-img-1'
                    width={526}
                    height={494}
                    className='h-full w-full object-cover'
                    loading='lazy'
                  />
                </div>
                <div className='mt-[30px] flex-1 text-center md:text-left'>
                  <div className='mb-5 font-clashDisplay text-2xl font-medium leading-[1.28] tracking-[1px] lg:mb-9 lg:text-[28px]'>
                    “Easy to use AI Chatbot with many options”
                  </div>
                  <p className='mb-9 leading-[1.33] lg:mb-[50px] lg:text-lg xl:text-2xl'>
                    I have been using AI chatbots for several chatbots for the
                    past year. I learned quickly and exploring the tool, &amp;
                    asking questions to Slack support. The tool is very easy
                    user-friendly and the support group helps quickly and
                    thoroughly. Keep up the good work!
                  </p>
                  <div className='text-[21px] font-semibold leading-[1.42]'>
                    -Henry Fayol
                    <span className='mt-1 block text-lg font-normal leading-[1.66]'>
                      Professional blog writer
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col gap-x-16 md:flex-row lg:gap-x-28 items-center xxl:items-baseline xl:gap-x-[134px]'>
                <div className='h-auto w-[300px] self-center overflow-hidden rounded-[10px] lg:w-[375px] xl:h-[494px] xl:w-[526px]'>
                  <img
                    src='assets/img/th-2/testimonial-user-img-1.jpg'
                    alt='testimonial-img-1'
                    width={526}
                    height={494}
                    className='h-full w-full object-cover'
                    loading='lazy'
                  />
                </div>
                <div className='mt-[30px] flex-1 text-center md:text-left'>
                  <div className='mb-5 font-clashDisplay text-2xl font-medium leading-[1.28] tracking-[1px] lg:mb-9 lg:text-[28px]'>
                    “Easy to use AI Chatbot with many options”
                  </div>
                  <p className='mb-9 leading-[1.33] lg:mb-[50px] lg:text-lg xl:text-2xl'>
                    I have been using AI chatbots for several chatbots for the
                    past year. I learned quickly and exploring the tool, &amp;
                    asking questions to Slack support. The tool is very easy
                    user-friendly and the support group helps quickly and
                    thoroughly. Keep up the good work!
                  </p>
                  <div className='text-[21px] font-semibold leading-[1.42]'>
                    -Henry Fayol
                    <span className='mt-1 block text-lg font-normal leading-[1.66]'>
                      Professional blog writer
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* If we need navigation buttons */}
            <div className='testimonial-nav'>
              <button
                onClick={() => swiperRef.current.slidePrev()}
                className='testimonial-nav-prev testimonial-nav-dir'
              >
                <img
                  src='assets/img/th-2/icon-black-long-arrow-left.svg'
                  alt='icon-black-long-arrow-left'
                  width={24}
                  height={24}
                />
                <img
                  src='assets/img/th-2/icon-white-long-arrow-left.svg'
                  alt='icon-white-long-arrow-left'
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={() => swiperRef.current.slideNext()}
                className='testimonial-nav-next testimonial-nav-dir'
              >
                <img
                  src='assets/img/th-2/icon-black-long-arrow-right.svg'
                  alt='icon-black-long-arrow-right'
                  width={24}
                  height={24}
                />
                <img
                  src='assets/img/th-2/icon-white-long-arrow-right.svg'
                  alt='icon-white-long-arrow-right'
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </Swiper>

          {/* Testimonial Carousel */}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Testimonial;
