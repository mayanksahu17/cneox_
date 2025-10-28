import Header from "../../components/header/Header";
import Footer_03 from "../../components/footer/Footer_03";
import Hero from "../../components/sections/home_03/Hero";
import Promo from "../../components/sections/home_03/Promo";
import Content_01 from "../../components/sections/home_03/Content_01";
import Working from "../../components/sections/home_03/Working";
import Content_02 from "../../components/sections/home_03/Content_02";
import Team from "../../components/sections/home_03/Team";
import Testimonial from "../../components/sections/home_03/Testimonial";
import Blog from "../../components/sections/home_03/Blog";
import Content1 from "../../components/sections/home_03/Content1";
import Content3 from "../../components/sections/home_03/Content3";
import Content4 from "../../components/sections/home_03/Content4";
import Content14 from "../../components/sections/home_03/Content14";
import Content13 from "../../components/sections/home_03/Content13";
import Content12 from "../../components/sections/home_03/Content12";
import Content11 from "../../components/sections/home_03/Content11";
import Content10 from "../../components/sections/home_03/Content10";
import Content9 from "../../components/sections/home_03/Content9";
import Content8 from "../../components/sections/home_03/Content8";
import Content7 from "../../components/sections/home_03/Content7";
import Content5 from "../../components/sections/home_03/Content5";
import Content6 from "../../components/sections/home_03/Content6";
import Terms from "../../components/sections/home_03/Terms";
import Benefits from "../../components/sections/home_03/Benefits";
const Home_03 = () => {
  return (
    <>
      <div className="page-wrapper relative z-[1] bg-colorBlack text-white">
        <Header
          loginCSS="button hidden rounded-[50px] border-[#7F8995] bg-transparent text-black after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block"
          signupCSS="button hidden rounded-[50px] border-colorViolet bg-colorViolet text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white lg:inline-block"
        />
        <main className="main-wrapper relative overflow-hidden">
          <Hero />

          <Content1 />
          <Working />
          <Content_01 />
          <Content3 />
          <Content4 />
          <Content5 />
          <Content6 />
          <Content7 />
          <div className="bg-colorBlack ">
            <div className="h-12 w-[100%] bg-colorBlack" />
          </div>
          <Content8 />

          <Content9 />

          <Content10 />
          <Content11 />
          <Content12 />
          <Content13 />
          <Content14 />
          <Terms />
          <div className="bg-colorBlack ">
            <div className="h-12 w-[100%] bg-colorBlack" />
          </div>

          <Benefits />
          <div className="relative mt-12">
            <img
              src="assets/img/plan/thanks.png"
              alt="hero-img"
              className="relative h-full w-full"
            />
            <div className="absolute bottom-[40%] md:bottom-[50%] right-[25%] md:right-[42%] flex justify-center items-center flex-col gap-2">
              <h1 className="font-bold text-white text-5xl">Thank You</h1>
            </div>
          </div>
          {/* <Content_02 />

          <div className="global-container overflow-hidden">
            <div className="h-[1px] w-full bg-[#F6F6EB]" />
          </div>

          <Team />

          <Testimonial />

          <Blog /> */}
        </main>
        {/* <Footer_03 /> */}
      </div>
      {/* Vertical Line */}
      <div className="absolute left-0 top-0 -z-[1] flex h-full w-full justify-evenly">
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
        <div className="h-full w-[1px] bg-colorBlack" />
      </div>
      {/* Vertical Line */}
    </>
  );
};

export default Home_03;
