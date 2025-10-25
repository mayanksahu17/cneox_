import { Link } from "react-router-dom";
import GradientLayout from "./GradientLayout";

const Content_01 = () => {
  return (
    <section id="section-content-1">
      <div className="global-container py-16">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
          <div className="jos" data-jos_animation="fade-left">
            <div className="overflow-hidden rounded-[10px]">
              <GradientLayout />
            </div>
          </div>
          <div className="jos" data-jos_animation="fade-right">
            <div className="mb-6">
              <h2 className="text-colorBlue text-4xl mb-2">Main Initiative</h2>

              <h2 className="font-spaceGrotesk text-3xl md:text-6xl font-medium text-white ">
                "Our Goal is To Change The Modern World Become Nature Friendly"
              </h2>
            </div>
            <div>
              <p className="mb-8 text-lg leading-[1.42] last:mb-0 lg:text-[21px]">
                Our goal is to reshape the modern world by embracing
                nature-friendly practices. We're committed to driving change
                with sustainable solutions, fostering a greener future, and
                making eco-conscious choices that benefit both people and the
                planet. Join us in this vital journey.
              </p>

              <Link
                rel="noopener noreferrer"
                to="/about"
                className="button inline-block h-full rounded border-none bg-colorBlue py-3 text-base text-black after:border-none after:bg-white"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content_01;
