import { Link } from "react-router-dom";
import useAccordion from "../../../../hooks/useAccordion";

const Faq_Section = () => {
  const [activeIndex, handleAccordion] = useAccordion(0);
  return (
    <section className="faq-section">
      {/* Section Spacer */}
      <div className="pb-20 xl:pb-[150px]">
        {/* Section Container */}
        <div className="global-container">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
            {/* FAQ Left Block */}
            <div className="jos flex flex-col" data-jos_animation="fade-right">
              {/* Section Content Block */}
              <div className="mb-6">
                <div className="mx-auto md:mx-0 md:max-w-none">
                  <h2>Freely ask us for more information</h2>
                </div>
              </div>
              {/* Section Content Block */}
              <div className="text-lg leading-[1.4] lg:text-[21px]">
                <p className="mb-7 last:mb-0">
                  Welcome to Crown Bankers, your gateway to the best investing
                  platform. Experience seamless transactions, robust returns,
                  and personalized service for a rewarding and stress-free
                  financial journey..
                </p>
                <Link
                  to="/faq"
                  className="button mt-5 rounded-[50px] border-2 border-black bg-colorBlue py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white"
                >
                  Ask you questions
                </Link>
              </div>
            </div>
            {/* FAQ Left Block */}
            {/* FAQ Right Block */}
            <div
              className="jos md:ml-10 lg:ml-20 xl:ml-32"
              data-jos_animation="fade-left"
            >
              {/* Accordion*/}
              <ul className="accordion">
                {/* Accordion items */}
                <li
                  className={`accordion-item border-b-[1px] border-[#DBD6CF] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
                    activeIndex == 0 && "active"
                  } text-white`}
                >
                  <div
                    onClick={() => handleAccordion(0)}
                    className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px]  lg:text-[28px]"
                  >
                    <p>Q: What is Crown Bankers, and what do they offer?</p>
                    <div className="accordion-icon">
                      <img src="assets/img/plus.svg" alt="plus" />
                    </div>
                  </div>
                  <div className="accordion-content text-[#ffeffa]">
                    <p>
                      Crown Bankers is a financial investment platform based in
                      the UK that offers investment packages in EVs, solar
                      energy, cryptocurrencies, AI platforms, and Forbes Top 500
                      companies.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
                {/* Accordion items */}
                <li
                  className={`accordion-item border-b-[1px] border-[#DBD6CF] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
                    activeIndex == 1 && "active"
                  }`}
                >
                  <div
                    onClick={() => handleAccordion(1)}
                    className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px] text-white"
                  >
                    <p>
                      Q: How does the investment plan work at Crown Bankers?
                    </p>
                    <div className="accordion-icon">
                      <img src="assets/img/plus.svg" alt="plus" />
                    </div>
                  </div>
                  <div className="accordion-content text-[#ffeffa]">
                    <p>
                      Crown Bankers offers three investment packages - Solar
                      Starter Package, Power Growth, and Elite Energy, with
                      different investment ranges, durations, and returns.
                      Investors choose a package based on their investment
                      preferences.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
                {/* Accordion items */}
                <li
                  className={`accordion-item border-b-[1px] border-[#DBD6CF] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
                    activeIndex == 2 && "active"
                  }`}
                >
                  <div
                    onClick={() => handleAccordion(2)}
                    className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px] text-white"
                  >
                    <p>What types of returns can investors expect?</p>
                    <div className="accordion-icon">
                      <img src="assets/img/plus.svg" alt="plus" />
                    </div>
                  </div>
                  <div className="accordion-content text-[#ffeffa]">
                    <p>
                      Returns vary based on the chosen package. The ROI ranges
                      from 225% to 312%, and investors receive returns from
                      Monday to Friday.
                    </p>
                  </div>
                </li>
              </ul>
              {/* Accordion*/}
            </div>
            {/* FAQ Right Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Faq_Section;
