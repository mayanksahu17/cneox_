const Promo = () => {
  return (
    <section id='promo-section'>
      {/* Section Spacer */}
      <div className='pb-20 pt-20 xl:pb-[130px] xl:pt-[150px]'>
        {/* Section Container */}
        <div className='global-container'>
          {/* Section Content Block */}
          <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[1000px]'>
            <h2 className='font-raleway text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[80px]'>
              Way to be a game changer
            </h2>
          </div>
          {/* Section Content Block */}
          {/* Promo List */}
          <ul className='grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3'>
            {/* Promo Item */}
            <li className='jos text-center md:text-left' data-jos_delay='0.1'>
              <div className='mx-auto mb-[30px] inline-flex h-10 w-auto justify-center md:justify-normal xxl:h-[60px]'>
                <img
                  src='assets/img/th-3/icon-black-promo-1.svg'
                  alt='icon-black-promo-1'
                  width={60}
                  height={60}
                  className='h-full w-auto'
                />
              </div>
              <div className='mb-5 font-raleway text-2xl font-bold leading-[1.33] text-black xl:text-3xl'>
                Enhanced Decision-Making
              </div>
              <p className='text-lg leading-[1.42] xl:text-[21px]'>
                AI can uncover valuable insights, for an identify trends, &amp;
                predict outcomes. AI empowers data-driven decisions.
              </p>
            </li>
            {/* Promo Item */}
            {/* Promo Item */}
            <li className='jos text-center md:text-left' data-jos_delay='0.2'>
              <div className='mx-auto mb-[30px] inline-flex h-10 w-auto justify-center md:justify-normal xxl:h-[60px]'>
                <img
                  src='assets/img/th-3/icon-black-promo-2.svg'
                  alt='icon-black-promo-1'
                  width={70}
                  height={60}
                  className='h-full w-auto'
                />
              </div>
              <div className='mb-5 font-raleway text-2xl font-bold leading-[1.33] text-black xl:text-3xl'>
                Efficiency and Automation
              </div>
              <p className='text-lg leading-[1.42] xl:text-[21px]'>
                AI driven automation can be applied to the various processes
                leading to cost savings &amp; improved productivity.
              </p>
            </li>
            {/* Promo Item */}
            {/* Promo Item */}
            <li className='jos text-center md:text-left' data-jos_delay='0.3'>
              <div className='mx-auto mb-[30px] inline-flex h-10 w-auto justify-center md:justify-normal xxl:h-[60px]'>
                <img
                  src='assets/img/th-3/icon-black-promo-3.svg'
                  alt='icon-black-promo-1'
                  width={67}
                  height={60}
                  className='h-full w-auto'
                />
              </div>
              <div className='mb-5 font-raleway text-2xl font-bold leading-[1.33] text-black xl:text-3xl'>
                Customer Experiences
              </div>
              <p className='text-lg leading-[1.42] xl:text-[21px]'>
                It enables businesses to provide highly personalized and
                responsive innovative best customer experiences.
              </p>
            </li>
            {/* Promo Item */}
          </ul>
          {/* Promo List */}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Promo;
