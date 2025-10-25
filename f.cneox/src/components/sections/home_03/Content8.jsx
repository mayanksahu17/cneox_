import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaFileAlt,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
const Content8 = () => {
  return (
    <section id="section-working-process">
      <div className="bg-colorBlack text-white px-5 sm:px-[50px]">
        <div className="relative z-[1] mx-auto max-w-full rounded-[20px] bg-black">
          <div className="py-20 xl:py-[130px]">
            <div className="global-container">
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,_1fr)_1.3fr] lg:gap-[60px] xl:gap-x-[94px]">
                <div className="jos" data-jos_animation="fade-left">
                  <div className="mb-4 text-white">
                    <span className="inline-block w-2 h-2 bg-colorOrangyRed rounded-full mr-2"></span>
                    Ways of earning
                  </div>
                  <div className="font-raleway text-2xl text-white">Income</div>
                  <div className="font-raleway text-2xl text-white text-colorOrangyRed">
                    Stream
                  </div>
                  <div className="flex flex-row justify-between items-center w-full gap-4 mt-4">
                    <div className=" text-white">
                      At Crown Bankers, we provide four dynamic income streams
                      to maximize your financial growth: returns on investment
                      in high-growth sectors, a referral bonus for bringing new
                      investors on board, a binary bonus that rewards you for
                      building a strong network, and the My Crown Career
                      program, designed to enhance your professional journey.
                      With these diverse income opportunities, we ensure that
                      your investments are not only profitable but also
                      rewarding in multiple ways.
                    </div>
                  </div>
                </div>

                <div className="jos" data-jos_animation="fade-right">
                  {/* Section Content Block */}

                  {/* Section Content Block */}
                  <div className="flex justify-center items-center w-full flex-col gap-10">
                    <div className="flex  flex-col md:flex-row justify-center gap-10">
                      <div className="w-60 h-60 rounded-xl bg-[#242424] p-6 flex flex-col gap-6 relative">
                        <div className="relative flex items-center jusify-center gap-8">
                          <FaChartLine className="text-colorBlue text-2xl" />
                          <div className="relative text-white  text-sm ">
                            Returns on investment
                          </div>
                        </div>
                        <div className="relative text-white font-thin text-sm mt-4">
                          Choose from Solar Starter, Power Growth, Special
                          packages with returns of 1.5% to 2.4% over 130 to 150
                          days, ensuring steady wealth growth.
                        </div>
                      </div>
                      <div className="w-60 h-60 rounded-xl bg-[#242424] p-6 flex flex-col gap-6 relative">
                        <div className="relative flex items-center jusify-center gap-8">
                          <FaUserFriends className="text-colorBlue text-2xl" />

                          <div className="relative text-white  text-sm ">
                            Referral bonus
                          </div>
                        </div>
                        <div className="relative text-white font-thin text-sm mt-4">
                          Join our community-driven success at Crown Bankers!
                          Refer new investors, earn a 7% to 9% Referral Bonus,
                          and grow together.
                        </div>
                      </div>
                    </div>
                    <div className="flex  flex-col md:flex-row justify-center gap-10">
                      <div className="w-60 h-60 rounded-xl bg-[#242424] p-6 flex flex-col gap-6 relative">
                        <div className="relative flex items-center jusify-center gap-8">
                          <FaUserPlus className="text-colorBlue text-2xl" />

                          <div className="relative text-white  text-sm ">
                            Binary bonus
                          </div>
                        </div>
                        <div className="relative text-white font-thin text-sm mt-4">
                          Enhance rewards through referrals with our Binary
                          Bonus, calculated on balanced growth strategy,
                          ensuring fair and streamlined distribution.
                        </div>
                      </div>
                      <div className="w-60 h-60 rounded-xl bg-[#242424] p-6 flex flex-col gap-6 relative">
                        <div className="relative flex items-center jusify-center gap-8">
                          <FaFileAlt className="text-colorBlue text-2xl" />

                          <div className="relative text-white text-sm ">
                            Crown Rewards
                          </div>
                        </div>
                        <div className="relative text-white font-thin text-sm mt-4">
                          In My Crown Career, earn rewards based on investments
                          made by those you bring into the network. Grow
                          together with us!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content8;
