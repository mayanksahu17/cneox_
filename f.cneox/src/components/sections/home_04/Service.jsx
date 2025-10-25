import { Link } from "react-router-dom";

const Service = () => {
  return (
    <section id="service-section">
      {/* Section Spacer */}
      <div className="pb-20 xl:pb-[130px]">
        {/* Section Container */}
        <div className="global-container">
          {/* Section Content Block */}
          {/* <div className="flex flex-col md:flex-row justify-center items-center w-full mb-10 md:mb-16 lg:mb-20">
            <div className="jos mx-auto w-full md:w-1/2">
              <h2 className="text-colorBlue text-4xl mb-2">Crypto card</h2>
              <h2 className="font-spaceGrotesk text-4xl font-medium text-white">
                Elevate Your Crypto Experience with Crown Bankers Cards!
              </h2>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-1/2">
              <p className="mb-8 text-lg leading-[1.42] last:mb-0 lg:text-[21px]">
                Discover the ultimate flexibility in managing your
                cryptocurrency with Crown Bankers. Whether you're shopping
                online or spending globally, our cards are designed to make your
                crypto assets work for you. Choose between our virtual and
                physical cards to fit your lifestyle and enjoy seamless
                transactions anytime, anywhere.
              </p>
            </div>
          </div> */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.1"
            >
              <div className="mb-2 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Seamless Online Shopping
                </div>
              </div>
              <p className="mb-7 text-md font-light">
                Instantly create and use your Crown Bankers Virtual Card for
                secure, hassle-free online purchases. Perfect for everyday use
                and instant activation with a $1,000 package.
              </p>
              <div className="">
                <img
                  src="assets/img/th-1/7.png"
                  alt="icon-green-service"
                  className="h-full w-auto"
                />
              </div>
            </li>

            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.1"
            >
              <div className="mb-2 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Global Spending Power
                </div>
              </div>
              <p className="mb-7 text-md font-light">
                Our Physical Card lets you spend effortlessly at over 1 million
                merchants worldwide, both online and offline. Activate with a
                $20,000 package to unlock limitless spending flexibility.
              </p>
              <div className="">
                <img
                  src="assets/img/th-1/19.png"
                  alt="icon-green-service"
                  className="h-full w-[500px]"
                />
              </div>
            </li>
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.1"
            >
              <div className="mb-2 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Easy Activation
                </div>
              </div>
              <p className="mb-7 text-md font-light">
                Get started quickly with our easy activation process. Virtual
                cards are available with a $1,000 package, while physical cards
                are accessible with a $20,000 package.
              </p>
              <div className="">
                <img
                  src="assets/img/th-1/9.png"
                  alt="icon-green-service"
                  className="h-full w-auto"
                />
              </div>
            </li>
            <li
              className="jos group rounded-[10px] bg-[#121212] p-[30px]"
              data-jos_delay="0.1"
            >
              <div className="mb-2 flex items-center gap-x-6">
                <div className="flex-1 font-spaceGrotesk text-3xl leading-[1.33]">
                  Enhanced Security
                </div>
              </div>
              <p className="mb-7 text-md font-light">
                Enjoy peace of mind with advanced security features on both
                cards, ensuring safe and secure transactions whether you're at
                home or traveling the world.
              </p>
              <div className="">
                <img
                  src="assets/img/th-1/10.png"
                  alt="icon-green-service"
                  className="h-full w-auto"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Service;
