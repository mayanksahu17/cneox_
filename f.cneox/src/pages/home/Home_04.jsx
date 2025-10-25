import Header from "../../components/header/Header";
import Footer_04 from "../../components/footer/Footer_04";
import Promo from "../../components/sections/home_04/Promo";
import Content_01 from "../../components/sections/home_04/Content_01";
import Content_02 from "../../components/sections/home_04/Content_02";
import Service from "../../components/sections/home_04/Service";
import Slider from "../../components/sections/home_04/Slider";
import Hero from "../../components/sections/home_04/Hero";
import Content_03 from "../../components/sections/home_04/Content_03";
import Content_04 from "../../components/sections/home_04/Content_04";
import Faq from "../../components/sections/home_04/Faq";
import Testimonial from "../../components/sections/home_04/Testimonial";
import Cta from "../../components/sections/home_04/Cta";
import Calculator from "../../components/dashboard/calculator/Calculator";
import ImageSlider from "../../components/sections/home_04/ImageSlider";
import CEOSection from "../../components/sections/home_04/CEOSection";
import { Popup } from "../../components/dashboard/Popup";
import { useState } from "react";

const Home_04 = () => {
  const [popups, setPopups] = useState([
    // { imageSrc: "/images/11march.jpeg", visible: true },
    { imageSrc: "assets/img/popups/27dec.jpeg", visible: false },
    // { imageSrc: "/images/10apr2.png", visible: false },
    // { imageSrc: "/images/4march3.jpeg", visible: false },
  ]);
  const closePopup = (index) => {
    const updatedPopups = [...popups];
    updatedPopups[index].visible = false;
    setPopups(updatedPopups);
  };

  const nextPopup = (index) => {
    if (index < popups.length - 1) {
      const updatedPopups = [...popups];
      updatedPopups[index + 1].visible = true;
      setPopups(updatedPopups);
    }
  };
  return (
    <>
      <div className="page-wrapper relative z-[1] bg-black text-white">
        {popups.map(
          (popup, index) =>
            popup.visible && (
              <Popup
                key={index}
                imageSrc={popup.imageSrc}
                closePopup={() => closePopup(index)}
                nextPopup={() => nextPopup(index)}
              />
            )
        )}
        <main className="main-wrapper relative overflow-hidden">
          <Content_03 />
          <Content_01 />

          <Hero />
          <Content_02 />
          <div className="global-container overflow-hidden">
            <div className="h-[1px] w-full bg-[#363636]" />
          </div>
          <Service />
          <CEOSection />
          <Calculator />
          <ImageSlider />
        </main>
      </div>
    </>
  );
};

export default Home_04;
