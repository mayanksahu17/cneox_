import { Link } from "react-router-dom";

const Team = () => {
  return (
    <section id="team-section">
      <div className="bg-colorBlack text-white">
        {/* Section Spacer */}
        <div className="py-20 xl:py-[130px]">
          {/* Section Container */}
          <div className="global-container">
            {/* Section Content Block */}
            <div className="jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[1000px]">
              <h2 className="font-raleway text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[80px]">
                Our professionals help you
              </h2>
            </div>
            {/* Section Content Block */}
            {/* Team Member List */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team Member Item */}
              <div
                className="jos rounded-[20px] bg-[#F6F6EB] p-[20px]"
                data-jos_animation="flip"
                data-jos_delay="0.1"
              >
                <div className="xl:h[300px] w-full overflow-hidden rounded-[20px] xxl:h-[400px]">
                  <img
                    src="assets/img/th-1/team-member-img-1.jpg"
                    alt="team-member-img-1"
                    width={376}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5">
                  <Link
                    to="/team-details"
                    className="font-dmSans text-[26px] leading-[1.33] hover:text-colorOrangyRed xxl:text-[30px]"
                  >
                    Mr. Abraham Maslo
                  </Link>
                  <div className="mt-3 flex flex-col justify-between gap-3 xxl:flex-row xxl:flex-wrap xxl:items-center">
                    <span className="text-[21px]">Chief AI Officer</span>
                    <ul className="mt-auto flex gap-x-[15px]">
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="https://www.facebook.com/crownbankersofficial"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/facebook-icon-white.svg"
                            alt="facebook"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/facebook-icon-black.svg"
                            alt="facebook"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="www.youtube.com/@official-CrownBankers"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/twitter-icon-white.svg"
                            alt="twitter"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/twitter-icon-black.svg"
                            alt="twitter"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="https://whatsapp.com/channel/0029VacNHAq60eBXejGceh3F"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/linkedin-icon-white.svg"
                            alt="linkedin"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/linkedin-icon-black.svg"
                            alt="linkedin"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="http://www.instagram.com"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/instagram-icon-white.svg"
                            alt="instagram"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/instagram-icon-black.svg"
                            alt="instagram"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Team Member Item */}
              {/* Team Member Item */}
              <div
                className="jos rounded-[20px] bg-[#F6F6EB] p-[20px]"
                data-jos_animation="flip"
                data-jos_delay="0.2"
              >
                <div className="xl:h[300px] w-full overflow-hidden rounded-[20px] xxl:h-[400px]">
                  <img
                    src="assets/img/th-1/team-member-img-2.jpg"
                    alt="team-member-img-2"
                    width={376}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5">
                  <Link
                    to="/team-details"
                    className="font-dmSans text-[26px] leading-[1.33] hover:text-colorOrangyRed xxl:text-[30px]"
                  >
                    Willium Robert
                  </Link>
                  <div className="mt-3 flex flex-col justify-between gap-3 xxl:flex-row xxl:flex-wrap xxl:items-center">
                    <span className="text-[21px]">Data Engineer</span>
                    <ul className="mt-auto flex gap-x-[15px]">
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="https://www.facebook.com/crownbankersofficial"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/facebook-icon-white.svg"
                            alt="facebook"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/facebook-icon-black.svg"
                            alt="facebook"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="www.youtube.com/@official-CrownBankers"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/twitter-icon-white.svg"
                            alt="twitter"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/twitter-icon-black.svg"
                            alt="twitter"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="https://whatsapp.com/channel/0029VacNHAq60eBXejGceh3F"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/linkedin-icon-white.svg"
                            alt="linkedin"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/linkedin-icon-black.svg"
                            alt="linkedin"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="http://www.instagram.com"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/instagram-icon-white.svg"
                            alt="instagram"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/instagram-icon-black.svg"
                            alt="instagram"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Team Member Item */}
              {/* Team Member Item */}
              <div
                className="jos rounded-[20px] bg-[#F6F6EB] p-[20px]"
                data-jos_animation="flip"
                data-jos_delay="0.3"
              >
                <div className="xl:h[300px] w-full overflow-hidden rounded-[20px] xxl:h-[400px]">
                  <img
                    src="assets/img/th-1/team-member-img-3.jpg"
                    alt="team-member-img-3"
                    width={376}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5">
                  <Link
                    to="/team-details"
                    className="font-dmSans text-[26px] leading-[1.33] hover:text-colorOrangyRed xxl:text-[30px]"
                  >
                    Henry Fayol
                  </Link>
                  <div className="mt-3 flex flex-col justify-between gap-3 xxl:flex-row xxl:flex-wrap xxl:items-center">
                    <span className="text-[21px]">Research Scientist</span>
                    <ul className="mt-auto flex gap-x-[15px]">
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="https://www.facebook.com/crownbankersofficial"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/facebook-icon-white.svg"
                            alt="facebook"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/facebook-icon-black.svg"
                            alt="facebook"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="www.youtube.com/@official-CrownBankers"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/twitter-icon-white.svg"
                            alt="twitter"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/twitter-icon-black.svg"
                            alt="twitter"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="https://whatsapp.com/channel/0029VacNHAq60eBXejGceh3F"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/linkedin-icon-white.svg"
                            alt="linkedin"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/linkedin-icon-black.svg"
                            alt="linkedin"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          rel="noopener noreferrer"
                          target="_blank"
                          to="http://www.instagram.com"
                          className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorOrangyRed"
                        >
                          <img
                            src="assets/img/th-1/instagram-icon-white.svg"
                            alt="instagram"
                            width={14}
                            height={14}
                            className="opacity-100 group-hover:opacity-0"
                          />
                          <img
                            src="assets/img/th-1/instagram-icon-black.svg"
                            alt="instagram"
                            width={14}
                            height={14}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Team Member Item */}
            </div>
            {/* Team Member List */}
          </div>
          {/* Section Container */}
        </div>
        {/* Section Spacer */}
      </div>
    </section>
  );
};

export default Team;
