import { Link } from 'react-router-dom';

const Content_03 = () => {
  return (
    <section id='content-section-3'>
      {/* Section Spacer */}
      <div className='pb-20 md:pb-36 lg:pb-28 xl:pb-[150px]'>
        {/* Section Container */}
        <div className='global-container'>
          <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_.8fr)_1fr] xl:gap-28 xxl:gap-[134px]'>
            {/* Content Left Block */}
            <div
              className='jos order-2 mt-16 rounded-md md:order-1 md:mt-0'
              data-jos_animation='fade-up'
            >
              <div className="relative h-[494px] rounded-tl-[20px] rounded-tr-[20px] bg-[url('/assets/img/th-2/content-shape.jpg')] bg-cover bg-no-repeat">
                <img
                  src='assets/img/th-2/th2-content-img-3.png'
                  alt='th2-content-img-3.png'
                  width={320}
                  height={564}
                  className='absolute bottom-0 left-1/2 h-[564px] w-[320px] -translate-x-1/2'
                />
              </div>
            </div>
            {/* Content Left Block */}
            {/* Content Right Block */}
            <div
              className='jos order-1 md:order-2'
              data-jos_animation='fade-right'
            >
              {/* Section Content Block */}
              <div className='mb-6'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Always provide the best answer
                </h2>
              </div>
              {/* Section Content Block */}
              <div className='mb-12 text-lg leading-[1.66]'>
                <p className='mb-7 last:mb-0'>
                  AI chatbots are designed to give accurate &amp; relevant
                  answers to the best of their abilities based on the
                  information they are trained and algorithms to ensure
                  high-quality responses.
                </p>
                <p className='mb-7 last:mb-0'>
                  Our chatbot responses is influenced by the quality and
                  well-trained chatbots are more likely to provide better
                  answers.
                </p>
              </div>
              <Link
                rel='noopener noreferrer'
                to='/contact'
                className='button relative z-[1] inline-flex items-center gap-3 rounded-[50px] border-none bg-colorViolet py-[18px] text-white after:bg-colorOrangyRed hover:text-white'
              >
                Try It Now
                <img
                  src='assets/img/th-2/icon-white-long-arrow-right.svg'
                  alt='icon-white-long-arrow-right'
                />
              </Link>
            </div>
            {/* Content Right Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_03;
