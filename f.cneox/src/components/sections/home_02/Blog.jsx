import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div id='blog-section'>
      {/* Section Spacer */}
      <div className='py-20 xl:py-[130px]'>
        {/* Section Container */}
        <div className='global-container'>
          {/* Section Content Block */}
          <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mx-0 lg:mb-20 lg:max-w-[636px] lg:text-left'>
            <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
              Find out more in our recent blogs
            </h2>
          </div>
          {/* Section Content Block */}
          {/* Blog List */}
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {/* Blog Post Single Item */}
            <article
              className='jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]'
              data-jos_delay='0.1'
            >
              {/* Blog Image */}
              <Link
                to='/blog-details'
                className='block h-[320px] w-full overflow-hidden rounded-[30px]'
              >
                <img
                  src='assets/img/th-1/blog-main-1.jpg'
                  alt='blog-main-1'
                  width={416}
                  height={320}
                  className='h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105'
                />
              </Link>
              {/* Blog Image */}
              {/* Blog Content */}
              <div className='p-6'>
                <h5 className='mb-7 font-clashDisplay font-medium leading-[1.28] tracking-[1px] text-[28] hover:text-colorViolet'>
                  <Link to='/blog-details'>
                    AI Chatbot: It essential for customer self-service
                  </Link>
                </h5>
                <div className='flex items-center justify-between gap-x-4'>
                  <span>23 June 2024</span>
                  <Link to='/blog-details' className='h-[30px] w-[30px]'>
                    <img
                      src='assets/img//th-2/icon-blue-long-arrow-right.svg'
                      alt='icon-blue-long-arrow-right'
                      width={30}
                      height={30}
                      className='transition-all duration-300 group-hover:-rotate-45'
                    />
                  </Link>
                </div>
              </div>
              {/* Blog Content */}
            </article>
            {/* Blog Post Single Item */}
            {/* Blog Post Single Item */}
            <article
              className='jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]'
              data-jos_delay='0.2'
            >
              {/* Blog Image */}
              <Link
                to='/blog-details'
                className='block h-[320px] w-full overflow-hidden rounded-[30px]'
              >
                <img
                  src='assets/img/th-1/blog-main-2.jpg'
                  alt='blog-main-2'
                  width={416}
                  height={320}
                  className='h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105'
                />
              </Link>
              {/* Blog Image */}
              {/* Blog Content */}
              <div className='p-6'>
                <h5 className='mb-7 font-clashDisplay font-medium leading-[1.28] tracking-[1px] text-[28] hover:text-colorViolet'>
                  <Link to='/blog-details'>
                    How to build your own AI chatbot with custom data
                  </Link>
                </h5>
                <div className='flex items-center justify-between gap-x-4'>
                  <span>20 June 2024</span>
                  <Link to='/blog-details' className='h-[30px] w-[30px]'>
                    <img
                      src='assets/img//th-2/icon-blue-long-arrow-right.svg'
                      alt='icon-blue-long-arrow-right'
                      width={30}
                      height={30}
                      className='transition-all duration-300 group-hover:-rotate-45'
                    />
                  </Link>
                </div>
              </div>
              {/* Blog Content */}
            </article>
            {/* Blog Post Single Item */}
            {/* Blog Post Single Item */}
            <article
              className='jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]'
              data-jos_delay='0.3'
            >
              {/* Blog Image */}
              <Link
                to='/blog-details'
                className='block h-[320px] w-full overflow-hidden rounded-[30px]'
              >
                <img
                  src='assets/img/th-1/blog-main-3.jpg'
                  alt='blog-main-3'
                  width={416}
                  height={320}
                  className='h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105'
                />
              </Link>
              {/* Blog Image */}
              {/* Blog Content */}
              <div className='p-6'>
                <h5 className='mb-7 font-clashDisplay font-medium leading-[1.28] tracking-[1px] text-[28] hover:text-colorViolet'>
                  <Link to='/blog-details'>
                    8 best AI chatbot tools for boost your business
                  </Link>
                </h5>
                <div className='flex items-center justify-between gap-x-4'>
                  <span>18 June 2024</span>
                  <Link to='/blog-details' className='h-[30px] w-[30px]'>
                    <img
                      src='assets/img//th-2/icon-blue-long-arrow-right.svg'
                      alt='icon-blue-long-arrow-right'
                      width={30}
                      height={30}
                      className='transition-all duration-300 group-hover:-rotate-45'
                    />
                  </Link>
                </div>
              </div>
              {/* Blog Content */}
            </article>
            {/* Blog Post Single Item */}
          </div>
          {/* Blog List */}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </div>
  );
};

export default Blog;
