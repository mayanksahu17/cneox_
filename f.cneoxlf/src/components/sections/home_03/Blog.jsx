import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <section id="section-blog">
      <div className="bg-colorBlack text-white">
        {/* Section Spacer */}
        <div className="pb-20 pt-20 xl:pb-[130px] xl:pt-[150px]">
          {/* Section Container */}
          <div className="global-container">
            {/* Section Content Block */}
            <div className="jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[1000px]">
              <h2 className="font-raleway text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[80px]">
                Discover our latest articles
              </h2>
            </div>
            {/* Section Content Block */}
            {/* Blog List */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Blog Item */}
              <div className="jos group flex flex-col items-center gap-x-6 gap-y-8 rounded-[20px] bg-[#F6F6EB] p-5 xl:flex-row">
                <Link
                  to="/blog-details"
                  className="h-[230px] w-full overflow-hidden rounded-[10px] xl:w-[250px]"
                >
                  <img
                    src="assets/img/th-1/blog-main-1.jpg"
                    alt="blog-main-1"
                    width={856}
                    height={450}
                    className="h-full w-full scale-100 object-cover transition-all duration-300 ease-linear group-hover:scale-105"
                  />
                </Link>
                <div className="flex-1">
                  <div className="mb-6 text-sm">
                    <Link to="/blog">BUSINESS</Link> |<span>June 12, 2024</span>
                  </div>
                  <Link
                    to="/blog-details"
                    className="font-raleway text-2xl font-bold leading-[1.33] text-black transition-all duration-300 group-hover:text-[#381FD1] lg:text-3xl"
                  >
                    10 AI business ideas for startups in 2024
                  </Link>
                  <p className="mt-3 line-clamp-2 text-lg leading-[1.42] lg:text-[21px]">
                    Boost business efficiency using AI. Explore AI business
                    ideas...
                  </p>
                </div>
              </div>
              {/* Blog Item */}
              {/* Blog Item */}
              <div className="jos group flex flex-col items-center gap-x-6 gap-y-8 rounded-[20px] bg-[#F6F6EB] p-5 xl:flex-row">
                <Link
                  to="/blog-details"
                  className="h-[230px] w-full overflow-hidden rounded-[10px] xl:w-[250px]"
                >
                  <img
                    src="assets/img/th-1/blog-main-2.jpg"
                    alt="blog-main-2"
                    width={856}
                    height={450}
                    className="h-full w-full scale-100 object-cover transition-all duration-300 ease-linear group-hover:scale-105"
                  />
                </Link>
                <div className="flex-1">
                  <div className="mb-6 text-sm">
                    <Link to="/blog">OPINION</Link> |<span>June 10, 2024</span>
                  </div>
                  <Link
                    to="/blog-details"
                    className="font-raleway text-2xl font-bold leading-[1.33] text-black transition-all duration-300 group-hover:text-[#381FD1] lg:text-3xl"
                  >
                    Steps to shape your future work with AI
                  </Link>
                  <p className="mt-3 line-clamp-2 text-lg leading-[1.42] lg:text-[21px]">
                    Artificial Intelligence has the potential to
                    revolutionize...
                  </p>
                </div>
              </div>
              {/* Blog Item */}
              {/* Blog Item */}
              <div className="jos group flex flex-col items-center gap-x-6 gap-y-8 rounded-[20px] bg-[#F6F6EB] p-5 xl:flex-row">
                <Link
                  to="/blog-details"
                  className="h-[230px] w-full overflow-hidden rounded-[10px] xl:w-[250px]"
                >
                  <img
                    src="assets/img/th-1/blog-main-3.jpg"
                    alt="blog-main-3"
                    width={856}
                    height={450}
                    className="h-full w-full scale-100 object-cover transition-all duration-300 ease-linear group-hover:scale-105"
                  />
                </Link>
                <div className="flex-1">
                  <div className="mb-6 text-sm">
                    <Link to="/blog">TECHNOLOGY</Link> |
                    <span>June 09, 2024</span>
                  </div>
                  <Link
                    to="/blog-details"
                    className="font-raleway text-2xl font-bold leading-[1.33] text-black transition-all duration-300 group-hover:text-[#381FD1] lg:text-3xl"
                  >
                    AI tools to improve product descriptions
                  </Link>
                  <p className="mt-3 line-clamp-2 text-lg leading-[1.42] lg:text-[21px]">
                    AI tools are designed to help sellers generate improved...
                  </p>
                </div>
              </div>
              {/* Blog Item */}
              {/* Blog Item */}
              <div className="jos group flex flex-col items-center gap-x-6 gap-y-8 rounded-[20px] bg-[#F6F6EB] p-5 xl:flex-row">
                <Link
                  to="/blog-details"
                  className="h-[230px] w-full overflow-hidden rounded-[10px] xl:w-[250px]"
                >
                  <img
                    src="assets/img/th-1/blog-main-4.jpg"
                    alt="blog-main-4"
                    width={856}
                    height={450}
                    className="h-full w-full scale-100 object-cover transition-all duration-300 ease-linear group-hover:scale-105"
                  />
                </Link>
                <div className="flex-1">
                  <div className="mb-6 text-sm">
                    <Link to="/blog">BUSINESS</Link> |<span>June 06, 2024</span>
                  </div>
                  <Link
                    to="/blog-details"
                    className="font-raleway text-2xl font-bold leading-[1.33] text-black transition-all duration-300 group-hover:text-[#381FD1] lg:text-3xl"
                  >
                    3 best AI businesses to make money
                  </Link>
                  <p className="mt-3 line-clamp-2 text-lg leading-[1.42] lg:text-[21px]">
                    Everyone is buzzing about AI &amp; its potential to
                    revolutionize...
                  </p>
                </div>
              </div>
              {/* Blog Item */}
            </div>
            {/* Blog List */}
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </div>
    </section>
  );
};

export default Blog;
