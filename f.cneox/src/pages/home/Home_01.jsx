import Hero from "../../components/sections/home_01/Hero";
import Service from "../../components/sections/home_01/service/Service";
import Content_01 from "../../components/sections/home_01/Content_01";
import Content_02 from "../../components/sections/home_01/Content_02";
import FunFact from "../../components/sections/home_01/FunFact";
import { Popup } from "../../components/dashboard/Popup";
import { useState } from "react";
import Calculator from "../../components/dashboard/calculator/Calculator";
// import Pricing from '../../components/sections/home_01/Pricing';
// import Testimonial_Section from '../../components/sections/home_01/Testimonial_Section';

const Home_01 = () => {
  const [popups, setPopups] = useState([
    // { imageSrc: "/images/11march.jpeg", visible: true },
    { imageSrc: "assets/img/popups/9sept.jpeg", visible: true },
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
    <main className="main-wrapper relative overflow-hidden">
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
      <Hero />
      <Service />
      <Calculator />
      <Content_01 />
      <Content_02 />

      <FunFact />

      {/* <Pricing />
      <Testimonial_Section /> */}

      {/* Body Background Shape 1 */}
      <div className="orange-gradient-1 absolute -left-[15px] top-[61%] -z-[1] h-[400px] w-[400px] -rotate-[-9.022deg] rounded-[400px]"></div>

      {/* Body Background Shape 2 */}
      <div className="orange-gradient-2 absolute -left-[100px] top-[64%] -z-[1] h-[360px] w-[360px] -rotate-[-9.022deg] rounded-[360px]"></div>
    </main>
  );
};

export default Home_01;
