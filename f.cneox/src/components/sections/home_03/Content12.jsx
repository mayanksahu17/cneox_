import { Link } from "react-router-dom";

const Content12 = () => {
  return (
    <section id="section-working-process">
      <div className="bg-colorBlack text-white px-5 sm:px-[50px]">
        <div className="relative z-[1] mx-auto max-w-full rounded-[20px] bg-black">
          <div className="global-container">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
              <div className="jos" data-jos_animation="fade-left">
                <div className="mb-4 text-white">
                  <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                  Book now
                </div>
                <div className="font-raleway text-4xl text-white">
                  Crown Bankers
                </div>
                <div className=" text-4xl text-colorOrangyRed">Crypto Card</div>
                <div className="flex flex-row justify-between items-center w-full gap-4 mt-4">
                  <div className=" text-white w-1/2 mt-4">
                    Make cryptocurrency payments becoming your way of life
                  </div>
                </div>
              </div>

              <div className="jos" data-jos_animation="fade-right">
                {/* Section Content Block */}

                {/* Section Content Block */}
                <div className="">
                  <img
                    src="assets/img/plan/12.png"
                    alt="hero-img"
                    className="relative h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content12;
