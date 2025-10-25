import FsLightbox from "fslightbox-react";
import { useState, useEffect } from "react";
import Social from "../../contact/Social";

const Content_03 = () => {
  // State to control lightbox toggle
  const [toggler, setToggler] = useState(false);

  // Automatically open the video lightbox on component mount
  useEffect(() => {
    setToggler(true); // Open the lightbox on mount
  }, []);

  return (
    <div className="">
      {/* Section Content Block */}
      <div
        className="jso absolute flex justify-center flex-col w-full z-10 top-20 md:top-52 left-16"
        data-jos_animation="zoom"
      >
        <h2 className="text-colorBlue font-bold text-2xl md:text-4xl">
          Crown Bankers
        </h2>
        <div className="text-white font-spaceGrotesk text-2xl md:text-6xl font-medium align-start flex w-full">
          An Alternative <br /> Energy Source
        </div>
      </div>

      <video autoPlay loop muted className="relative w-full h-full mt-20">
        <source src="/assets/img/home.mp4" type="video/mp4" />
      </video>
      <div className="flex w-full justify-end mt-4">
        <Social />
      </div>
    </div>
  );
};

export default Content_03;
