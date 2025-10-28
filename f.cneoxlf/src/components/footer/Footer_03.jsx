import { Link } from "react-router-dom";

const Footer_03 = () => {
  return (
    <footer id="section-footer-3">
      <div className="bg-black text-white">
        {/* Section Spacer */}
        <div className="py-20 xl:py-[130px]">
          {/* Footer Top */}
          <div>
            {/* Section Container */}
            <div className="global-container">
              {/* Footer Content */}
              <div className="grid-col-1 grid items-center gap-10 md:grid-cols-2">
                {/* Section Content Block */}
                <div>
                  <h1 className="font-raleway text-white">Let’s talk</h1>
                </div>
                {/* Section Content Block */}
                <div className="jos flex flex-col gap-10 md:gap-[50px]">
                  <p className="text-lg font-semibold leading-[1.33] md:text-xl lg:text-2xl">
                    Together, we'll create a tailored plan to ensure your
                    success. We'll breathe life into your brand. We work hand in
                    hand to bring your dreams to fruition."
                  </p>
                </div>
              </div>
              {/* Footer Content */}
              {/* Footer Contact */}
              <div className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-[10px] bg-[#121212] px-11 py-5 text-center font-raleway font-bold leading-[1.33] text-[#F6F6EB] transition-all duration-300 hover:bg-[#381FD1] xl:text-2xl xxl:text-3xl">
                  <a href="mailto:officialcrownbankers@gmail.com">
                    officialcrownbankers@gmail.com
                  </a>
                </div>
                <div className="rounded-[10px] bg-[#121212] px-11 py-5 text-center font-raleway font-bold leading-[1.33] text-[#F6F6EB] transition-all duration-300 hover:bg-[#381FD1] xl:text-2xl xxl:text-3xl">
                  +44 7452 217071
                </div>
                <div className="rounded-[10px] bg-[#121212] px-11 py-5 text-center font-raleway font-bold leading-[1.33] text-[#F6F6EB] transition-all duration-300 hover:bg-[#381FD1] xl:text-2xl xxl:text-3xl">
                  <address className="not-italic">
                    4140 Parker Rd. Mexico
                  </address>
                </div>
              </div>
              {/* Footer Contact */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Top */}
          {/* Footer Bottom */}
          <div className="mt-[100px]">
            {/* Section Container */}
            <div className="global-container">
              {/* Footer Widgets Block */}
              <div className="grid gap-x-10 gap-y-[60px] md:grid-cols-2 lg:flex lg:grid-cols-4 lg:justify-between lg:gap-x-20">
                {/* Footer Widget Item */}
                <div className="flex flex-col gap-y-6 md:max-w-xs xl:max-w-[480px]">
                  <Link to="/" className="inline-block">
                    <img
                      src="assets/img/logo-light.png"
                      alt="logo"
                      width={96}
                      height={24}
                    />
                  </Link>
                  <p>
                    Our mission is to harness the power of AI to solve complex
                    business challenges &amp; decision-makers with data-driven
                    insights, and enhance user experiences across digital
                    platforms.
                  </p>
                  <p>
                    © Copyright {new Date().getFullYear()}, All Rights Reserved
                    by Mthemeus
                  </p>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
                <div className="flex flex-col gap-y-6">
                  {/* Footer Title */}
                  <h4 className="text-[21px] font-semibold capitalize text-white">
                    Primary Pages
                  </h4>
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
                        to="/about"
                        className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services"
                        className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pricing"
                        className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                      >
                        Pricing
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
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
                <div className="flex flex-col gap-y-6">
                  {/* Footer Title */}
                  <h4 className="text-[21px] font-semibold capitalize text-white">
                    Utility pages
                  </h4>
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
                        to="/error-404"
                        className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                      >
                        404 Not Found
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/reset-password"
                        className="transition-all duration-300 ease-linear hover:text-colorOrangyRed"
                      >
                        Password Reset
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
                <div className="flex flex-col gap-y-6">
                  {/* Footer Title */}
                  <h4 className="text-[21px] font-semibold capitalize text-white">
                    Socials
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className="flex flex-col gap-y-[15px] capitalize">
                    <li>
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        to="https://www.facebook.com/crownbankersofficial"
                        className="group flex items-center gap-x-3"
                      >
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet">
                          <img
                            src="assets/img/th-1/facebook-icon-white.svg"
                            alt="facebook-icon-white"
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className="inline-block flex-1">Facebook</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        to="www.youtube.com/@official-CrownBankers"
                        className="group flex items-center gap-x-3"
                      >
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet">
                          <img
                            src="assets/img/th-1/twitter-icon-white.svg"
                            alt="twitter-icon-white"
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className="inline-block flex-1">Twitter</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        to="http://www.instagram.com"
                        className="group flex items-center gap-x-3"
                      >
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet">
                          <img
                            src="assets/img/th-1/instagram-icon-white.svg"
                            alt="instagram-icon-white"
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className="inline-block flex-1">Instagram</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        to="https://whatsapp.com/channel/0029VacNHAq60eBXejGceh3F"
                        className="group flex items-center gap-x-3"
                      >
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet">
                          <img
                            src="assets/img/th-1/linkedin-icon-white.svg"
                            alt="linkedin-icon-white"
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className="inline-block flex-1">Linkedin</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
              </div>
              {/* Footer Widgets Block */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Bottom */}
        </div>
        {/* Section Spacer */}
      </div>
    </footer>
  );
};

export default Footer_03;
