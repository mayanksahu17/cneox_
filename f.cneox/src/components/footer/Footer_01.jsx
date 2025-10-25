import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";
const Footer_01 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer id="footer-4">
      <div
        className="relative z-[1] overflow-hidden text-white"
        style={{
          background: "linear-gradient(180deg, #AFAFAF -77.81%, #212121 100%)",
        }}
      >
        <div className="py-[60px] xl:pb-[100px] xl:pt-[130px]">
          <div className="overflow-hidden text-white">
            {/* Footer Text Slider */}
            <div className="footer-text-slider flex w-full items-center gap-x-[30px] whitespace-nowrap">
              {/* Footer Slide Item  */}
              <img
                src="assets/img/th-1/footer-text-slider-icon.svg"
                alt="footer-text-slider-icon"
                width={60}
                height={60}
                className="h-10 w-10 lg:h-[60px] lg:w-[60px]"
              />
              <div className="block font-dmSans text-4xl font-bold leading-none -tracking-[2px]  lg:text-6xl xl:text-7xl xxl:text-[80px]">
                Invest In Your Future
              </div>
              {/* Footer Slide Item  */}
              {/* Footer Slide Item  */}
              <img
                src="assets/img/th-1/footer-text-slider-icon.svg"
                alt="footer-text-slider-icon"
                width={60}
                height={60}
                className="h-10 w-10 lg:h-[60px] lg:w-[60px]"
              />
              <div className="block font-dmSans text-4xl font-bold leading-none -tracking-[2px]  lg:text-6xl xl:text-7xl xxl:text-[80px]">
                Invest In Your Future
              </div>
              {/* Footer Slide Item  */}
              {/* Footer Slide Item  */}
              <img
                src="assets/img/th-1/footer-text-slider-icon.svg"
                alt="footer-text-slider-icon"
                width={60}
                height={60}
                className="h-10 w-10 lg:h-[60px] lg:w-[60px]"
              />
              <div className="block font-dmSans text-4xl font-bold leading-none -tracking-[2px]  lg:text-6xl xl:text-7xl xxl:text-[80px]">
                Invest In Your Future
              </div>
              {/* Footer Slide Item  */}
            </div>
          </div>
        </div>
        <div className="global-container">
          <div className="h-[1px] w-full bg-[#DBD6CF]" />
          {/* Footer Center */}
          <div className="lg grid grid-cols-1 gap-10 py-[60px] md:grid-cols-[1fr_auto_auto] xl:grid-cols-[1fr_auto_auto_1fr] xl:gap-20 xl:py-[100px]">
            {/* Footer Widget */}
            <div className="flex flex-col gap-y-6">
              <Link to="/" className="inline-block">
                <img
                  src="/assets/img/logoname.png"
                  alt="logo"
                  width={96}
                  height={24}
                />
              </Link>
              <p>
                Your Gateway to Prosperity. Experience strategic investing,
                innovative solutions, and financial excellence with us.
              </p>
              <p>
                Website: <Link to="/">crownbankers.com</Link>
              </p>
            </div>
            {/* Footer Widget */}
            {/* Footer Widget */}
            <div className="flex flex-col gap-y-6">
              {/* Footer Title */}

              {/* Footer Title */}
              {/* Footer Navbar */}
              <ul className="flex flex-col gap-y-[10px] capitalize">
                <li>
                  <Link
                    to="/"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service-details"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* Footer Widget */}
            {/* Footer Widget */}
            <div className="flex flex-col gap-y-6">
              {/* Footer Title */}

              {/* Footer Title */}
              {/* Footer Navbar */}
              <ul className="flex flex-col gap-y-[10px] capitalize">
                <li>
                  <Link
                    to="/signup"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/TermsandCondition"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/PrivacyPolicies"
                    className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Footer Widget */}
            {/* Footer Widget */}
            <div className="flex flex-col gap-y-6">
              <li className="flex flex-col text-2xl font-bold gap-y-4">
                Follow us:
                <ul className="mt-auto flex gap-x-[15px]">
                  <li>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to="https://www.facebook.com/crownbankersofficial"
                      className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
                    >
                      <FaFacebookF
                        className="text-black group-hover:text-white"
                        size={14}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to="https://www.youtube.com/@official-CrownBankers"
                      className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
                    >
                      <FaYoutube
                        className="text-black group-hover:text-white"
                        size={14}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to="https://chat.whatsapp.com/K0pOZclpfH9DsLxvTyeY5q"
                      className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:bg-colorOrangyRed"
                    >
                      <FaWhatsapp
                        className="text-black group-hover:text-white"
                        size={14}
                      />
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
            {/* Footer Widget */}
          </div>
          {/* Footer Center */}
          <div className="h-[1px] w-full bg-[#DBD6CF]" />
          {/* Footer Bottom */}
          <div className="py-4 mb-8 text-center">
            <p>
              Copyright 2024, Crown Bankers. All Rights Reserved by CROWNQUEST
              ASSET MANAGEMENT LIMITED.
            </p>
          </div>
          {/* Footer Bottom */}
        </div>
      </div>
    </footer>
  );
};

export default Footer_01;
