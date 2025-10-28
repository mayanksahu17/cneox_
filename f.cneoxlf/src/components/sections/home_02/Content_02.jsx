const Content_02 = () => {
  return (
    <section id='content-section-2'>
      {/* Section Spacer */}
      <div className='pb-20 md:pb-36 lg:pb-28 xl:pb-[220px]'>
        {/* Section Container */}
        <div className='global-container'>
          <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1fr)_.8fr] xl:gap-28 xxl:gap-[134px]'>
            {/* Content Right Block */}
            <div
              className='jos order-2 mt-16 rounded-md md:mt-0'
              data-jos_animation='fade-up'
            >
              <div className="relative h-[494px] rounded-tl-[20px] rounded-tr-[20px] bg-[url('/assets/img/th-2/content-shape.jpg')] bg-cover bg-no-repeat">
                <img
                  src='assets/img/th-2/th2-content-img-2.png'
                  alt='th2-content-img-2.png'
                  width={320}
                  height={564}
                  className='absolute bottom-0 left-1/2 h-[564px] w-[320px] -translate-x-1/2'
                />
              </div>
            </div>
            {/* Content Right Block */}
            {/* Content Left Block */}
            <div className='jos order-1' data-jos_animation='fade-right'>
              {/* Section Content Block */}
              <div className='mb-6'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Faster means of communication
                </h2>
              </div>
              {/* Section Content Block */}
              <div className='text-lg leading-[1.66]'>
                <p className='mb-7 last:mb-0'>
                  This AI chatbot can handle repetitive tasks and also quickly
                  answer frequently asked questions, businesses to save time and
                  resources.
                </p>
                <ul className='mt-12 flex flex-col gap-y-6 font-clashDisplay text-[22px] font-medium leading-[1.28] tracking-[1px] lg:text-[28px]'>
                  <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                    Provide instant responses any queries
                  </li>
                  <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                    Engage in multiple conversations at once
                  </li>
                  <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                    Manage all frequently asked questions
                  </li>
                </ul>
              </div>
            </div>
            {/* Content Left Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_02;
